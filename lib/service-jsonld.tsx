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
    worksFor: { "@id": `${SITE_URL}/#organization` },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
