"use client"

import Image from "next/image"

interface SignatureCard {
  title: string
  description: string
  category: string
  cta: string
  imageUrl: string
}

interface MenuSignaturesProps {
  title?: string
  icon?: string
  cards?: SignatureCard[]
}

export default function MenuSignatures({
  title = "DESPLAIN SIGNATURES",
  icon = "star",
  cards = [],
}: MenuSignaturesProps) {
  if (cards.length === 0) return null

  return (
    <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
      <h2 className="font-headline-md text-[24px] md:text-headline-md text-primary mb-8 md:mb-12 flex items-center gap-3">
        <span className="material-symbols-outlined">{icon}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative min-h-[250px] md:h-[400px] overflow-hidden bg-surface-container-low border border-outline-variant/20"
          >
            <Image
              fill
              alt={card.title}
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              src={card.imageUrl}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent p-margin-mobile md:p-margin-desktop flex flex-col justify-center">
              <div className="bg-primary/10 border border-primary/20 w-fit px-3 py-1 mb-4">
                <span className="font-label-sm text-label-sm text-primary uppercase">
                  {card.category}
                </span>
              </div>
              <h3 className="font-display-lg text-[24px] md:text-headline-lg mb-2">{card.title}</h3>
              <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant max-w-sm mb-6">
                {card.description}
              </p>
              <button className="flex items-center gap-2 text-primary font-label-lg text-label-lg group-hover:gap-4 transition-all">
                {card.cta}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
