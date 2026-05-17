import { defineArrayMember, defineField, defineType } from "sanity";

const hubSection = defineArrayMember({
  type: "object",
  name: "hubSection",
  fields: [
    defineField({ name: "anchor", title: "Ancla", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Cuerpo", type: "blockContent" }),
  ],
});

const procedureItem = defineArrayMember({
  type: "object",
  fields: [
    defineField({ name: "label", title: "Etiqueta", type: "string" }),
    defineField({ name: "slug_es", title: "Slug servicio", type: "string" }),
  ],
});

export const hub = defineType({
  name: "hub",
  title: "Especialidad (hub)",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "blockContent",
    }),
    defineField({
      name: "sections",
      title: "Secciones",
      type: "array",
      of: [hubSection],
    }),
    defineField({
      name: "procedureBlocks",
      title: "Bloques de procedimientos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "nestedBlock",
          fields: [
            defineField({ name: "style", type: "string", initialValue: "nested", readOnly: true }),
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "items", title: "Ítems", type: "array", of: [procedureItem] }),
          ],
          preview: { select: { title: "title" } },
        }),
        defineArrayMember({
          type: "object",
          name: "singleBlock",
          fields: [
            defineField({ name: "style", type: "string", initialValue: "single", readOnly: true }),
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "slug_es", title: "Slug servicio", type: "string" }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
