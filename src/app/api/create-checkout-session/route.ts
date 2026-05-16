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

    const { priceId, userId, email, returnUrl } = await request.json()

    if (!priceId || !userId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400, headers: corsHeaders })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId },
      subscription_data: {
        metadata: { userId },
      },
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
    })

    const { error: updateErr } = await supabaseAdmin
      .from("subscriptions")
      .update({ stripe_customer_id: (session.customer as string) ?? "" })
      .eq("user_id", userId)

    if (updateErr) console.error("Failed to update stripe_customer_id:", updateErr)

    return NextResponse.json({ url: session.url }, { headers: corsHeaders })
  } catch (err: any) {
    console.error("Checkout error:", err)
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders })
  }
}
