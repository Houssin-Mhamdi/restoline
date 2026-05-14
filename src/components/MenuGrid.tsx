"use client"

interface MenuItem {
  name: string
  price: number
  imageUrl: string
  description: string
  tag: string
}

const DEFAULT_ITEMS: MenuItem[] = [
  { name: "Truffle Wagyu L", price: 75, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnm0TE3Wiq84B1cw_IxNqLcSjBEfSbH7CMXkZpkq2RlvqmoJwxBBaXkYADDI6Rvbyhcw5G5Aa0C5NAFSxkCF--sFEH56jLnvr7xl6kFdQFTjalLseXY-vBK-lHoznc69Mj5ymGCTD34fTfqtDYzELfEOqTnEkNdp2u6uDXjeQ1FzU1oG_HCr_f_ymjLHYMtVmWtmEbOuI-5fmKBcZWHdiU8_d0jexlJk1x2MVU77t_8U2tN3MltZFvf6oiT4mfIzRc1h9Uc79JtzCG", description: "2 textures of wagyu beef", tag: "Rare Ingredients" },
  { name: "Saffron Risotto XL", price: 95, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo_WE7ytafqaMI7otMF4gqjH2fldVKHd-e0LwoekUQYdAp4YxDgTdMMhUEVPkZMKDgXMiqMaPCx3gXG9rsuH_9yKPgKiH0GoHz62lGEwTkp5EwWpttgb3UmJLp3WiU1dyU883cApmPC6jMV-mVOY5PBogGBTcb38RTBUUdMAbaeskXXDLlRWvgnq6MR1VDws9-XykuuQvYDkke5f3NiPEsA7Nnf877jfub7H7rctTKPLsVQz1pM4Y5s8Yv5Sh-pRNCE3bUYWeIqAEs", description: "3 grains of premium arborio", tag: "Artisanal" },
  { name: "Oceanic Gold XXL", price: 145, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsmFaAQBLXPv8K6BLT9OyEuM59o44scN96hrqsaszRO2bGuZmfW4AoLHLJ3uFogcSRevcsYA77fAG4vhpGU9SyERUrczbeNac0XBPH5b3Jzwlz1XcHZ8b2aKtkud-RWpEhchzZOALZ6b17NnqhrKhbTr-HuGU2SfNmlnUuTmGGinZkZaPc-vSL82lhcnYrsI3GUm5ITFbhAHcEJAbj-9ZnZKkaRtJlq0y422aXAGifVwff0LjPekov5MeHZPfYFSlovzIOcZDGNlSO", description: "4 infusions of sea broth", tag: "Exclusive" },
  { name: "Truffle Tagliatelle L", price: 42, imageUrl: "https://lh3.googleusercontent.com/aida/ADBb0ui2iXyKmc6Ih0SSDQovFy3ycKG9Hyt-Md7mV-7xDRHX5TKF_MwMI_74JpqLkhnWIwM9Sgd9XV9thj4fl-DK2QltupHsu5Dl-2x45FIYRFA7qQbTevxX3enVS5m-IIN0uQzskKm2w-bYo_QhWCueY4mLdVaNiZSStNkEgmuo3zY60AiCH9Eijng5LzhApoFjVnLEDDhfFV2IdrVxhfyvf4ebSGn3ea13dcwywnUEKUZPCWVyRVmNKDffWrsy", description: "Fresh pasta, hand-shaved truffle", tag: "Artisanal" },
  { name: "Coquilles Saint-Jacques XL", price: 55, imageUrl: "https://lh3.googleusercontent.com/aida/ADBb0uh_ouAcv0vvUFA7Wa1t9VgEDyVpo6zfkoUL9r0_pE9SAaL8t_KiFt_UIGHJ9ji73kzopM-KUbxDJUc25fjwNFyVAw4Mvne_uSQnKoJX2XmyO1oUAl06mROxwS8XIbGQ6HsRI1hr8OsMGFxe9hN9U5JTp8VHLp6iHCKdhGHismff1-MDC7LqPwicOgp7Ug9Xw-20jhsNYU95xkPA1Yxt_P1GP0YySTpsIdo-GdczIqpbQwvbbzsmC1QY-KHd", description: "Seared scallops, saffron foam", tag: "Exclusive" },
  { name: "Lamb Tagine XXL", price: 68, imageUrl: "https://lh3.googleusercontent.com/aida/ADBb0ujoT_OSaFKKzrxtunU0cBXdsc_zoJNOuyGC9KLm2H_0scOBQZMvHXcbjgUM4Gh0uz7xcEYSke1pYOAdt7dGBtbH8mYCmcO3mMt6NvBlEf79LntXcaA7IWOKJTOVEsUuZZ2Oz5x07lSHHK5952IE5ydYc25H6JMr1vjrelzVeSK0W2AnL1n6u5AJuIMQxryqh31ZxdBRNQX7NF_Cn-QlLELmPlOvM-RHm-YL9KRBu9Y0P7XmzH3ARAPGMoXG", description: "Slow-cooked tender lamb shank", tag: "Heritage" },
  { name: "Osso Buco Moderne L", price: 56, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp4k7YxRR9X4NUlBMtI2_07DNLNNv-Vfqc6rpLUB6O-8T4FMfr5SOG31INuVOpt_RtC07vkRiGFBfTOQGqvSRVQMOH6wM81Lb2WYY-xkYpYkzaBS8JSReFGskFgW3ojwcQR3eQo1a42A1yLMghuo0KrX2pf8Lt0cy2kIHi0S8uYlOKgBgHkORlqpPeWCPlkF2mxqcRP12H4ar-LW3CNNgaTH48ADFHhGHzhFe9JUzITO3Q8NBau8whrfrHGHlPhUPPEZ8yIC_Z9cbe", description: "Reinterpreted classic veal shank", tag: "Signature" },
  { name: "Risotto Nero XL", price: 48, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDZ0yckXCqY7MkY6r_HW7gtX-fn3kC2p-Z61Mk7KoWHEp_XaKQuy6fPLTGoKG7-Lx2rezLoLYqfXZPrYltxa4J7f7Bb3xQ6qKPv6lYYcAhdIlAU0zaQIYN40lipU0-e1elvSgNm5a4X6_8i1rzaGkhf4wdy8jrfUMEWrGp_gQXgJexH90KnNjQ5N5vH0BoYBmH_m-oHkzxTn5D-ive614TxnlFeg44fVLmoEbBgbD_VVHTQl_3JSnoSpBRksBPS_lwjReYrH23Xg3", description: "Squid ink, gold leaf, sea foam", tag: "Artisanal" },
  { name: "Branzino Cru XXL", price: 52, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnm0TE3Wiq84B1cw_IxNqLcSjBEfSbH7CMXkZpkq2RlvqmoJwxBBaXkYADDI6Rvbyhcw5G5Aa0C5NAFSxkCF--sFEH56jLnvr7xl6kFdQFTjalLseXY-vBK-lHoznc69Mj5ymGCTD34fTfqtDYzELfEOqTnEkNdp2u6uDXjeQ1FzU1oG_HCr_f_ymjLHYMtVmWtmEbOuI-5fmKBcZWHdiU8_d0jexlJk1x2MVU77t_8U2tN3MltZFvf6oiT4mfIzRc1h9Uc79JtzCG", description: "Wild seabass, citrus emulsion", tag: "Oceanic" },
]

interface MenuGridProps {
  title?: string
  icon?: string
  items?: MenuItem[]
}

export default function MenuGrid({
  title = "COMPOSE YOUR MASTERPIECE",
  icon = "restaurant_menu",
  items = DEFAULT_ITEMS,
}: MenuGridProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-margin-desktop mb-section-gap">
      <h2 className="font-headline-md text-headline-md text-primary mb-12 flex items-center gap-3">
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
              <img
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={product.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-gutter">
                <span className="text-primary font-label-lg text-label-lg">
                  CHEF&apos;S SIGNATURE
                </span>
              </div>
            </div>
            <div className="p-container-padding flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-headline-md text-headline-md">{product.name}</h3>
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
