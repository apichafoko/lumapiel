import { defineField, defineType } from "sanity";
import { QueEsCatalogPreview } from "../components/QueEsCatalogPreview";

export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "legacyId",
      title: "ID interno",
      type: "string",
      readOnly: true,
      description: "Identificador estable (no editar sin coordinar con desarrollo).",
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titulo", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lista",
      title: "Listado",
      type: "string",
      options: {
        list: [
          { title: "Tratamientos", value: "tratamientos" },
          { title: "Consultas", value: "consultas" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Tratamiento", value: "tratamiento" },
          { title: "Consulta", value: "consulta" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "categorias",
      title: "Categorías",
      type: "string",
      description:
        "Separadas por | sin tildes (ej. cosmiatria, laser|capilar). laser|capilar lista en Láser y Capilar.",
    }),
    defineField({
      name: "aliases",
      title: "Aliases / descripción corta",
      type: "text",
      rows: 2,
      description: "Separados por | para SEO y tarjetas.",
    }),
    defineField({
      name: "hubRefs",
      title: "Referencias a hubs",
      type: "string",
      description: "Formato hub:id:ancla, separados por |",
    }),
    defineField({
      name: "relatedServiceIds",
      title: "Servicios relacionados (IDs)",
      type: "string",
    }),
    defineField({
      name: "hubPinRank",
      title: "Orden en hub",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "published",
      title: "Publicado (indexable)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "duracionMinutos",
      title: "Duración (minutos)",
      type: "number",
    }),
    defineField({
      name: "body",
      title: "Ficha completa",
      type: "blockContent",
      description:
        "Contenido de la página del tratamiento. La sección «1. ¿Qué es…» alimenta automáticamente las tarjetas del catálogo.",
    }),
    defineField({
      name: "queEsCatalogPreview",
      title: "Vista previa en catálogo («¿Qué es?»)",
      type: "string",
      components: {
        input: QueEsCatalogPreview,
      },
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "lista" },
  },
});
