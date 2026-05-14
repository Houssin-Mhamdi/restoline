import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tableId, tableNumber, guestName, phone, email, date, time, guests, restaurantId, restaurantName } = body

    if (!tableId || !guestName || !date) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const rid = restaurantId || "00000000-0000-0000-0000-000000000000"

    let rName = restaurantName || ""
    if (!rName) {
      const { data: restData } = await supabaseAdmin
        .from("restaurants")
        .select("name")
        .eq("id", rid)
        .single()
      if (restData) rName = restData.name
    }

    const { data: resData, error: resError } = await supabaseAdmin
      .from("reservations")
      .insert({
        restaurant_id: rid,
        table_id: tableId,
        table_number: tableNumber || 0,
        guest_name: guestName,
        email: email || "",
        phone: phone || "",
        date,
        time: time || "",
        guests: guests || 1,
        restaurant_name: rName,
        status: "pending",
      })
      .select("id")
      .single()

    if (resError) {
      return NextResponse.json({ success: false, error: resError.message }, { status: 500 })
    }

    const { error: tableError } = await supabaseAdmin
      .from("restaurant_tables")
      .update({ status: "reserved", customer_name: guestName })
      .eq("id", tableId)

    if (tableError) {
      console.error("Failed to update table status:", tableError)
    }

    return NextResponse.json({ success: true, id: resData.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
