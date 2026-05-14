"use client"

interface GalleryItem {
  imageUrl: string
  alt: string
  overlay?: {
    label?: string
    title?: string
    centered?: boolean
  }
  spanClasses: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhFC4kND07nHE5McCR5MeOvLgKkTLY4kFne4ETRM4h2cQcgUV2kIG5HHAjKUYUJDvAXif7ESy7X2LV1umL8g1KItooPjzz4lAyGuB3oAajhiM0DyQCmfaW-ToBh1r2x_Pac7K4RpiiGZYxKrlFc-SD9MPIySB-oJlujI0aeF8eY5p330CSN0BHGGywMGGjOiuQ7NkYpYSX-8BPcANX3WNhWVOBg5vM7WVNcoVxRPrIZMphXWmA09AZ9a5qLzW_NzWlyG_n2eurgZf9",
    alt: "A grand, high-ceilinged luxury restaurant interior at dusk with dark charcoal walls and warm gold accent lighting.",
    overlay: { label: "Architecture", title: "The Inner Sanctum" },
    spanClasses: "md:col-span-8 md:row-span-2",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACdQMNKkxm8Db9pLOYnoZs0Z3hyDfVTumgQ_uHKDktUHlt1PMruOfxLAocuRsRgeBGDaFV5p1ZWoneF9YWiOIHRioTlUfN1fesIh8Y32kBC0IXH7oA3Hc5G_LxXqdo3Vr6mqlhYw74TSXSTIJZwqMlPsB334Kp6aBnrmX9iRxNyKyhl0-wckSIjmM70Uz1OjcR8Qb4LCaQNYEx4Yr31K2jn2NXlTYVnVFcuBnNkj2IT9lKzTI9qi2Z7-HgYJ1iTeAjKWAO5XTptG2N",
    alt: "A professional close-up of a gourmet seafood dish plated with mathematical precision on a matte black ceramic plate.",
    overlay: { label: "Culinary Art" },
    spanClasses: "md:col-span-4 md:row-span-1",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcNQwnA17y6abnnGmkn0BIkL2po1c5qu1OhPKlRoRdnyFJfqGPYYfTV4BuItCbwfCXm6UgkzbONcQFe3wvbldFOcd7J-Zcyui-z8f4Jo3XIcNy-YAhgcZg8xObnuftlYua1BH9Qnx-qpgk8sCw4ppjGZEXt3Y9qFl9bedpC5-p6BL1nnxyg9Mrc2Lei1IPtkQLPUapccoyt7pFesEvQr_wxPLHHvW25_aLQlBPkTKRMZtMlSRk8Pbkx9xaLnWnZHp6GhphbNFDDUW4",
    alt: "A moody, cinematic shot of a professional chef's hands carefully garnishing a dish with tweezers in a high-end kitchen.",
    overlay: { label: "The Craft", title: "Precision" },
    spanClasses: "md:col-span-4 md:row-span-2",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBptMnOXrsys4o2B3TmN6J0juwXnFkmsEONm-3cwvfCt0HpSb_R240I5IP1f3HEPPI-aKHHsOfVNFBAbaD4piutR-nMufS2q26c-9sbQOosmMjJmGW_e9xAnDQQLk7QyKOvTEA_YKBOOi9mjyFLZYfq_BOfR5uvzOLqWErUIqkv2gs03aCot6LPrhwaFJIm1P1YfXkGSGsn3EexM2XzU6ew61hQXa0Iy4SL9UJdk10TY10BJXdUER7En446Jrs9YFmGqppLu_04HU9f",
    alt: "A sophisticated dark cocktail with a single large crystal-clear ice cube, garnished with a dried botanical element.",
    overlay: { label: "Mixology" },
    spanClasses: "md:col-span-4 md:row-span-1",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAx_nW2blu4YW-8QuRWjbbWUhTwsnIgn7nvbeVkOL2gGC2t5K6QhVZgxAtE8XcHbDlDvmZndBNnwZQZEFbLwcT3F4CxWArm2C5w_uwMUV5f1MeveKsDPJWa4C8dDTixMVtGm_ukjAGtz49igPmNlaGIE8fnHzm4nkR5q5SeGb4S2BWqfSMWqxqLjlGDzHfgtRvNOs6yeOjhF3SIJkHAIt7b142CljohrYe6uC_7AdjqzW71KUEMRg3sX2utc59OdN0TZjvoYiVkDVoq",
    alt: "An atmospheric wide shot of a private dining room at Desplain, featuring a single long oak table with minimalist place settings.",
    overlay: { label: "Experience", title: "Atmospheric Purity" },
    spanClasses: "md:col-span-4 md:row-span-2",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBObI5G-Eoqa-T9D0IHjzGP_6iIViHkKhqGD01Jquzu9jtGMo0h7D6CpPCOiafTLAWs4yttW5oBBzN6GIBmvENASX_AEOg5aproNeaBYd-N5EjIGgVbUAgori1ZWYeiEUaf5lgUmSrJJGUIWhSJUeNx5NHTDehgkybgGzUZA6e2IYRAzAJsyAhFdhOn7g-XFL9P0xtzZJh-o4a9So__fccCJX2G1Szt-Uh_x0rENwIAFtR3Wuag6i0sOdNH6LVus9ZfeUVjAWBuUQ7i",
    alt: "Macro photography of charred vegetables and molecular foam on a textured artisanal plate.",
    overlay: { label: "DETAIL IN EVERY ELEMENT", centered: true },
    spanClasses: "md:col-span-8 md:row-span-1",
  },
]

export default function GalleryGrid({ items = GALLERY_ITEMS }: { items?: GalleryItem[] }) {
  return (
    <section className="max-w-[1280px] mx-auto px-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[280px]">
        {items.map((item) => (
          <div
            key={item.spanClasses + item.imageUrl.slice(-20)}
            className={`${item.spanClasses} group relative overflow-hidden bg-surface-container`}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              alt={item.alt}
              src={item.imageUrl}
            />
            {item.overlay && (
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col ${
                  item.overlay.centered
                    ? "justify-center items-center"
                    : "justify-end p-gutter"
                }`}
              >
                {item.overlay.label && (
                  <span
                    className={
                      item.overlay.centered
                        ? "font-label-lg text-label-lg text-primary tracking-widest border border-primary/30 px-6 py-2"
                        : "font-label-sm text-label-sm text-primary uppercase mb-2"
                    }
                  >
                    {item.overlay.label}
                  </span>
                )}
                {item.overlay.title && (
                  <h3 className="font-headline-md text-headline-md">{item.overlay.title}</h3>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
