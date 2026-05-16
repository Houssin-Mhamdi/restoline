import type { Metadata } from "next"
import MenuPage from "@/components/MenuPage"
import { getSeoSettings } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("home")
  return {
    title: seo?.metaTitle || "Desplain",
    description: seo?.metaDescription || "Experience the pinnacle of culinary artistry at Desplain.",
    keywords: seo?.keywords || "fine dining, restaurant, culinary",
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "Desplain — Culinary Artistry Redefined",
      description: seo?.ogDescription || seo?.metaDescription || "Experience the pinnacle of culinary artistry.",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
  }
}

export default function Home() {
  return <MenuPage />
}
