import type { ServiceRecord } from "@/lib/content/schema";

/** hub:hubId:anchor → /especialidades/{hubId}#anchor */
export function hubRefToHref(ref: string): string | null {
  const m = ref.match(/^hub:([^:]+):(.+)$/);
  if (!m) return null;
  const [, hubId, anchor] = m;
  return `/especialidades/${hubId}#${anchor}`;
}

export function getPrimaryHubHref(service: ServiceRecord): string | null {
  const ref = service.hub_refs.split("|").map((s) => s.trim())[0];
  if (!ref) return null;
  return hubRefToHref(ref);
}
