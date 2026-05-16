"use client"

import Image from "next/image"

interface HeroBannerProps {
  title: string
  subtitle: string
  imageUrl?: string
  height?: string
  overlayOpacity?: string
}

export default function HeroBanner({
  title,
  subtitle,
  imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDSZgP9iGRrwJBmLQo9bBgKKQZ2vf3pz2pZs5fopXhvxnJScERGCDSeYqnSGf3sv2Q1dfeiL_-9ZIbVWvJYCY5eLFXl4xjiDMIWJeNbeEttE1KC4HMqmnK23kQULoQq9X3W99tyOiCkC9jsojcwFpdIWpOoM00txRv0s9UlHieHkEWttoyPBUSNTx1HkQlGhvqX8frS2lnzV10HDJpJxDdiST8ZGxvY7s5XA3KdKH_fA7BWfAfqycGqx5kpLtyv_EIDCMBPNTjblm-F",
  height = "min-h-[300px] md:h-[614px]",
  overlayOpacity = "opacity-50",
}: HeroBannerProps) {
  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <Image
        fill
        className={`object-cover ${overlayOpacity}`}
        alt={title}
        src={imageUrl}
        sizes="100vw"
        priority
      />
      <div className="relative z-10 text-center">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">{title}</h1>
        <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-xl mx-auto px-4">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
