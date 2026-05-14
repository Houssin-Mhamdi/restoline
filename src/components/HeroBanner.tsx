"use client"

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
  height = "h-[614px]",
  overlayOpacity = "opacity-50",
}: HeroBannerProps) {
  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <img
        className={`absolute inset-0 w-full h-full object-cover ${overlayOpacity}`}
        alt={title}
        src={imageUrl}
      />
      <div className="relative z-10 text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">{title}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
