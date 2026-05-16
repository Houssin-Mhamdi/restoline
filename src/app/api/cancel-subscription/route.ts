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

    const { userId } = await request.json()
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400, headers: corsHeaders })
    }

    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_subscription_id")
      .eq("user_id", userId)
      .single()

    if (!sub?.stripe_subscription_id) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 400, headers: corsHeaders })
    }

    await stripe.subscriptions.update(sub.stripe_subscription_id, {
      cancel_at_period_end: true,
    })

    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "canceled", updated_at: new Date().toISOString() })
      .eq("user_id", userId)

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (err: any) {
    console.error("Cancel error:", err)
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders })
  }
}
