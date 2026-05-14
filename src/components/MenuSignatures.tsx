"use client"

interface SignatureCard {
  title: string
  description: string
  category: string
  cta: string
  imageUrl: string
}

const DEFAULT_SIGNATURES: SignatureCard[] = [
  {
    title: "The Heritage Set",
    description: "A multi-course journey through the origins of culinary precision.",
    category: "Seasonal",
    cta: "EXPLORE MENU",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp4k7YxRR9X4NUlBMtI2_07DNLNNv-Vfqc6rpLUB6O-8T4FMfr5SOG31INuVOpt_RtC07vkRiGFBfTOQGqvSRVQMOH6wM81Lb2WYY-xkYpYkzaBS8JSReFGskFgW3ojwcQR3eQo1a42A1yLMghuo0KrX2pf8Lt0cy2kIHi0S8uYlOKgBgHkORlqpPeWCPlkF2mxqcRP12H4ar-LW3CNNgaTH48ADFHhGHzhFe9JUzITO3Q8NBau8whrfrHGHlPhUPPEZ8yIC_Z9cbe",
  },
  {
    title: "Gold Leaf Ganache",
    description: "Indulge in a desert defined by 24k gold and rare cocoa beans.",
    category: "Sweet Artistry",
    cta: "VIEW DETAILS",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDZ0yckXCqY7MkY6r_HW7gtX-fn3kC2p-Z61Mk7KoWHEp_XaKQuy6fPLTGoKG7-Lx2rezLoLYqfXZPrYltxa4J7f7Bb3xQ6qKPv6lYYcAhdIlAU0zaQIYN40lipU0-e1elvSgNm5a4X6_8i1rzaGkhf4wdy8jrfUMEWrGp_gQXgJexH90KnNjQ5N5vH0BoYBmH_m-oHkzxTn5D-ive614TxnlFeg44fVLmoEbBgbD_VVHTQl_3JSnoSpBRksBPS_lwjReYrH23Xg3",
  },
]

interface MenuSignaturesProps {
  title?: string
  icon?: string
  cards?: SignatureCard[]
}

export default function MenuSignatures({
  title = "DESPLAIN SIGNATURES",
  icon = "star",
  cards = DEFAULT_SIGNATURES,
}: MenuSignaturesProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-margin-desktop mb-section-gap">
      <h2 className="font-headline-md text-headline-md text-primary mb-12 flex items-center gap-3">
        <span className="material-symbols-outlined">{icon}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative h-[400px] overflow-hidden bg-surface-container-low border border-outline-variant/20"
          >
            <img
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              src={card.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent p-margin-desktop flex flex-col justify-center">
              <div className="bg-primary/10 border border-primary/20 w-fit px-3 py-1 mb-4">
                <span className="font-label-sm text-label-sm text-primary uppercase">
                  {card.category}
                </span>
              </div>
              <h3 className="font-display-lg text-headline-lg mb-2">{card.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6">
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
