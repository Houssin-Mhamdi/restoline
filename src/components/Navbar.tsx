"use client"

export interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface NavbarProps {
  logoText?: string
  links?: NavLink[]
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "STORY", href: "/" },
  { label: "MENU", href: "/menu" },
  { label: "RESERVATIONS", href: "/reservations" },
  { label: "GALLERY", href: "/gallery" },
]

export default function Navbar({
  logoText = "DESPLAIN",
  links = DEFAULT_LINKS,
}: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-500">
      <div className="flex justify-between items-center px-margin-desktop py-base max-w-[1280px] mx-auto">
        <span className="font-display-lg text-[28px] leading-tight text-primary tracking-tighter uppercase">
          {logoText}
        </span>
        <div className="hidden md:flex items-center gap-gutter">
          {links.map((link) => (
            <a
              key={link.href}
              className={
                link.active
                  ? "font-label-lg text-label-lg text-primary border-b border-primary pb-1"
                  : "font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-300"
              }
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button className="bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 hover:opacity-80 transition-opacity uppercase">
          BOOK TABLE
        </button>
      </div>
    </nav>
  )
}
