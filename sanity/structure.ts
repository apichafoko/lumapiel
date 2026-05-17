import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Inicio")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage"),
        ),
      S.divider(),
      S.listItem()
        .title("Tratamientos")
        .child(
          S.documentList()
            .title("Tratamientos")
            .filter('_type == "service" && lista == "tratamientos"')
            .defaultOrdering([{ field: "titulo", direction: "asc" }]),
        ),
      S.listItem()
        .title("Consultas")
        .child(
          S.documentList()
            .title("Consultas")
            .filter('_type == "service" && lista == "consultas"')
            .defaultOrdering([{ field: "titulo", direction: "asc" }]),
        ),
      S.listItem()
        .title("Especialidades")
        .child(
          S.documentList()
            .title("Especialidades")
            .filter('_type == "hub"')
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Equipo")
        .child(
          S.documentList()
            .title("Equipo")
            .filter('_type == "person"'),
        ),
      S.listItem()
        .title("Legal")
        .child(
          S.documentList()
            .title("Legal")
            .filter('_type == "legalPage"'),
        ),
    ]);
