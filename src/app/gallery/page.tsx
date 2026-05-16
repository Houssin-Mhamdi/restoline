import type { Metadata } from "next"
import GalleryClient from "./GalleryClient"
import { getSeoSettings } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("gallery")
  return {
    title: seo?.metaTitle || "Gallery — Desplain",
    description: seo?.metaDescription || "A curated visual journey through our culinary philosophy.",
    keywords: seo?.keywords || "gallery, culinary art, restaurant",
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "Gallery — Desplain",
      description: seo?.ogDescription || seo?.metaDescription || "A curated visual journey.",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
  }
}

export default function GalleryPage() {
  return <GalleryClient />
}
