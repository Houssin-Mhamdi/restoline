"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ErrorBoundary from "@/components/ErrorBoundary"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { RestaurantContext } from "@/lib/restaurant-context"

export interface MenuProduct {
  name: string
  price: number
  imageUrl?: string
  description?: string
  tags?: string[]
  category?: string
}

export interface MenuData {
  restaurantName: string
  logo?: string
  tagline?: string
  description?: string
  heroTitle?: string
  heroSubtitle?: string
  footerDescription?: string
  established?: string
  location?: string
  hours?: string
}

const DEFAULT_DATA: MenuData = {
  restaurantName: "DESPLAIN",
  heroTitle: "CULINARY ARTISTRY REDEFINED",
  heroSubtitle: "Est. 1994",
  description:
    "At Desplain, we believe that dining is not merely a transaction, but a sensory symphony. Our journey began in the pursuit of perfection, sourcing only the rarest ingredients to create experiences that linger long after the final course.",
  footerDescription:
    "Redefining the fine dining experience through precision, passion, and unparalleled artistry.",
  established: "1994",
  location: "742 Culinary Row, Arts District, Manhattan, NY 10012",
  hours: "TUE - SUN: 17:30 - 23:00",
}

export default function MenuPage({ data = DEFAULT_DATA }: { data?: MenuData }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <ErrorBoundary>
      <Navbar logoText={data.restaurantName} />

      {!ready ? (
        <LoadingSkeleton className="min-h-screen" />
      ) : (
        <>
          {/* Hero Section */}
          <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                fill
                alt="A macro photograph of a masterfully plated gourmet dish featuring a seared scallop resting on a vibrant pea purée, garnished with micro-greens and edible gold leaf."
                className="object-cover brightness-[0.4]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8H9VnzQFDEmNWDR-CRI871EwiMgBQhWQVZBwOCnz1W4Wk4bj34wK1ZGofAQfNCHYV0wCrsn-0fntWMKvCP4I0qufwF8i4SityO_amRJGEjCL4-gFIDQJ-A1OzHYSvxg47ymTVoaEkuiVU6Mp19-ILE7VcvbjdG2UdWmlbmd67FpZghH_gdNuxi0TMlIkEizyQeA7mrLKh8RfJjRvSgqYcAmPPRm0HojnTtxzDo-4en1oyprGj6BLarZKSHHM8Ld8i9kYPUr3_hnxo"
                sizes="100vw"
                priority
              />
            </div>
            <div className="relative z-10 text-center px-margin-mobile md:px-0">
              <p className="font-label-lg text-label-lg text-primary mb-4 tracking-[0.3em] uppercase">
                {data.heroSubtitle || `Est. ${data.established}`}
              </p>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-8 max-w-4xl mx-auto uppercase">
                {data.heroTitle}
              </h1>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <a
                  href="/reservations"
                  className="bg-primary text-on-primary font-label-lg text-label-lg px-12 py-4 hover:opacity-90 transition-all uppercase inline-block"
                >
                  BOOK A TABLE
                </a>
                <a
                  href="/menu"
                  className="border border-primary text-primary font-label-lg text-label-lg px-12 py-4 hover:bg-primary/10 transition-all uppercase inline-block"
                >
                  VIEW MENU
                </a>
              </div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <span className="material-symbols-outlined text-primary text-3xl">
                keyboard_double_arrow_down
              </span>
            </div>
          </header>

          <main>
            {/* Story Section */}
            <section
              id="story"
              className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-section-gap items-center"
            >
              <div className="order-2 md:order-1">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-8 uppercase">
                  A LEGACY OF FLAVOR
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                  At Desplain, we believe that dining is not merely a transaction, but a sensory
                  symphony. Our journey began in the pursuit of perfection, sourcing only the rarest
                  ingredients to create experiences that linger long after the final course.
                </p>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                  Every plate is a canvas, and every ingredient is a deliberate stroke of genius. Our
                  kitchen, led by Master Chef Julian Desplain, operates with the precision of an atelier
                  and the soul of a poet.
                </p>
                <a
                  className="font-label-lg text-label-lg text-primary border-b border-primary/40 pb-1 hover:border-primary transition-all uppercase"
                  href="#"
                >
                  READ OUR STORY
                </a>
              </div>
              <div className="relative order-1 md:order-2 h-[400px] md:h-[600px]">
                <Image
                  fill
                  alt="A professional black and white portrait of a high-end chef in a pristine white uniform, standing in a dimly lit, modern commercial kitchen."
                  className="object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuASykNSum2ryNVA2HTmNk8KUCk4gI3iXCCH-jBfpd5zEgC0eUJd0P0qABxY5wnsgcwrCus3X_1AJ0-RsbzIRxl583_RbjALePjYdswaJHjyaou1eSaXYrj5p1YJbLP2NYY0tVAHFIyDrOQgc1RJ0W2ENSazOgKkzkws86ijIIVcBultIfq6YuIw7HzbFLSW7wP64xKZs2bJADXoLbhViiSGTq6rVhaSdRxxnjIsr2ruxpL0xNO0XkLvX6vJ8Lp1395v9kO3cqw--fGR"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </section>

            {/* Menu Preview Section */}
            <section id="menu" className="bg-surface-container-low py-section-gap">
              <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
                <div className="text-center mb-section-gap">
                  <p className="font-label-lg text-label-lg text-primary mb-4 uppercase">Selection</p>
                  <h2 className="font-headline-lg text-headline-lg text-on-background uppercase">
                    SIGNATURE DISHES
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end">
                      <span className="font-headline-md text-headline-md text-on-background uppercase">
                        Truffle Infused Wagyu
                      </span>
                      <div className="dot-leader" />
                      <span className="font-label-lg text-label-lg text-primary">$85</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic">
                      A5 Grade Kagoshima beef, shaved black winter truffle, gold leaf, aged soy
                      reduction.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end">
                      <span className="font-headline-md text-headline-md text-on-background uppercase">
                        Blue Fin Otorro
                      </span>
                      <div className="dot-leader" />
                      <span className="font-label-lg text-label-lg text-primary">$62</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic">
                      Sustainably sourced fatty tuna, hand-grated wasabi root, citrus foam, caviar
                      pearls.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end">
                      <span className="font-headline-md text-headline-md text-on-background uppercase">
                        Saffron Risotto
                      </span>
                      <div className="dot-leader" />
                      <span className="font-label-lg text-label-lg text-primary">$48</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic">
                      Acquerello rice, Persian saffron, 36-month aged Parmigiano, bone marrow brûlée.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end">
                      <span className="font-headline-md text-headline-md text-on-background uppercase">
                        Wild Forest Fungi
                      </span>
                      <div className="dot-leader" />
                      <span className="font-label-lg text-label-lg text-primary">$42</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic">
                      Foraged morels, porcini dust, hazelnut earth, smoked thyme vapor.
                    </p>
                  </div>
                </div>
                <div className="mt-section-gap text-center">
                  <a
                    href="/menu"
                    className="border border-primary text-primary font-label-lg text-label-lg px-12 py-4 hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase inline-block"
                  >
                    EXPLORE FULL MENU
                  </a>
                </div>
              </div>
            </section>

            {/* Gallery Section (Bento Grid) */}
            <section id="gallery" className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-16 text-center uppercase tracking-widest">
                VISUAL ARTISTRY
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter min-h-[300px] md:h-[800px]">
                <div className="relative md:col-span-2 md:row-span-2 overflow-hidden group">
                  <Image
                    fill
                    alt="A wide-angle shot of a luxurious, modern restaurant interior at night."
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmufwU_3MUSyfylDckVpCtqKcDi3U5rifFfO0UGQMp0IjTbwSEgMkoWG6WK0W3c-qBtIkAWaI4Gb9s7qIsAYZI8QpnGJJWAKgFk8eAuQ7pjAffHU5H8w6y_AAfe3m42sY2UyHqCHrHwAWFvzor6EDFmJ7dPUEPp92EQ-IfellACPngcRo-OiHDhkBBATwlEe8-_ImNxXWQwHu5ErwUyVM4j1h0aSSVUU7NLgd4hi8C9oayEpR2owmz_7mkE4yj7c7zV6CJosleptM9"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="relative md:col-span-1 md:row-span-1 overflow-hidden group">
                  <Image
                    fill
                    alt="An overhead extreme close-up of a delicate dessert featuring a white chocolate sphere."
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC064kV98mHtIhyt3NGuomHk2Awii0etZ4ctHDQ0nihpI5laQtJ5Ozh9cYd0T25OBPo13eJI3l1yfGsf3vZD8VSKocFQDLPXViBTAxVwRjY9sSeuy0irx7CWmeKKagNo6R75lvcEB-Qx31HbGHS3ssz5F507ak1Nn90z_SSzeFmX9S4GkMVtbxpkOkinJcmlS_OUobANalJCSA9mTIBFiGv0Fr1Qvd8M5lo-bqDyCqpsvC4EIy3jSPQsTOsw63WQTKcEn46E5XV7ZH-"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="relative md:col-span-1 md:row-span-2 overflow-hidden group">
                  <Image
                    fill
                    alt="A close-up of a signature gold-flecked cocktail in a crystal glass."
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFeuYbRel1gLWnhOGZPVHQ71wBlwsfx5uG-qGmzGS7uFSqX0gECFEQ86Ls66tifbd2Zo-q3H_K8hQM54_3RiFKISQUNUO2otbw_jnoWs3RAYo3UEbjV5qE98Q_nDfFRDZjZiOOQRWHjIzOVPWlu0f6I-zy9Pd5p_ezIp8sttN3yli8hTJi8R251DopVP669DWyOPqtByE6rkRaOs2l9AnCXWRqwm5cAUFpYP6kKFcrp9NELXZxywhuqWDALtDgBcG0E9rOEQKMH5Su"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="relative md:col-span-1 md:row-span-1 overflow-hidden group">
                  <Image
                    fill
                    alt="A dramatic shot inside a glass-walled wine cellar featuring hundreds of vintage bottles."
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpXpmugmS28S5jjucRMEgfd0k_Kq0RYwhFO1-bKTiucO65V1aGrVuhQXzPThIcQpcl4ZtEqYeST8v55U_6YnB0cdZNR8kVfdTbANg8RT5h4Br5vTmoB1kpybsr8MWko0BtDEpM-ur9z8fgD8LaG2yQTaJ4_QFrTFzldx4Q-8V7IJ1COfJTNjf5eyJ_xBotOabBc4W5YSJyZXPVKwIjsJQVYhDJf_YLWMu_OteGXLiv0vYuGAiXp8jyGKnSC2vSWCgAfP3Vz0vR4KNj"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>

            {/* Reservations Section */}
            <section
              id="reservations"
              className="relative py-section-gap overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-[#1A1A1A]" />
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              </div>
              <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto text-center">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-6 uppercase">
                  SECURE YOUR TABLE
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                  Experience the pinnacle of culinary artistry. Reservations are highly recommended and
                  can be made up to three months in advance.
                </p>
                <a
                  href="/reservations"
                  className="block w-full bg-primary text-on-primary font-label-lg text-label-lg py-5 hover:opacity-90 transition-all uppercase text-center"
                >
                  BOOK A TABLE
                </a>
              </div>
            </section>
          </main>
        </>
      )}

      <Footer
        restaurantName={data.restaurantName}
        description={data.footerDescription}
      />
    </ErrorBoundary>
  )
}
