/** Rutas públicas de retratos (`public/images/team/`). */

export const TEAM_HEADSHOTS: Record<string, string> = {
  "/doctora/agustina-gandolfo": "/images/team/agustina-gandolfo.png",
  "/cosmetologa/yanina-benavidez": "/images/team/yanina-benavidez.png",
};

export function headshotSrcForTeamHref(href: string): string | undefined {
  return TEAM_HEADSHOTS[href];
}
