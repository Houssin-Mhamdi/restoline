import { notFound } from "next/navigation"
import { getRestaurantBySlug } from "@/lib/get-restaurant"
import { RestaurantProvider } from "@/lib/restaurant-context"
import GalleryClient from "@/app/gallery/GalleryClient"
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
  const seo = await getSeoSettings("gallery")
  return {
    title: seo?.metaTitle || `Gallery — ${restaurant.name}`,
    description: seo?.metaDescription || `A visual journey through ${restaurant.name}`,
  }
}

export default async function SlugGallery({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  return (
    <RestaurantProvider restaurant={restaurant}>
      <GalleryClient />
    </RestaurantProvider>
  )
}
