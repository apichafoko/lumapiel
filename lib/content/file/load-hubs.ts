import estetica from "@/content/hubs/estetica-medica.es.json";
import cosmiatria from "@/content/hubs/cosmiatria.es.json";
import laser from "@/content/hubs/tratamientos-laser.es.json";
import consulta from "@/content/hubs/consulta-dermatologica.es.json";
import { hubSchema, type HubRecord } from "@/lib/content/schema";
import type { SanityHubDoc } from "@/lib/sanity/types";
import type { PortableTextBlock } from "@portabletext/types";

const hubs = [estetica, cosmiatria, laser, consulta].map((h) =>
  hubSchema.parse(h),
);

function mdToSingleBlock(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "fallback",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s", text, marks: [] }],
    },
  ];
}

export function fileGetAllHubs(): SanityHubDoc[] {
  return hubs.map((h) => ({
    ...h,
    description: mdToSingleBlock(h.description),
    sections: h.sections.map((s) => ({
      ...s,
      body: mdToSingleBlock(s.body),
    })),
    procedureBlocks: h.procedureBlocks,
  }));
}

export function fileGetHubBySlug(slug: string): SanityHubDoc | undefined {
  return fileGetAllHubs().find((h) => h.id === slug);
}
