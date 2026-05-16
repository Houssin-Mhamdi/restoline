import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })

    const { userId, returnUrl } = await request.json()

    if (!userId || !returnUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single()

    if (!sub?.stripe_customer_id) {
      return NextResponse.json({ error: "No Stripe customer found" }, { status: 400 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: returnUrl,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Portal error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
