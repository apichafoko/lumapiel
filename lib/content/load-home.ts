import { HOME_PAGE_QUERY } from "@/lib/sanity/queries";
import { fetchFromSanity, isSanityConfigured } from "@/lib/sanity/fetch";
import { resolveContentPerspective } from "@/lib/sanity/perspective";
import { fileGetHomePage } from "@/lib/content/file/load-home";
import type { HomePageContent } from "@/lib/sanity/types";

export async function getHomePage(): Promise<HomePageContent> {
  if (!isSanityConfigured()) return fileGetHomePage();
  const data = await fetchFromSanity<HomePageContent | null>({
    query: HOME_PAGE_QUERY,
    tags: ["home"],
    perspective: await resolveContentPerspective(),
  });
  if (!data) {
    throw new Error(
      "No hay documento homePage en Sanity. Ejecutá npm run migrate:content.",
    );
  }
  return data;
}
