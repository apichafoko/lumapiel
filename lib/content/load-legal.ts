import { LEGAL_BY_SLUG_QUERY, LEGAL_SLUGS_QUERY } from "@/lib/sanity/queries";
import { fetchFromSanity, isSanityConfigured } from "@/lib/sanity/fetch";
import {
  fileGetLegalBySlug,
  fileGetLegalSlugs,
} from "@/lib/content/file/load-legal";
import type { SanityLegalDoc } from "@/lib/sanity/types";

export async function getLegalBySlug(
  slug: string,
): Promise<SanityLegalDoc | undefined> {
  if (!isSanityConfigured()) return fileGetLegalBySlug(slug);
  const doc = await fetchFromSanity<SanityLegalDoc | null>({
    query: LEGAL_BY_SLUG_QUERY,
    params: { slug },
    tags: ["legal", `legal:${slug}`],
  });
  return doc ?? undefined;
}

export async function getLegalSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return fileGetLegalSlugs();
  const rows = await fetchFromSanity<Array<{ slug: string }> | null>({
    query: LEGAL_SLUGS_QUERY,
    tags: ["legal"],
    perspective: "published",
    stega: false,
  });
  return (rows ?? []).map((r) => r.slug);
}
