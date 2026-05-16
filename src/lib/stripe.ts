import Stripe from "stripe"

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, { typescript: true })
}

export const stripe = getStripe()

export const PLANS = {
  free: { label: "Free", price: 0, features: ["14-day trial", "Single restaurant", "Basic features"] },
  restaurant: { label: "Restaurant", price: 2999, features: ["All features", "Unlimited clients", "Reservations & calendar", "CSV export"] },
  enterprise: { label: "Enterprise", price: 9999, features: ["All features", "Multiple restaurants", "All users", "Priority support"] },
} as const

export type Plan = keyof typeof PLANS
