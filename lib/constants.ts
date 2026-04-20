/** URL canónica del sitio marketing (sin barra final). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.lumapiel.com.ar";

export const LINKS_BOOKING_URL = "https://links.lumapiel.com.ar";
