"use client"

interface PricingRow {
  label: string
  price: string
}

interface ExperienceInfoProps {
  subtitle?: string
  title?: string
  description?: string
  imageUrl?: string
  pricing?: PricingRow[]
}

export default function ExperienceInfo({
  subtitle = "THE JOURNEY",
  title = "A Curation of Senses",
  description = "At Desplain, dining is more than a meal; it is a meticulously choreographed performance. Each evening, Chef Desplain curates a singular 12-course tasting menu that evolves with the micro-seasons. We invite you to surrender to the unexpected.",
  imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBg5md4-nRLltn624dIOG199GYHuvs82zKEcX7D_9f3YWgqH6IJvWGtulpfmBZQ1B8SNPrbHHCsRkrHAf9Mu9OCjmiOnvJ8qRwJsgJvk9PpJpYvyr-mL7zD-7RcgTsATLKm7eykYtKcWgz3SvWgA2-_5sx0ExG1DPVQyD20GuFYLoAayKUA9W2k9xmuhxiW8GYsc6lhsfoJwsQqAu4ieXYZX-aKyn357JNZGEkb3xeTKchsqPBmHZB4gS4wZd6D8uZIlnf7u_fOi3su",
  pricing = [
    { label: "TASTING MENU", price: "$285" },
    { label: "WINE PAIRING", price: "$150" },
  ],
}: ExperienceInfoProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-margin-desktop mb-section-gap">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center">
        <div className="order-2 lg:order-1">
          <img
            className="w-full aspect-[4/5] object-cover border border-outline-variant/20"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="order-1 lg:order-2 space-y-8">
          <span className="font-label-lg text-label-lg text-primary tracking-[0.2em]">
            {subtitle}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {description}
          </p>
          <div className="space-y-4 pt-4">
            {pricing.map((row) => (
              <div key={row.label} className="flex items-center">
                <span className="font-label-lg text-label-lg text-on-surface">{row.label}</span>
                <div className="dot-leader" />
                <span className="font-label-lg text-label-lg text-primary">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
