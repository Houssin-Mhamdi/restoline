"use client"

import { Button } from "@/components/ui/button"

interface ExperienceCard {
  icon: string
  title: string
  description: string
  cta: string
  variant?: "default" | "accent"
}

interface PolicyCard {
  title: string
  description: string
}

const DEFAULT_EXPERIENCES: ExperienceCard[] = [
  {
    icon: "groups",
    title: "Large Parties",
    description:
      "For groups of 7 to 14 guests, we offer a communal table experience designed to foster connection. A pre-selected seasonal menu ensures a seamless evening of shared discovery.",
    cta: "ENQUIRE NOW",
  },
  {
    icon: "door_front",
    title: "The Obsidian Room",
    description:
      "Our private salon accommodates up to 20 guests in total seclusion with a dedicated service team.",
    cta: "VIEW SPACE",
    variant: "accent",
  },
]

const DEFAULT_POLICIES: PolicyCard[] = [
  {
    title: "CANCELLATIONS",
    description: "We require 48 hours notice for all cancellations to avoid a fee of $150 per person.",
  },
  {
    title: "DIETARY NEEDS",
    description:
      "Please inform us of any allergies at least 24 hours in advance to ensure the integrity of your meal.",
  },
  {
    title: "DRESS CODE",
    description:
      "We observe a smart-elegant dress code. We kindly request guests refrain from casual athletic wear.",
  },
]

interface BespeakExperiencesProps {
  title?: string
  subtitle?: string
  experiences?: ExperienceCard[]
  policies?: PolicyCard[]
}

function ExperienceCard({ icon, title, description, cta, variant }: ExperienceCard) {
  const containerClass =
    variant === "accent"
      ? "bg-surface-container-highest p-6 md:p-10 border border-outline-variant/10 flex flex-col justify-between"
      : "md:col-span-2 bg-background p-6 md:p-10 border border-outline-variant/10 flex flex-col justify-between hover:border-primary/40 transition-colors duration-500"

  return (
    <div className={containerClass}>
      <div>
        <span className="material-symbols-outlined text-primary text-4xl mb-6">{icon}</span>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">{description}</p>
      </div>
      <a
        className="font-label-lg text-label-lg text-primary flex items-center gap-2 group"
        href="#"
      >
        {cta}
        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
          arrow_forward
        </span>
      </a>
    </div>
  )
}

export default function BespeakExperiences({
  title = "Bespeak Experiences",
  subtitle = "From intimate celebrations to grand corporate affairs, we tailor every detail to your vision.",
  experiences = DEFAULT_EXPERIENCES,
  policies = DEFAULT_POLICIES,
}: BespeakExperiencesProps) {
  return (
    <section className="bg-surface-container-low py-section-gap">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">{title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.title} {...exp} />
          ))}
          {/* Policy cards */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-gutter mt-gutter">
            {policies.map((policy) => (
              <div
                key={policy.title}
                className="p-8 border border-outline-variant/10 bg-surface"
              >
                <h4 className="font-label-lg text-label-lg text-primary mb-3">{policy.title}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
