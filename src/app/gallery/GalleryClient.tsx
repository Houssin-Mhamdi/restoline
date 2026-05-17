"use client"

import { useState, useEffect, useContext } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GalleryGrid from "@/components/GalleryGrid"
import ErrorBoundary from "@/components/ErrorBoundary"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { RestaurantContext } from "@/lib/restaurant-context"
import type { NavLink } from "@/components/Navbar"

const NAV_LINKS: NavLink[] = [
  { label: "STORY", href: "/" },
  { label: "MENU", href: "/#menu" },
  { label: "RESERVATIONS", href: "/reservations" },
  { label: "GALLERY", href: "/gallery", active: true },
]

export default function GalleryClient() {
  const [ready, setReady] = useState(false)
  const restaurantCtx = useContext(RestaurantContext)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <ErrorBoundary>
      <Navbar links={NAV_LINKS} slug={restaurantCtx?.slug} />
      <main className="pt-[80px] md:pt-[160px] pb-section-gap">
        {!ready ? (
          <LoadingSkeleton />
        ) : (
          <>
            <header className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap text-center">
              <span className="font-label-lg text-label-lg text-primary tracking-[0.3em] uppercase block mb-4">
                The Collection
              </span>
              <h1 className="font-headline-lg text-headline-lg md:text-display-lg md:font-display-lg mb-8">
                VISUAL ARTISTRY
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                A curated exploration of our culinary philosophy, where architecture meets the plate.
                Every frame captures a moment of precision and the pursuit of sensory perfection.
              </p>
            </header>

            <GalleryGrid />

            <section className="mt-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto text-center">
              <div className="border-t border-outline-variant/30 pt-section-gap">
                <h2 className="font-headline-lg text-headline-lg mb-8">TASTE THE NARRATIVE</h2>
                <a
                  className="inline-flex items-center gap-4 text-primary font-label-lg text-label-lg hover:gap-6 transition-all duration-300"
                  href="/reservations"
                >
                  RESERVE YOUR EXPERIENCE
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
