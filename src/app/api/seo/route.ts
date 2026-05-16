import { supabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || "home"

  const { data, error } = await supabaseAdmin
    .from("seo_settings")
    .select("*")
    .eq("page", page)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ seo: data })
}
