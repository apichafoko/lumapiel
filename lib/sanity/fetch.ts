import "server-only";

import { projectId } from "@/sanity/env";
import { sanityFetch } from "@/lib/sanity/live";

type FetchArgs = Parameters<typeof sanityFetch>[0];

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

export async function fetchFromSanity<const Q extends string>(args: FetchArgs) {
  if (!projectId) {
    throw new Error(
      "Sanity no configurado: definí NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local",
    );
  }
  const { data } = await sanityFetch(args);
  return data;
}
