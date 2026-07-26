import estetica from "@/content/hubs/estetica-medica.es.json";
import cosmiatria from "@/content/hubs/cosmiatria.es.json";
import laser from "@/content/hubs/tratamientos-laser.es.json";
import consulta from "@/content/hubs/consulta-dermatologica.es.json";
import { hubSchema, type HubRecord } from "@/lib/content/schema";
import { mdToPortableTextBlocks } from "@/lib/content/file/md-to-blocks";
import type { SanityHubDoc } from "@/lib/sanity/types";

const hubs = [estetica, cosmiatria, laser, consulta].map((h) =>
  hubSchema.parse(h),
);

/** Los hubs guardan markdown en `content/`; en Sanity ya viven como Portable Text. */
async function toHubDoc(hub: HubRecord): Promise<SanityHubDoc> {
  return {
    ...hub,
    description: await mdToPortableTextBlocks(hub.description),
    sections: await Promise.all(
      hub.sections.map(async (s) => ({
        ...s,
        body: await mdToPortableTextBlocks(s.body),
      })),
    ),
    procedureBlocks: hub.procedureBlocks,
  };
}

export function fileGetHubIds(): string[] {
  return hubs.map((h) => h.id);
}

export function fileGetAllHubs(): Promise<SanityHubDoc[]> {
  return Promise.all(hubs.map(toHubDoc));
}

export async function fileGetHubBySlug(
  slug: string,
): Promise<SanityHubDoc | undefined> {
  const hub = hubs.find((h) => h.id === slug);
  return hub ? toHubDoc(hub) : undefined;
}
