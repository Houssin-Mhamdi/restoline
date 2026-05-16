import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    priceRestaurant: process.env.STRIPE_PRICE_RESTAURANT || "",
    priceEnterprise: process.env.STRIPE_PRICE_ENTERPRISE || "",
  })
}
