import { mapServiceFromSanity } from "@/lib/sanity/map-service";
import {
  ALL_SERVICES_QUERY,
  SERVICE_BODIES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_SLUGS_QUERY,
} from "@/lib/sanity/queries";
import { extractQueEsFromPortableText } from "@/lib/content/extract-que-es-pt";
import { fetchFromSanity, isSanityConfigured } from "@/lib/sanity/fetch";
import { resolveContentPerspective } from "@/lib/sanity/perspective";
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
  const local = fileGetAllServices();
  if (!isSanityConfigured()) return local;
  const docs = await fetchFromSanity<SanityServiceDoc[]>({
    query: ALL_SERVICES_QUERY,
    tags: ["service"],
    perspective: await resolveContentPerspective(),
  });
  const mapped = (docs ?? []).map(mapServiceFromSanity);
  if (mapped.length === 0) {
    return local;
  }
  if (local.length > mapped.length) {
    const mappedSlugs = new Set(mapped.map((s) => s.slug_es));
    const missing = local.filter((s) => !mappedSlugs.has(s.slug_es));
    return [...mapped, ...missing];
  }
  return mapped;
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceWithBody | undefined> {
  if (isSanityConfigured()) {
    const doc = await fetchFromSanity<SanityServiceDoc | null>({
      query: SERVICE_BY_SLUG_QUERY,
      params: { slug },
      tags: ["service", `service:${slug}`],
      perspective: await resolveContentPerspective(),
    });
    if (doc) {
      const body = doc.body ?? null;
      return {
        ...mapServiceFromSanity(doc),
        body,
        queEsPreview: extractQueEsFromPortableText(body),
      };
    }
  }
  const s = fileGetServiceBySlug(slug);
  if (!s) return undefined;
  const md = await fileGetServiceMarkdown(slug);
  const body = md ? await mdToPortableTextBlocks(md) : null;
  return {
    ...s,
    body,
    queEsPreview:
      extractQueEsFromPortableText(body) ??
      (md ? await fileGetServiceQueEs(slug) : null),
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
  const local = fileGetAllServices().map((s) => ({
    slug: s.slug_es,
    lista: s.lista,
  }));
  if (!isSanityConfigured()) return local;
  const rows = await fetchFromSanity<
    Array<{ slug: string; lista: string }> | null
  >({
    query: SERVICE_SLUGS_QUERY,
    tags: ["service"],
    perspective: "published",
    stega: false,
  });
  if (!rows || rows.length === 0) return local;
  const remoteSlugs = new Set(rows.map((r) => r.slug));
  const missing = local.filter((l) => !remoteSlugs.has(l.slug));
  return [...rows, ...missing];
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
  const all = fileGetAllServices();
  const localEntries = await Promise.all(
    all.map(async (s) => [s.slug_es, await fileGetServiceQueEs(s.slug_es)] as const),
  );
  const map = new Map<string, string | null>(localEntries);
  if (!isSanityConfigured()) {
    return map;
  }
  const rows = await fetchFromSanity<
    Array<{ slug_es: string; body: SanityServiceDoc["body"] }> | null
  >({
    query: SERVICE_BODIES_QUERY,
    tags: ["service"],
    perspective: await resolveContentPerspective(),
  });
  if (rows) {
    for (const r of rows) {
      const ptPreview = extractQueEsFromPortableText(r.body);
      if (ptPreview) {
        map.set(r.slug_es, ptPreview);
      }
    }
  }
  return map;
}
