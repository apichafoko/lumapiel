import type { ServiceRecord } from "@/lib/content/schema";

/** Categorías únicas (pipe-separadas en cada servicio). */
export function extractCategories(services: ServiceRecord[]): string[] {
  const set = new Set<string>();
  for (const s of services) {
    for (const c of s.categorias.split("|")) {
      const t = c.trim();
      if (t) set.add(t);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b, "es"));
}
