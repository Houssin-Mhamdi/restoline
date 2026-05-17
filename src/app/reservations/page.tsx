import type { Metadata } from "next"
import ReservationsClient from "./ReservationsClient"
import { getSeoSettings } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("reservations")
  return {
    title: seo?.metaTitle || "Reservations — Desplain",
    description: seo?.metaDescription || "Secure your place at our table for an unforgettable evening.",
    keywords: seo?.keywords || "reservations, booking, restaurant",
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "Reservations — Desplain",
      description: seo?.ogDescription || seo?.metaDescription || "Secure your place at our table.",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
  }
}

export default function ReservationsPage() {
  return <ReservationsClient />
}
