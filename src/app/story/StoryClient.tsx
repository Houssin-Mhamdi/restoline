"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ErrorBoundary from "@/components/ErrorBoundary"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { RestaurantContext } from "@/lib/restaurant-context"
import type { NavLink } from "@/components/Navbar"

const NAV_LINKS: NavLink[] = [
  { label: "STORY", href: "/story", active: true },
  { label: "MENU", href: "/menu" },
  { label: "RESERVATIONS", href: "/reservations" },
  { label: "GALLERY", href: "/gallery" },
]

export default function StoryClient() {
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
          <LoadingSkeleton className="min-h-screen" />
        ) : (
          <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-section-gap items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-8 uppercase">
                A LEGACY OF FLAVOR
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                At {restaurantCtx?.name || "Desplain"}, we believe that dining is not merely a transaction, but a sensory
                symphony. Our journey began in the pursuit of perfection, sourcing only the rarest
                ingredients to create experiences that linger long after the final course.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                Every plate is a canvas, and every ingredient is a deliberate stroke of genius. Our
                kitchen, led by Master Chef Julian Desplain, operates with the precision of an atelier
                and the soul of a poet.
              </p>
            </div>
            <div className="relative order-1 md:order-2 h-[400px] md:h-[600px]">
              <Image
                fill
                alt="Chef in kitchen"
                className="object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASykNSum2ryNVA2HTmNk8KUCk4gI3iXCCH-jBfpd5zEgC0eUJd0P0qABxY5wnsgcwrCus3X_1AJ0-RsbzIRxl583_RbjALePjYdswaJHjyaou1eSaXYrj5p1YJbLP2NYY0tVAHFIyDrOQgc1RJ0W2ENSazOgKkzkws86ijIIVcBultIfq6YuIw7HzbFLSW7wP64xKZs2bJADXoLbhViiSGTq6rVhaSdRxxnjIsr2ruxpL0xNO0XkLvX6vJ8Lp1395v9kO3cqw--fGR"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
