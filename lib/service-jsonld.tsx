import { SITE_URL } from "@/lib/constants"

type BreadcrumbItem = { name: string; path: string }

export function ServiceJsonLd({
  name,
  description,
  urlPath,
}: {
  name: string
  description: string
  urlPath: string
}) {
  const url = `${SITE_URL}${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function MedicalProcedureJsonLd({
  name,
  description,
  urlPath,
  procedureType = "NoninvasiveProcedure",
  bodyLocation,
}: {
  name: string
  description: string
  urlPath: string
  procedureType?: string
  bodyLocation?: string
}) {
  const url = `${SITE_URL}${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    url,
    procedureType,
    ...(bodyLocation ? { bodyLocation } : {}),
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Dermatology",
    },
    howPerformed: "Procedimiento médico dermatológico y estético clínico.",
    provider: { "@id": `${SITE_URL}/#organization` },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQJsonLd({
  items,
}: {
  items: Array<{ question: string; answer: string }>
}) {
  if (!items || items.length === 0) return null
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function PersonJsonLd({
  name,
  jobTitle,
  urlPath,
  description,
  schemaType = "Physician",
  imageUrl,
  sameAs,
  medicalSpecialty,
  alumniOf,
  memberOf,
}: {
  name: string
  jobTitle: string
  urlPath: string
  description: string
  /** Médicos: Physician; resto del equipo: Person. */
  schemaType?: "Physician" | "Person"
  /** URL absoluta del retrato (p. ej. `/images/team/...`). */
  imageUrl?: string
  /** Perfiles externos (p. ej. Instagram). */
  sameAs?: string[]
  medicalSpecialty?: string[]
  alumniOf?: string
  memberOf?: string[]
}) {
  const url = `${SITE_URL}${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`
  const image =
    imageUrl != null && imageUrl.length > 0
      ? `${SITE_URL}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`
      : undefined
  const data = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name,
    jobTitle,
    description,
    url,
    ...(image ? { image } : {}),
    ...(sameAs?.length ? { sameAs } : {}),
    ...(medicalSpecialty?.length ? { medicalSpecialty } : {}),
    ...(alumniOf
      ? {
          alumniOf: {
            "@type": "EducationalOrganization",
            name: alumniOf,
          },
        }
      : {}),
    ...(memberOf?.length
      ? {
          memberOf: memberOf.map((org) => ({
            "@type": "MedicalOrganization",
            name: org,
          })),
        }
      : {}),
    worksFor: { "@id": `${SITE_URL}/#organization` },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
