import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") || ""

  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any
        const userId = session.metadata?.userId
        const subscriptionId = session.subscription
        const customerId = session.customer

        if (userId && subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId as string) as any
          const priceId = sub.items?.data?.[0]?.price?.id
          const plan = priceId === process.env.STRIPE_PRICE_ENTERPRISE ? "enterprise" : "restaurant"
          const { error: upsertError } = await supabaseAdmin.from("subscriptions").upsert({
            user_id: userId,
            stripe_customer_id: customerId as string,
            stripe_subscription_id: subscriptionId as string,
            plan,
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
        }
        break
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as any
        const { data: subs } = await supabaseAdmin
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", sub.id)
          .single()

        if (subs?.user_id) {
          if (["canceled", "incomplete_expired", "unpaid"].includes(sub.status)) {
            await supabaseAdmin
              .from("subscriptions")
              .update({
                plan: "free",
                status: sub.status,
                current_period_end: sub.current_period_end
                  ? new Date(sub.current_period_end * 1000).toISOString()
                  : null,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", subs.user_id)
          } else if (sub.cancel_at_period_end) {
            await supabaseAdmin
              .from("subscriptions")
              .update({
                status: "canceled",
                current_period_end: sub.current_period_end
                  ? new Date(sub.current_period_end * 1000).toISOString()
                  : null,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", subs.user_id)
          } else {
            const priceId = sub.items?.data?.[0]?.price?.id
            const plan = priceId === process.env.STRIPE_PRICE_ENTERPRISE ? "enterprise" : "restaurant"
            await supabaseAdmin
              .from("subscriptions")
              .update({
                plan,
                status: sub.status,
                current_period_start: sub.current_period_start
                  ? new Date(sub.current_period_start * 1000).toISOString()
                  : null,
                current_period_end: sub.current_period_end
                  ? new Date(sub.current_period_end * 1000).toISOString()
                  : null,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", subs.user_id)
          }
        }
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as any
        const { data: subs } = await supabaseAdmin
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", sub.id)
          .single()

        if (subs?.user_id) {
          await supabaseAdmin
            .from("subscriptions")
            .update({
              plan: "free",
              status: "canceled",
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", subs.user_id)
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any
        const subscriptionId = invoice.subscription

        if (subscriptionId) {
          const { data: subs } = await supabaseAdmin
            .from("subscriptions")
            .select("user_id")
            .eq("stripe_subscription_id", subscriptionId)
            .single()

          if (subs?.user_id) {
            await supabaseAdmin
              .from("subscriptions")
              .update({
                status: "past_due",
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", subs.user_id)
          }
        }
        break
      }
    }
  } catch (err) {
    console.error("Webhook error:", err)
  }

  return NextResponse.json({ received: true })
}
