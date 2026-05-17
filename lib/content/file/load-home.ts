import homeContent from "@/content/pages/home.es.json";
import type { HomePageContent } from "@/lib/sanity/types";

export function fileGetHomePage(): HomePageContent {
  return homeContent as HomePageContent;
}
