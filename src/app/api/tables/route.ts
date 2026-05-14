import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("restaurant_tables")
      .select("*")
      .order("number", { ascending: true })

    if (error) {
      return NextResponse.json({ tables: [], error: error.message }, { status: 200 })
    }

    const tables = (data || []).map((t: any) => ({
      id: t.id,
      number: t.number,
      capacity: t.capacity,
      status: t.status,
      customerName: t.customer_name || "",
    }))

    return NextResponse.json({ tables })
  } catch {
    return NextResponse.json({ tables: [], error: "Failed to fetch tables" }, { status: 200 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { tableId, status, customerName } = body

    const updateData: any = { status }
    if (customerName !== undefined) updateData.customer_name = customerName

    const { error } = await supabaseAdmin
      .from("restaurant_tables")
      .update(updateData)
      .eq("id", tableId)

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 200 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update table" }, { status: 200 })
  }
}
