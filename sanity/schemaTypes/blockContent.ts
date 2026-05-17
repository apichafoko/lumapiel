import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Contenido",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],
      lists: [
        { title: "Viñetas", value: "bullet" },
        { title: "Numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrita", value: "strong" },
          { title: "Cursiva", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Enlace",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    }),
    /** Tipo `table` registrado por el plugin @sanity/table en sanity.config.ts */
    defineArrayMember({
      type: "table",
      title: "Tabla",
    }),
  ],
});
