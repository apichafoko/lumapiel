import { defineDocuments, defineLocations } from "sanity/presentation";

const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const locations = {
  homePage: defineLocations({
    select: { title: "hero.headline" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Inicio",
          href: "/",
        },
      ],
    }),
  }),
  service: defineLocations({
    select: { titulo: "titulo", slug: "slug.current", lista: "lista" },
    resolve: (doc) => {
      if (!doc?.slug) return { locations: [] };
      const base =
        doc.lista === "consultas" ? "/consultas" : "/tratamientos";
      return {
        locations: [
          {
            title: doc.titulo || doc.slug,
            href: `${base}/${doc.slug}`,
          },
        ],
      };
    },
  }),
  hub: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => {
      if (!doc?.slug) return { locations: [] };
      return {
        locations: [
          {
            title: doc.title || doc.slug,
            href: `/especialidades/${doc.slug}`,
          },
        ],
      };
    },
  }),
  person: defineLocations({
    select: {
      name: "displayName",
      slug: "slug.current",
      role: "role",
    },
    resolve: (doc) => {
      if (!doc?.slug || !doc?.role) return { locations: [] };
      return {
        locations: [
          {
            title: doc.name || doc.slug,
            href: `/${doc.role}/${doc.slug}`,
          },
        ],
      };
    },
  }),
  legalPage: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => {
      if (!doc?.slug) return { locations: [] };
      return {
        locations: [
          {
            title: doc.title || doc.slug,
            href: `/legal/${doc.slug}`,
          },
        ],
      };
    },
  }),
};

export const mainDocuments = defineDocuments([
  {
    route: "/",
    filter: `_type == "homePage"`,
  },
  {
    route: "/tratamientos/:slug",
    filter: `_type == "service" && slug.current == $slug && lista == "tratamientos"`,
  },
  {
    route: "/consultas/:slug",
    filter: `_type == "service" && slug.current == $slug && lista == "consultas"`,
  },
  {
    route: "/especialidades/:slug",
    filter: `_type == "hub" && slug.current == $slug`,
  },
  {
    route: "/doctora/:slug",
    filter: `_type == "person" && slug.current == $slug && role == "doctora"`,
  },
  {
    route: "/cosmetologa/:slug",
    filter: `_type == "person" && slug.current == $slug && role == "cosmetologa"`,
  },
  {
    route: "/legal/:slug",
    filter: `_type == "legalPage" && slug.current == $slug`,
  },
]);

export { previewOrigin };
