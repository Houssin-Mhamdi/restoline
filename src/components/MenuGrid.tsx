"use client"

import Image from "next/image"

interface MenuItem {
  name: string
  price: number
  imageUrl: string
  description: string
  tag: string
}

interface MenuGridProps {
  title?: string
  icon?: string
  items?: MenuItem[]
}

export default function MenuGrid({
  title = "COMPOSE YOUR MASTERPIECE",
  icon = "restaurant_menu",
  items = [],
}: MenuGridProps) {
  if (items.length === 0) return null

  return (
    <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
      <h2 className="font-headline-md text-[24px] md:text-headline-md text-primary mb-8 md:mb-12 flex items-center gap-3">
        <span className="material-symbols-outlined">{icon}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {items.map((product) => (
          <div
            key={product.name}
            className="group flex flex-col bg-surface-container-low border border-outline-variant/20 overflow-hidden transition-all duration-500 card-shadow"
          >
            <div className="relative aspect-square overflow-hidden bg-surface-container">
              <Image
                fill
                alt={product.name}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                src={product.imageUrl}
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-gutter">
                <span className="text-primary font-label-lg text-label-lg">
                  CHEF&apos;S SIGNATURE
                </span>
              </div>
            </div>
            <div className="p-container-padding flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-headline-md text-[20px] md:text-headline-md">{product.name}</h3>
                <span className="font-label-lg text-label-lg text-primary">{product.price}€</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {product.description}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 border border-primary/30 rounded-full text-[10px] font-label-sm text-primary tracking-tighter uppercase">
                  {product.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
