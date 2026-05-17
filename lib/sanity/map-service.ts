import type { ServiceRecord } from "@/lib/content/schema";
import type { SanityServiceDoc } from "@/lib/sanity/types";

export function mapServiceFromSanity(doc: SanityServiceDoc): ServiceRecord {
  return {
    id: doc.legacyId,
    tipo: doc.tipo,
    lista: doc.lista,
    titulo: doc.titulo,
    slug_es: doc.slug_es,
    categorias: doc.categorias ?? "",
    aliases: doc.aliases ?? "",
    hub_refs: doc.hubRefs ?? "",
    related_service_ids: doc.relatedServiceIds ?? "",
    hub_pin_rank: doc.hubPinRank ?? 0,
    published: Boolean(doc.published),
    duracion_minutos: doc.duracionMinutos,
  };
}
