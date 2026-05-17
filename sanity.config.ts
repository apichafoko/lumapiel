import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { locations, mainDocuments, previewOrigin } from "./sanity/presentation/resolve";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "lumapiel",
  title: "Luma Piel",
  /** Debe coincidir con la ruta Next.js app/studio/[[...tool]] */
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve: { locations, mainDocuments },
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
