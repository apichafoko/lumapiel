import {
  ALL_HUBS_QUERY,
  HUB_BY_SLUG_QUERY,
  HUB_SLUGS_QUERY,
} from "@/lib/sanity/queries";
import { fetchFromSanity, isSanityConfigured } from "@/lib/sanity/fetch";
import { resolveContentPerspective } from "@/lib/sanity/perspective";
import {
  fileGetAllHubs,
  fileGetHubBySlug,
  fileGetHubIds,
} from "@/lib/content/file/load-hubs";
import type { SanityHubDoc } from "@/lib/sanity/types";
import type { HubRecord } from "@/lib/content/schema";

export type { SanityHubDoc };

export async function getAllHubs(): Promise<SanityHubDoc[]> {
  const local = await fileGetAllHubs();
  if (!isSanityConfigured()) return local;
  const hubs = await fetchFromSanity<SanityHubDoc[]>({
    query: ALL_HUBS_QUERY,
    tags: ["hub"],
    perspective: await resolveContentPerspective(),
  });
  if (!hubs || hubs.length === 0) return local;
  if (local.length > hubs.length) {
    const remoteIds = new Set(hubs.map((h) => h.id));
    const missing = local.filter((h) => !remoteIds.has(h.id));
    return [...hubs, ...missing];
  }
  return hubs;
}

export async function getHubBySlug(
  slug: string,
): Promise<SanityHubDoc | undefined> {
  if (isSanityConfigured()) {
    const hub = await fetchFromSanity<SanityHubDoc | null>({
      query: HUB_BY_SLUG_QUERY,
      params: { slug },
      tags: ["hub", `hub:${slug}`],
      perspective: await resolveContentPerspective(),
    });
    if (hub) return hub;
  }
  return fileGetHubBySlug(slug);
}

export async function getHubSlugs(): Promise<string[]> {
  const local = await fileGetHubIds();
  if (!isSanityConfigured()) return local;
  const rows = await fetchFromSanity<Array<{ slug: string }> | null>({
    query: HUB_SLUGS_QUERY,
    tags: ["hub"],
    perspective: "published",
    stega: false,
  });
  if (!rows || rows.length === 0) return local;
  const remoteSlugs = new Set(rows.map((r) => r.slug));
  const missing = local.filter((id) => !remoteSlugs.has(id));
  return [...rows.map((r) => r.slug), ...missing];
}

export async function getHubAnchorSet(hubId: string): Promise<Set<string>> {
  const hub = await getHubBySlug(hubId);
  if (!hub) return new Set();
  return new Set(hub.sections.map((s) => s.anchor));
}

export function hubId(hub: SanityHubDoc | HubRecord): string {
  return hub.id;
}
