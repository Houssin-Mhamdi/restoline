"use client"

import Navbar from "@/components/Navbar"
import MenuHeader from "@/components/MenuHeader"
import MenuGrid from "@/components/MenuGrid"
import MenuSignatures from "@/components/MenuSignatures"
import Footer from "@/components/Footer"

export default function MenuPageContent() {
  return (
    <>
      <Navbar
        links={[
          { label: "STORY", href: "#story" },
          { label: "MENU", href: "/menu", active: true },
          { label: "RESERVATIONS", href: "/reservations" },
          { label: "GALLERY", href: "/gallery" },
        ]}
      />
      <main className="pt-[160px] pb-section-gap">
        <MenuHeader />
        <MenuGrid />
        <MenuSignatures />
      </main>
      <Footer />
    </>
  )
}
