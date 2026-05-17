import { notFound } from "next/navigation"
import { getRestaurantBySlug } from "@/lib/get-restaurant"
import { RestaurantProvider } from "@/lib/restaurant-context"
import ReservationsClient from "@/app/reservations/ReservationsClient"
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
  const seo = await getSeoSettings("reservations")
  return {
    title: seo?.metaTitle || `Reservations — ${restaurant.name}`,
    description: seo?.metaDescription || `Book a table at ${restaurant.name}`,
  }
}

export default async function SlugReservations({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  return (
    <RestaurantProvider restaurant={restaurant}>
      <ReservationsClient />
    </RestaurantProvider>
  )
}
