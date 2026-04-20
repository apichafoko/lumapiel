import type { ServiceRecord } from "@/lib/content/schema";

/** Áreas de navegación para /tratamientos (agrupan las etiquetas pipe-separadas del catálogo). */
export const TREATMENT_AREA_IDS = [
  "laser",
  "cosmiatria",
  "peelings",
  "capilar",
  "dermatologicos",
] as const;

export type TreatmentAreaId = (typeof TREATMENT_AREA_IDS)[number];

export const TREATMENT_AREA_LABELS: Record<TreatmentAreaId, string> = {
  laser: "Láser",
  cosmiatria: "Cosmiatría",
  peelings: "Peelings",
  capilar: "Capilar",
  dermatologicos: "Dermatológicos",
};

/** Descripción corta para ayuda contextual (opcional en UI). */
export const TREATMENT_AREA_DESCRIPTIONS: Record<TreatmentAreaId, string> = {
  laser: "Tecnología láser para manchas, textura, vascular y más.",
  cosmiatria: "Higiene profunda, acompañamiento y preparación de la piel.",
  peelings: "Renovación química controlada por indicación médica.",
  capilar: "Estímulo y manejo médico del cuero cabelludo y folículo.",
  dermatologicos:
    "Medicina estética inyectable, bioestimulación y procedimientos clínicos.",
};

function categorySet(s: ServiceRecord): Set<string> {
  return new Set(
    s.categorias
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean),
  );
}

/**
 * Asigna cada tratamiento a un solo bloque para listados agrupados (sin duplicar fichas).
 * Prioridad: láser → cosmiatría → peelings → capilar → dermatológicos.
 */
export function getTreatmentAreaId(s: ServiceRecord): TreatmentAreaId {
  const cats = categorySet(s);
  if (cats.has("laser")) return "laser";
  if (cats.has("cosmiatria")) return "cosmiatria";
  if (cats.has("peelings")) return "peelings";
  if (cats.has("capilar")) return "capilar";
  if (cats.has("estetica") || cats.has("rejuvenecimiento"))
    return "dermatologicos";
  return "dermatologicos";
}

export function groupTratamientosByArea(
  items: ServiceRecord[],
): Record<TreatmentAreaId, ServiceRecord[]> {
  const empty = (): Record<TreatmentAreaId, ServiceRecord[]> => ({
    laser: [],
    cosmiatria: [],
    peelings: [],
    capilar: [],
    dermatologicos: [],
  });
  const out = empty();
  for (const s of items) {
    out[getTreatmentAreaId(s)].push(s);
  }
  return out;
}

/** Etiquetas de categoría presentes en un conjunto de servicios (subfiltros). */
export function extractCategoriesInItems(items: ServiceRecord[]): string[] {
  const set = new Set<string>();
  for (const s of items) {
    for (const c of s.categorias.split("|")) {
      const t = c.trim();
      if (t) set.add(t);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b, "es"));
}
