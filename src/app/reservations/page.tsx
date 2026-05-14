"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroBanner from "@/components/HeroBanner"
import BookingForm from "@/components/BookingForm"
import ExperienceInfo from "@/components/ExperienceInfo"
import BespeakExperiences from "@/components/BespeakExperiences"
import type { NavLink } from "@/components/Navbar"

const NAV_LINKS: NavLink[] = [
  { label: "STORY", href: "/" },
  { label: "MENU", href: "/#menu" },
  { label: "RESERVATIONS", href: "/reservations", active: true },
  { label: "GALLERY", href: "/#gallery" },
]

export default function ReservationsPage() {
  return (
    <>
      <Navbar links={NAV_LINKS} />
      <main>
        <HeroBanner
          title="RESERVATIONS"
          subtitle="An intimate journey through culinary artistry awaits. Secure your place at our table."
        />
        <BookingForm />
        <ExperienceInfo />
        <BespeakExperiences />
      </main>
      <Footer />
    </>
  )
}
