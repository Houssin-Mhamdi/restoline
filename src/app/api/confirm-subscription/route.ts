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

    const { sessionId } = await request.json()
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400, headers: corsHeaders })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400, headers: corsHeaders })
    }

    const userId = session.metadata?.userId
    const subscriptionId = session.subscription
    const customerId = session.customer

    if (!userId || !subscriptionId) {
      return NextResponse.json({ error: "Missing user or subscription" }, { status: 400, headers: corsHeaders })
    }

    const sub = await stripe.subscriptions.retrieve(subscriptionId as string) as any

    const { error: upsertError } = await supabaseAdmin.from("subscriptions").upsert({
      user_id: userId,
      stripe_customer_id: customerId as string,
      stripe_subscription_id: subscriptionId as string,
      plan: sub.items?.data?.[0]?.price?.metadata?.plan || "restaurant",
      status: sub.status,
      current_period_start: sub.current_period_start
        ? new Date(sub.current_period_start * 1000).toISOString()
        : null,
      current_period_end: sub.current_period_end
        ? new Date(sub.current_period_end * 1000).toISOString()
        : null,
      trial_ends_at: sub.trial_end
        ? new Date(sub.trial_end * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" })

    if (upsertError) throw upsertError

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (err: any) {
    console.error("Confirm error:", err)
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders })
  }
}
