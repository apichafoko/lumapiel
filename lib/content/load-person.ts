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
  if (!isSanityConfigured()) return fileGetPersonBySlug(slug, role);
  const doc = await fetchFromSanity<SanityPersonDoc | null>({
    query: PERSON_BY_SLUG_QUERY,
    params: { slug, role },
    tags: ["person", `person:${role}:${slug}`],
  });
  return doc ?? undefined;
}

export async function getPersonSlugs(): Promise<
  Array<{ slug: string; role: string }>
> {
  if (!isSanityConfigured()) return fileGetPersonSlugs();
  const rows = await fetchFromSanity<
    Array<{ slug: string; role: string }> | null
  >({
    query: PERSON_SLUGS_QUERY,
    tags: ["person"],
    perspective: "published",
    stega: false,
  });
  return rows ?? [];
}
