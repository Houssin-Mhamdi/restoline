import { notFound } from "next/navigation"
import { getRestaurantBySlug } from "@/lib/get-restaurant"
import { RestaurantProvider } from "@/lib/restaurant-context"
import StoryClient from "@/app/story/StoryClient"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) return { title: "Not Found" }
  return {
    title: `Our Story — ${restaurant.name}`,
    description: `The story behind ${restaurant.name}`,
  }
}

export default async function SlugStory({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  return (
    <RestaurantProvider restaurant={restaurant}>
      <StoryClient />
    </RestaurantProvider>
  )
}
