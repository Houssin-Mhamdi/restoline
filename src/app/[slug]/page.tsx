import { notFound } from "next/navigation"
import { getRestaurantBySlug } from "@/lib/get-restaurant"
import { RestaurantProvider } from "@/lib/restaurant-context"
import MenuPage from "@/components/MenuPage"
import { getSeoSettings } from "@/lib/seo"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) return { title: "Not Found" }
  const seo = await getSeoSettings("home")
  return {
    title: seo?.metaTitle || restaurant.name,
    description: seo?.metaDescription || `Welcome to ${restaurant.name}`,
  }
}

export default async function SlugHome({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  return (
    <RestaurantProvider restaurant={restaurant}>
      <MenuPage data={{
        restaurantName: restaurant.name,
        logo: restaurant.logo,
        hours: restaurant.opening_hours ? Object.entries(restaurant.opening_hours).map(([d, h]) => `${d}: ${h}`).join(", ") : undefined,
      }} />
    </RestaurantProvider>
  )
}
