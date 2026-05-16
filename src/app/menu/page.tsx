import type { Metadata } from "next"
import MenuPageContent from "@/components/MenuPageContent"
import { getSeoSettings } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("menu")
  return {
    title: seo?.metaTitle || "Menu — Desplain",
    description: seo?.metaDescription || "Explore our artisanal selection of culinary masterpieces.",
    keywords: seo?.keywords || "menu, fine dining, restaurant",
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "Menu — Desplain",
      description: seo?.ogDescription || seo?.metaDescription || "Explore our artisanal selection.",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
  }
}

export default function MenuPage() {
  return <MenuPageContent />
}
