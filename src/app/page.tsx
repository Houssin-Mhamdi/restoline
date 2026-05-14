import MenuPage from "@/components/MenuPage"
import type { MenuData } from "@/components/MenuPage"

// This page will receive restaurant data via search params or env
// For now it renders with default sample data
export default function Home() {
  // Data can be customized by passing query params or connecting to Supabase
  const data: MenuData | undefined = undefined

  return <MenuPage data={data} />
}
