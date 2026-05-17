import { notFound } from "next/navigation"
import { getRestaurantBySlug } from "@/lib/get-restaurant"
import { RestaurantProvider } from "@/lib/restaurant-context"
import MenuPageContent from "@/components/MenuPageContent"
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
  const seo = await getSeoSettings("menu")
  return {
    title: seo?.metaTitle || `Menu — ${restaurant.name}`,
    description: seo?.metaDescription || `Explore the menu at ${restaurant.name}`,
  }
}

export default async function SlugMenu({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  return (
    <RestaurantProvider restaurant={restaurant}>
      <MenuPageContent />
    </RestaurantProvider>
  )
}
