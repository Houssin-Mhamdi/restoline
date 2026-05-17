import { supabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const restaurantId = searchParams.get("restaurant_id")

  let query = supabaseAdmin
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true })

  if (restaurantId) {
    query = query.eq("restaurant_id", restaurantId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ categories: data })
}
