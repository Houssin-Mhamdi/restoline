import { supabaseAdmin } from "./supabase-admin"

export interface RestaurantData {
  id: string
  name: string
  slug: string
  currency: string
  color: string
  logo: string
  table_count: number
  opening_hours: Record<string, any>
  max_guests_per_slot: number
  slot_interval: number
  dark_mode: boolean
}

export async function getRestaurantBySlug(slug: string): Promise<RestaurantData | null> {
  const { data, error } = await supabaseAdmin
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error || !data) return null
  return data as RestaurantData
}
