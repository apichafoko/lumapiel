import { getAllServices } from "@/lib/content/load-services";
import type { ServiceRecord } from "@/lib/content/schema";

function refsHub(ref: string, hubId: string): boolean {
  const t = ref.trim();
  return t.startsWith(`hub:${hubId}:`);
}

function parseHubRef(ref: string): { hubId: string; anchor: string } | null {
  const m = ref.trim().match(/^hub:([^:]+):(.+)$/);
  if (!m) return null;
  return { hubId: m[1], anchor: m[2] };
}

/** Sección Cosmiatría dentro del hub Estética médica (listado aparte / card propia). */
const EM_COSMIATRIA_ANCHOR = "cosmiatria-y-acompanamiento";

/** Quita servicios que solo enlazan a esa sección (no deben repetirse en la ficha general de EM). */
function dropEsteticaMedicaCosmiatriaOnly(services: ServiceRecord[]): ServiceRecord[] {
  return services.filter((s) => {
    const refs = s.hub_refs
      .split("|")
      .map((x) => x.trim())
      .filter(Boolean);
    const emAnchors = refs.flatMap((r) => {
      const p = parseHubRef(r);
      return p && p.hubId === "estetica-medica" ? [p.anchor] : [];
    });
    if (emAnchors.length === 0) return true;
    const soloCosmiatria = emAnchors.every((a) => a === EM_COSMIATRIA_ANCHOR);
    return !soloCosmiatria;
  });
}

/** Servicios cuyo `hub_refs` apunta a una sección concreta (`hub:hubId:anchor`). */
export function getLinkedServicesForHubSection(
  hubId: string,
  sectionAnchor: string,
): {
  tratamientos: ServiceRecord[];
  consultas: ServiceRecord[];
} {
  const all = getAllServices();
  const inSection = all.filter((s) =>
    s.hub_refs
      .split("|")
      .map((x) => x.trim())
      .filter(Boolean)
      .some((ref) => {
        const p = parseHubRef(ref);
        return p && p.hubId === hubId && p.anchor === sectionAnchor;
      }),
  );
  const byTitle = (a: ServiceRecord, b: ServiceRecord) =>
    a.titulo.localeCompare(b.titulo, "es");

  return {
    tratamientos: inSection
      .filter((s) => s.lista === "tratamientos")
      .sort(byTitle),
    consultas: inSection.filter((s) => s.lista === "consultas").sort(byTitle),
  };
}

/** Servicios del catálogo que enlazan a esta especialidad vía `hub_refs`. */
export function getLinkedServicesForHub(hubId: string): {
  tratamientos: ServiceRecord[];
  consultas: ServiceRecord[];
} {
  const all = getAllServices();
  const inHub = all.filter((s) =>
    s.hub_refs
      .split("|")
      .map((x) => x.trim())
      .filter(Boolean)
      .some((ref) => refsHub(ref, hubId)),
  );
  const byTitle = (a: ServiceRecord, b: ServiceRecord) =>
    a.titulo.localeCompare(b.titulo, "es");

  /** Incluye borradores: el catálogo público también los muestra con etiqueta. */
  let tratamientos = inHub
    .filter((s) => s.lista === "tratamientos")
    .sort(byTitle);
  let consultas = inHub.filter((s) => s.lista === "consultas").sort(byTitle);

  if (hubId === "estetica-medica") {
    tratamientos = dropEsteticaMedicaCosmiatriaOnly(tratamientos);
    consultas = dropEsteticaMedicaCosmiatriaOnly(consultas);
  }

  return { tratamientos, consultas };
}
