import { PERSON_BY_SLUG_QUERY, PERSON_SLUGS_QUERY } from "@/lib/sanity/queries";
import { fetchFromSanity, isSanityConfigured } from "@/lib/sanity/fetch";
import {
  fileGetPersonBySlug,
  fileGetPersonSlugs,
} from "@/lib/content/file/load-person";
import type { SanityPersonDoc, TeamRole } from "@/lib/sanity/types";

export async function getPersonBySlug(
  slug: string,
  role: TeamRole,
): Promise<SanityPersonDoc | undefined> {
  if (isSanityConfigured()) {
    const doc = await fetchFromSanity<SanityPersonDoc | null>({
      query: PERSON_BY_SLUG_QUERY,
      params: { slug, role },
      tags: ["person", `person:${role}:${slug}`],
    });
    if (doc) return doc;
  }
  return fileGetPersonBySlug(slug, role);
}

export async function getPersonSlugs(): Promise<
  Array<{ slug: string; role: string }>
> {
  const local = fileGetPersonSlugs();
  if (!isSanityConfigured()) return local;
  const rows = await fetchFromSanity<
    Array<{ slug: string; role: string }> | null
  >({
    query: PERSON_SLUGS_QUERY,
    tags: ["person"],
    perspective: "published",
    stega: false,
  });
  if (!rows || rows.length === 0) return local;
  const remoteSlugs = new Set(rows.map((r) => `${r.role}:${r.slug}`));
  const missing = local.filter((l) => !remoteSlugs.has(`${l.role}:${l.slug}`));
  return [...rows, ...missing];
}
