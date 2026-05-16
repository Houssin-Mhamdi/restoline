"use client"

interface MenuHeaderProps {
  tagline?: string
  title?: string
  description?: string
}

export default function MenuHeader({
  tagline = "EXCLUSIVITY IN EVERY BITE",
  title = "Artisanal Selection",
  description = "Experience the precision of high-end culinary artistry. Each dish is a symphony of rare ingredients and meticulous preparation, curated for the discerning palate.",
}: MenuHeaderProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-[1px] w-12 bg-primary" />
        <span className="font-label-lg text-label-lg text-primary tracking-widest">{tagline}</span>
      </div>
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">{title}</h1>
      <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">{description}</p>
    </section>
  )
}
