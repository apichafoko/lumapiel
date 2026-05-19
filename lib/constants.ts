/** URL canónica del sitio marketing (sin barra final). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.lumapiel.com.ar";

export const LINKS_BOOKING_URL = "https://links.lumapiel.com.ar";

/** Ubicación en Google Maps (enlace compartible). */
export const MAPS_URL =
  process.env.NEXT_PUBLIC_MAPS_URL?.trim() ||
  process.env.NEXT_PUBLIC_LINKS_MAPS_URL?.trim() ||
  "https://share.google/SuVUNPVKpSwgUEnie";
