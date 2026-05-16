import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })

    const { priceId, userId, email, returnUrl } = await request.json()

    if (!priceId || !userId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { userId },
      },
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
    })

    const { error: updateErr } = await supabaseAdmin
      .from("subscriptions")
      .update({ stripe_customer_id: session.customer as string ?? "" })
      .eq("user_id", userId)

    if (updateErr) console.error("Failed to update stripe_customer_id:", updateErr)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Checkout error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
