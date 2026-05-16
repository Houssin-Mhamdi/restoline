"use client"

interface FooterSocialLink {
  label: string
  href: string
}

interface FooterLegalLink {
  label: string
  href: string
}

interface FooterProps {
  restaurantName?: string
  description?: string
  socialLinks?: FooterSocialLink[]
  legalLinks?: FooterLegalLink[]
}

export default function Footer({
  restaurantName = "DESPLAIN",
  description = "Redefining the boundaries of culinary artistry through precision, atmosphere, and local provenance.",
  socialLinks = [
    { label: "INSTAGRAM", href: "#" },
    { label: "FACEBOOK", href: "#" },
    { label: "LINKEDIN", href: "#" },
  ],
  legalLinks = [
    { label: "PRIVACY POLICY", href: "#" },
    { label: "TERMS OF SERVICE", href: "#" },
    { label: "PRESS KIT", href: "#" },
  ],
}: FooterProps) {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-[1280px] mx-auto">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="font-headline-md text-headline-md text-primary">{restaurantName}</div>
          <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
        </div>
        {/* Social / Connect Column */}
        <div className="flex flex-col gap-4 md:items-center">
          <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-widest">
            Connect
          </h4>
          <div className="flex flex-col gap-2 md:items-center">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* Legal Column */}
        <div className="flex flex-col gap-4 md:items-end">
          <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-widest">
            Legal
          </h4>
          <div className="flex flex-col gap-2 md:items-end">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* Copyright */}
        <div className="md:col-span-3 pt-12 text-center">
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase">
            &copy; 2024 {restaurantName} CULINARY ARTISTRY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
