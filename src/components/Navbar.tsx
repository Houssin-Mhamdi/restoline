"use client"

import { useState } from "react"

export interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface NavbarProps {
  logoText?: string
  links?: NavLink[]
  slug?: string
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
  slug,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = slug
    ? links.map((link) => ({
        ...link,
        href: link.href.startsWith("/") ? `/${slug}${link.href}` : link.href,
      }))
    : links

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-500">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-base max-w-[1280px] mx-auto">
        <span className="font-display-lg text-[28px] leading-tight text-primary tracking-tighter uppercase">
          {logoText}
        </span>
        <div className="hidden md:flex items-center gap-gutter">
          {navLinks.map((link) => (
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
          <button className="hidden md:inline-block bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 hover:opacity-80 transition-opacity uppercase">
            BOOK TABLE
          </button>
          <button
            className="md:hidden text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-outline-variant/30 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col px-margin-mobile py-6 gap-4">
              {navLinks.map((link) => (
              <a
                key={link.href}
                className={
                  link.active
                    ? "font-label-lg text-label-lg text-primary border-l-2 border-primary pl-3"
                    : "font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors pl-3"
                }
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 hover:opacity-80 transition-opacity uppercase mt-2">
              BOOK TABLE
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
