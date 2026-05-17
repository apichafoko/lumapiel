import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Persona (equipo)",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol / ruta",
      type: "string",
      options: {
        list: [
          { title: "Doctora", value: "doctora" },
          { title: "Cosmetóloga", value: "cosmetologa" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Nombre para mostrar",
      type: "string",
    }),
    defineField({
      name: "jobTitle",
      title: "Cargo",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Descripción SEO",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Biografía",
      type: "blockContent",
    }),
  ],
  preview: {
    select: { title: "displayName", subtitle: "role" },
  },
});
