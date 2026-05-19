import { MAPS_URL, SITE_URL } from "@/lib/constants"
import { getSiteConfig } from "@/lib/site-config"

const SITE_ID = `${SITE_URL}/#website`
const ORG_ID = `${SITE_URL}/#organization`

export function WebsiteJsonLd() {
  const site = getSiteConfig()
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": ORG_ID,
        name: "Luma Piel",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        telephone: "+5491125276361",
        email: "contacto@lumapiel.com.ar",
        hasMap: MAPS_URL,
        address: {
          "@type": "PostalAddress",
          streetAddress: 'Arenales 3819 2° "A"',
          addressLocality: "Ciudad Autónoma de Buenos Aires",
          postalCode: "C1425",
          addressCountry: "AR",
        },
        description: site.address,
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: "Luma Piel",
        publisher: { "@id": ORG_ID },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/buscar?tab=tratamientos&q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/buscar?tab=consultas&q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
