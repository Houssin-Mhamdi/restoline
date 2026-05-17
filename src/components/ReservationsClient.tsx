"use client"

import { useState, useEffect } from "react"
import { useRestaurant } from "@/lib/restaurant-context"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroBanner from "@/components/HeroBanner"
import BookingForm from "@/components/BookingForm"
import ExperienceInfo from "@/components/ExperienceInfo"
import BespeakExperiences from "@/components/BespeakExperiences"
import ErrorBoundary from "@/components/ErrorBoundary"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import type { NavLink } from "@/components/Navbar"

const NAV_LINKS: NavLink[] = [
  { label: "STORY", href: "/story" },
  { label: "MENU", href: "/menu" },
  { label: "RESERVATIONS", href: "/reservations", active: true },
  { label: "GALLERY", href: "/gallery" },
]

export default function ReservationsClient() {
  const [ready, setReady] = useState(false)
  const restaurant = useRestaurant()

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <ErrorBoundary>
      <Navbar links={NAV_LINKS} slug={restaurant.slug} logoText={restaurant.name} />
      <main>
        {!ready ? (
          <LoadingSkeleton className="min-h-screen" />
        ) : (
          <>
            <HeroBanner
              title="RESERVATIONS"
              subtitle="An intimate journey through culinary artistry awaits. Secure your place at our table."
            />
            <BookingForm />
            <ExperienceInfo />
            <BespeakExperiences />
          </>
        )}
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
