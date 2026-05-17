import { groq } from "next-sanity";

const serviceFields = groq`
  _id,
  legacyId,
  "slug_es": slug.current,
  tipo,
  lista,
  titulo,
  categorias,
  aliases,
  hubRefs,
  relatedServiceIds,
  hubPinRank,
  published,
  duracionMinutos,
  body
`;

export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(titulo asc) {
    ${serviceFields}
  }
`;

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    ${serviceFields}
  }
`;

export const SERVICE_SLUGS_QUERY = groq`
  *[_type == "service"] {
    "slug": slug.current,
    lista
  }
`;

export const SERVICE_BODIES_QUERY = groq`
  *[_type == "service"] {
    "slug_es": slug.current,
    body
  }
`;

export const HUB_BY_SLUG_QUERY = groq`
  *[_type == "hub" && slug.current == $slug][0] {
    "id": slug.current,
    title,
    "description": description,
    sections[] {
      anchor,
      title,
      body
    },
    procedureBlocks[] {
      style,
      title,
      slug_es,
      items[] {
        label,
        slug_es
      }
    }
  }
`;

export const ALL_HUBS_QUERY = groq`
  *[_type == "hub"] | order(title asc) {
    "id": slug.current,
    title,
    "description": description,
    sections[] {
      anchor,
      title,
      body
    },
    procedureBlocks[] {
      style,
      title,
      slug_es,
      items[] {
        label,
        slug_es
      }
    }
  }
`;

export const HUB_SLUGS_QUERY = groq`
  *[_type == "hub"] { "slug": slug.current }
`;

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    hero,
    pillars,
    howWeWork,
    frequentConsults,
    faqTitle,
    faq
  }
`;

export const PERSON_BY_SLUG_QUERY = groq`
  *[_type == "person" && slug.current == $slug && role == $role][0] {
    "slug": slug.current,
    role,
    displayName,
    jobTitle,
    seoDescription,
    body
  }
`;

export const PERSON_SLUGS_QUERY = groq`
  *[_type == "person"] {
    "slug": slug.current,
    role
  }
`;

export const LEGAL_BY_SLUG_QUERY = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    body
  }
`;

export const LEGAL_SLUGS_QUERY = groq`
  *[_type == "legalPage"] { "slug": slug.current }
`;
