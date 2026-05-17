import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Inicio",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "headline", type: "string", title: "Titular" }),
        defineField({ name: "subhead", type: "text", title: "Subtítulo", rows: 3 }),
        defineField({ name: "primaryCta", type: "string", title: "CTA principal" }),
        defineField({ name: "secondaryCta", type: "string", title: "CTA secundario" }),
      ],
    }),
    defineField({
      name: "pillars",
      title: "Pilares",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Título" }),
            defineField({ name: "body", type: "text", title: "Texto", rows: 3 }),
            defineField({ name: "href", type: "string", title: "Enlace" }),
            defineField({ name: "linkLabel", type: "string", title: "Texto del enlace" }),
            defineField({
              name: "supportLine",
              title: "Línea de apoyo",
              type: "object",
              fields: [
                defineField({ name: "prefix", type: "string" }),
                defineField({ name: "linkText", type: "string" }),
                defineField({ name: "href", type: "url" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "howWeWork",
      title: "Cómo trabajamos",
      type: "object",
      fields: [
        defineField({ name: "sectionTitle", type: "string", title: "Título sección" }),
        defineField({ name: "almaLaserHref", type: "url", title: "Enlace Alma Lasers" }),
        defineField({
          name: "steps",
          title: "Pasos",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "id", type: "string" }),
                defineField({ name: "stepLabel", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 5 }),
                defineField({ name: "linkAlmaInBody", type: "boolean" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "frequentConsults",
      title: "Consultas frecuentes",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "id", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 4 }),
                defineField({ name: "href", type: "string" }),
                defineField({ name: "linkLabel", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "faqTitle", title: "Título FAQ", type: "string" }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text", rows: 4 }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Página de inicio" }),
  },
});
