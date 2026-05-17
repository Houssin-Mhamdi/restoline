import { notFound } from "next/navigation"
import { getRestaurantBySlug } from "@/lib/get-restaurant"
import { RestaurantProvider } from "@/lib/restaurant-context"

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  return <RestaurantProvider restaurant={restaurant}>{children}</RestaurantProvider>
}
