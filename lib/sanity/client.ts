import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  // `||` y no `??`: con la variable definida pero vacía (modo contenido local)
  // createClient lanzaría "Configuration must contain `projectId`".
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: "/studio",
  },
});
