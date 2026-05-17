"use client"

import { useEffect, useState, useMemo } from "react"
import { useRestaurant } from "@/lib/restaurant-context"
import Navbar from "@/components/Navbar"
import MenuHeader from "@/components/MenuHeader"
import MenuGrid from "@/components/MenuGrid"
import MenuSignatures from "@/components/MenuSignatures"
import ErrorBoundary from "@/components/ErrorBoundary"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import Footer from "@/components/Footer"

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  description: string
  tag: string
  category: string
  is_signature: boolean
  available: boolean
  featured: boolean
  sort_order: number
}

function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const k = String(item[key]) || "Other"
      if (!acc[k]) acc[k] = []
      acc[k].push(item)
      return acc
    },
    {} as Record<string, T[]>
  )
}

export default function MenuPageContent() {
  const restaurant = useRestaurant()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/api/products?restaurant_id=${restaurant.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => {
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const available = useMemo(() => products.filter((p) => p.available), [products])
  const regular = useMemo(() => available.filter((p) => !p.is_signature), [available])
  const signatures = useMemo(() => available.filter((p) => p.is_signature), [available])

  const groupedByCategory = useMemo(() => groupBy(regular, "category"), [regular])

  const signatureCards = signatures.map((p) => ({
    title: p.name,
    description: p.description,
    category: p.tag || "Signature",
    cta: "EXPLORE",
    imageUrl: p.image_url,
  }))

  if (loading) return <LoadingSkeleton className="pt-[80px] md:pt-[160px] pb-section-gap min-h-screen" />

  if (error) {
    return (
      <ErrorBoundary>
        <Navbar
          links={[
            { label: "STORY", href: "#story" },
            { label: "MENU", href: "/menu", active: true },
            { label: "RESERVATIONS", href: "/reservations" },
            { label: "GALLERY", href: "/gallery" },
          ]}
        />
        <main className="pt-[80px] md:pt-[160px] pb-section-gap min-h-screen flex flex-col items-center justify-center text-center px-4">
          <span className="material-symbols-outlined text-5xl text-primary mb-4">error_outline</span>
          <h2 className="font-headline-md text-headline-md mb-2">Failed to load menu</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Could not fetch products. Please try again.
          </p>
          <button
            onClick={() => {
              setLoading(true)
              setError(false)
              fetch("/api/products")
                .then((res) => res.json())
                .then((data) => {
                  setProducts(data.products || [])
                  setLoading(false)
                })
                .catch(() => {
                  setError(true)
                  setLoading(false)
                })
            }}
            className="bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 uppercase"
          >
            Retry
          </button>
        </main>
        <Footer />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Navbar
        links={[
          { label: "STORY", href: "#story" },
          { label: "MENU", href: "/menu", active: true },
          { label: "RESERVATIONS", href: "/reservations" },
          { label: "GALLERY", href: "/gallery" },
        ]}
      />
      <main className="pt-[80px] md:pt-[160px] pb-section-gap">
        <MenuHeader />
        {Object.entries(groupedByCategory).map(([category, items]) => (
          <MenuGrid
            key={category || "other"}
            title={(category || "OTHER").toUpperCase()}
            icon="restaurant_menu"
            items={items.map((p) => ({
              name: p.name,
              price: p.price,
              imageUrl: p.image_url,
              description: p.description,
              tag: p.tag,
            }))}
          />
        ))}
        {signatureCards.length > 0 && <MenuSignatures cards={signatureCards} />}
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
