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

/** Etiquetas de catálogo que mapean a un área de /tratamientos (sin tildes, minúsculas). */
const PRIMARY_AREA_CATEGORIES: TreatmentAreaId[] = [
  "laser",
  "cosmiatria",
  "peelings",
  "capilar",
];

function normalizeCategory(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function categorySet(s: ServiceRecord): Set<string> {
  return new Set(
    s.categorias
      .split("|")
      .map(normalizeCategory)
      .filter(Boolean),
  );
}

/**
 * Áreas donde debe listarse el tratamiento (puede repetirse en más de una).
 * Etiquetas laser, cosmiatria, peelings y capilar suman áreas.
 * estetica|rejuvenecimiento → dermatológicos solo si no hay área primaria.
 */
export function getTreatmentAreaIds(s: ServiceRecord): TreatmentAreaId[] {
  const cats = categorySet(s);
  const primary = PRIMARY_AREA_CATEGORIES.filter((id) => cats.has(id));
  if (primary.length > 0) return primary;
  if (cats.has("estetica") || cats.has("rejuvenecimiento")) {
    return ["dermatologicos"];
  }
  return ["dermatologicos"];
}

/** Primera área (compatibilidad). Preferí getTreatmentAreaIds o serviceMatchesTreatmentArea. */
export function getTreatmentAreaId(s: ServiceRecord): TreatmentAreaId {
  return getTreatmentAreaIds(s)[0];
}

export function serviceMatchesTreatmentArea(
  s: ServiceRecord,
  area: TreatmentAreaId,
): boolean {
  return getTreatmentAreaIds(s).includes(area);
}

export function groupTratamientosByArea<T extends ServiceRecord>(
  items: T[],
): Record<TreatmentAreaId, T[]> {
  const empty = (): Record<TreatmentAreaId, T[]> => ({
    laser: [],
    cosmiatria: [],
    peelings: [],
    capilar: [],
    dermatologicos: [],
  });
  const out = empty();
  for (const s of items) {
    for (const areaId of getTreatmentAreaIds(s)) {
      out[areaId].push(s);
    }
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
