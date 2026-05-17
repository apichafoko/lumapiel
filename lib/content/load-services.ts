import { mapServiceFromSanity } from "@/lib/sanity/map-service";
import {
  ALL_SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_QUE_ES_QUERY,
  SERVICE_SLUGS_QUERY,
} from "@/lib/sanity/queries";
import { fetchFromSanity, isSanityConfigured } from "@/lib/sanity/fetch";
import {
  fileGetAllServices,
  fileGetServiceBySlug,
  fileListConsultas,
  fileListTratamientos,
} from "@/lib/content/file/load-services";
import {
  fileGetServiceMarkdown,
  fileGetServiceQueEs,
} from "@/lib/content/file/load-service-md";
import { mdToPortableTextBlocks } from "@/lib/content/file/md-to-blocks";
import type { SanityServiceDoc, ServiceWithBody } from "@/lib/sanity/types";
import type { ServiceRecord } from "@/lib/content/schema";

export async function getAllServices(): Promise<ServiceRecord[]> {
  if (!isSanityConfigured()) return fileGetAllServices();
  const docs = await fetchFromSanity<SanityServiceDoc[]>({
    query: ALL_SERVICES_QUERY,
    tags: ["service"],
  });
  return (docs ?? []).map(mapServiceFromSanity);
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceWithBody | undefined> {
  if (!isSanityConfigured()) {
    const s = fileGetServiceBySlug(slug);
    if (!s) return undefined;
    const md = await fileGetServiceMarkdown(slug);
    const body = md ? await mdToPortableTextBlocks(md) : null;
    return {
      ...s,
      body,
      queEsPreview: md ? await fileGetServiceQueEs(slug) : null,
    };
  }
  const doc = await fetchFromSanity<SanityServiceDoc | null>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["service", `service:${slug}`],
  });
  if (!doc) return undefined;
  return {
    ...mapServiceFromSanity(doc),
    body: doc.body ?? null,
    queEsPreview: doc.queEsExcerpt ?? null,
  };
}

export async function listTratamientos(): Promise<ServiceRecord[]> {
  if (!isSanityConfigured()) return fileListTratamientos();
  const all = await getAllServices();
  return all.filter((s) => s.lista === "tratamientos");
}

export async function listConsultas(): Promise<ServiceRecord[]> {
  if (!isSanityConfigured()) return fileListConsultas();
  const all = await getAllServices();
  return all.filter((s) => s.lista === "consultas");
}

export async function getServiceSlugs(): Promise<
  Array<{ slug: string; lista: string }>
> {
  if (!isSanityConfigured()) {
    return fileGetAllServices().map((s) => ({
      slug: s.slug_es,
      lista: s.lista,
    }));
  }
  const rows = await fetchFromSanity<
    Array<{ slug: string; lista: string }> | null
  >({
    query: SERVICE_SLUGS_QUERY,
    tags: ["service"],
    perspective: "published",
    stega: false,
  });
  return rows ?? [];
}

/** @deprecated Usar getServiceBySlug que incluye body y excerpt. */
export async function getServicesMerged(
  locale: "es" | "en",
): Promise<ServiceRecord[]> {
  if (locale === "en") {
    console.warn("getServicesMerged(en): i18n en Sanity pendiente; devolviendo ES.");
  }
  return getAllServices();
}

export async function getServiceQueEsMap(): Promise<Map<string, string | null>> {
  if (!isSanityConfigured()) {
    const all = fileGetAllServices();
    const entries = await Promise.all(
      all.map(async (s) => [s.slug_es, await fileGetServiceQueEs(s.slug_es)] as const),
    );
    return new Map(entries);
  }
  const rows = await fetchFromSanity<
    Array<{ slug_es: string; queEsExcerpt?: string | null }> | null
  >({
    query: SERVICE_QUE_ES_QUERY,
    tags: ["service"],
  });
  return new Map(
    (rows ?? []).map((r) => [r.slug_es, r.queEsExcerpt ?? null]),
  );
}
