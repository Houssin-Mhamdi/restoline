import type { Metadata } from "next"
import StoryClient from "./StoryClient"

export const dynamic = "force-static"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Story",
    description: "A legacy of flavor — the story behind Desplain.",
  }
}

export default function StoryPage() {
  return <StoryClient />
}
