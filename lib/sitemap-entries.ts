import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllHubs } from "@/lib/content/load-hubs";
import { getAllServices } from "@/lib/content/load-services";
const base = SITE_URL;

function u(
  path: string,
  lastmod?: Date,
  changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"],
  priority?: number,
) {
  return {
    url: `${base}${path.startsWith("/") ? path : `/${path}`}`,
    lastModified: lastmod ?? new Date(),
    changeFrequency: changeFrequency ?? "monthly",
    priority: priority ?? 0.7,
  };
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const publishedTreat = services.filter(
    (s) => s.lista === "tratamientos" && s.published,
  );
  const publishedCons = services.filter(
    (s) => s.lista === "consultas" && s.published,
  );

  const routes: MetadataRoute.Sitemap = [
    u("/", undefined, "weekly", 1),
    u("/tratamientos", undefined, "weekly", 0.95),
    u("/consultas", undefined, "weekly", 0.95),
    u("/buscar", undefined, "monthly", 0.7),
    u("/contacto", undefined, "monthly", 0.85),
    u("/especialidades", undefined, "weekly", 0.85),
    ...getAllHubs().map((hub) =>
      u(`/especialidades/${hub.id}`, undefined, "monthly", 0.85),
    ),
    ...publishedTreat.map((s) =>
      u(`/tratamientos/${s.slug_es}`, undefined, "monthly", 0.75),
    ),
    ...publishedCons.map((s) =>
      u(`/consultas/${s.slug_es}`, undefined, "monthly", 0.75),
    ),
    u("/doctora/agustina-gandolfo", undefined, "monthly", 0.65),
    u("/cosmetologa/yanina-benavidez", undefined, "monthly", 0.65),
  ];

  return routes;
}
