import { supabaseAdmin } from "./supabase-admin"

export interface SeoSettings {
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  keywords: string
  h1Heading: string
}

export async function getSeoSettings(page: string): Promise<SeoSettings | null> {
  const { data } = await supabaseAdmin
    .from("seo_settings")
    .select("*")
    .eq("page", page)
    .maybeSingle()

  if (!data) return null

  return {
    metaTitle: data.meta_title || "",
    metaDescription: data.meta_description || "",
    ogTitle: data.og_title || "",
    ogDescription: data.og_description || "",
    ogImage: data.og_image || "",
    keywords: data.keywords || "",
    h1Heading: data.h1_heading || "",
  }
}
