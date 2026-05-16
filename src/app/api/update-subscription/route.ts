import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { corsHeaders, createOptionsResponse } from "@/lib/cors"

export const dynamic = "force-dynamic"

export async function OPTIONS() {
  return createOptionsResponse()
}

export async function POST(request: Request) {
  try {
    if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500, headers: corsHeaders })

    const { userId, priceId } = await request.json()
    if (!userId || !priceId) {
      return NextResponse.json({ error: "Missing userId or priceId" }, { status: 400, headers: corsHeaders })
    }

    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_subscription_id, stripe_customer_id")
      .eq("user_id", userId)
      .single()

    if (!sub?.stripe_subscription_id) {
      return NextResponse.json({ error: "No Stripe subscription found" }, { status: 400, headers: corsHeaders })
    }

    const existing = await stripe.subscriptions.retrieve(sub.stripe_subscription_id) as any
    const existingItemId = existing.items?.data?.[0]?.id

    const updated = await stripe.subscriptions.update(sub.stripe_subscription_id, {
      items: [{ id: existingItemId, price: priceId }],
      proration_behavior: "always_invoice",
    }) as any

    const newPlan = priceId === process.env.STRIPE_PRICE_ENTERPRISE ? "enterprise" : "restaurant"

    await supabaseAdmin.from("subscriptions").upsert({
      user_id: userId,
      plan: newPlan,
      status: updated.status,
      stripe_customer_id: updated.customer ?? sub.stripe_customer_id,
      stripe_subscription_id: updated.id,
      current_period_start: updated.current_period_start
        ? new Date(updated.current_period_start * 1000).toISOString()
        : null,
      current_period_end: updated.current_period_end
        ? new Date(updated.current_period_end * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" })

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (err: any) {
    console.error("Update subscription error:", err)
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders })
  }
}
