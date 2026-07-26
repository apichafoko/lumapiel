/** Rutas públicas de retratos (`public/images/team/`). */

export const TEAM_HEADSHOTS: Record<string, string> = {
  "/doctora/agustina-gandolfo": "/images/team/agustina-gandolfo.png",
  "/cirujano-plastico/francisco-colazo": "/images/team/francisco-colazo.jpg",
  "/cosmetologa/yanina-benavidez": "/images/team/yanina-benavidez.png",
};

export function headshotSrcForTeamHref(href: string): string | undefined {
  return TEAM_HEADSHOTS[href];
}
