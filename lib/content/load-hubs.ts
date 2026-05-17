import {
  ALL_HUBS_QUERY,
  HUB_BY_SLUG_QUERY,
  HUB_SLUGS_QUERY,
} from "@/lib/sanity/queries";
import { fetchFromSanity, isSanityConfigured } from "@/lib/sanity/fetch";
import {
  fileGetAllHubs,
  fileGetHubBySlug,
} from "@/lib/content/file/load-hubs";
import type { SanityHubDoc } from "@/lib/sanity/types";
import type { HubRecord } from "@/lib/content/schema";

export type { SanityHubDoc };

export async function getAllHubs(): Promise<SanityHubDoc[]> {
  if (!isSanityConfigured()) return fileGetAllHubs();
  const hubs = await fetchFromSanity<SanityHubDoc[]>({
    query: ALL_HUBS_QUERY,
    tags: ["hub"],
  });
  return hubs ?? [];
}

export async function getHubBySlug(
  slug: string,
): Promise<SanityHubDoc | undefined> {
  if (!isSanityConfigured()) return fileGetHubBySlug(slug);
  const hub = await fetchFromSanity<SanityHubDoc | null>({
    query: HUB_BY_SLUG_QUERY,
    params: { slug },
    tags: ["hub", `hub:${slug}`],
  });
  return hub ?? undefined;
}

export async function getHubSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return fileGetAllHubs().map((h) => h.id);
  }
  const rows = await fetchFromSanity<Array<{ slug: string }> | null>({
    query: HUB_SLUGS_QUERY,
    tags: ["hub"],
    perspective: "published",
    stega: false,
  });
  return (rows ?? []).map((r) => r.slug);
}

export async function getHubAnchorSet(hubId: string): Promise<Set<string>> {
  const hub = await getHubBySlug(hubId);
  if (!hub) return new Set();
  return new Set(hub.sections.map((s) => s.anchor));
}

export function hubId(hub: SanityHubDoc | HubRecord): string {
  return hub.id;
}
