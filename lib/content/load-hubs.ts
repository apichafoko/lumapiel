import estetica from "@/content/hubs/estetica-medica.es.json";
import laser from "@/content/hubs/tratamientos-laser.es.json";
import consulta from "@/content/hubs/consulta-dermatologica.es.json";
import { hubSchema, type HubRecord } from "@/lib/content/schema";

const hubs = [estetica, laser, consulta].map((h) => hubSchema.parse(h));

export function getAllHubs(): HubRecord[] {
  return hubs;
}

export function getHubBySlug(slug: string): HubRecord | undefined {
  return hubs.find((h) => h.id === slug);
}

/** Anchors declared for a hub (for validating hub_refs). */
export function getHubAnchorSet(hubId: string): Set<string> {
  const hub = getHubBySlug(hubId);
  if (!hub) return new Set();
  return new Set(hub.sections.map((s) => s.anchor));
}
