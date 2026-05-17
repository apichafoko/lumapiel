import type { ServiceRecord } from "@/lib/content/schema";
import type { SanityServiceDoc } from "@/lib/sanity/types";

function normalizeCategorias(raw: string | undefined): string {
  return (raw ?? "")
    .split("|")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean)
    .join("|");
}

export function mapServiceFromSanity(doc: SanityServiceDoc): ServiceRecord {
  return {
    id: doc.legacyId,
    tipo: doc.tipo,
    lista: doc.lista,
    titulo: doc.titulo,
    slug_es: doc.slug_es,
    categorias: normalizeCategorias(doc.categorias),
    aliases: doc.aliases ?? "",
    hub_refs: doc.hubRefs ?? "",
    related_service_ids: doc.relatedServiceIds ?? "",
    hub_pin_rank: doc.hubPinRank ?? 0,
    published: Boolean(doc.published),
    duracion_minutos: doc.duracionMinutos,
  };
}
