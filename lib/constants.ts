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

/** Compra de Gift Card. */
export const GIFT_CARD_URL =
  process.env.NEXT_PUBLIC_LINKS_GIFT_CARD_URL?.trim() ||
  "https://www.lumasoftware.app/gift-cards/d432cf5e-7922-4772-b0a0-ed2e760cdd42/comprar";
