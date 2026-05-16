import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Desplain — Culinary Artistry Redefined",
    template: "%s — Desplain",
  },
  description:
    "Experience the pinnacle of culinary artistry at Desplain. Rare ingredients, meticulous preparation, and an atmosphere of uncompromising elegance.",
  openGraph: {
    title: "Desplain — Culinary Artistry Redefined",
    description:
      "Experience the pinnacle of culinary artistry at Desplain. Rare ingredients, meticulous preparation, and an atmosphere of uncompromising elegance.",
    type: "website",
    siteName: "Desplain",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-md text-body-md">{children}</body>
    </html>
  )
}
