/**
 * Variables de entorno (públicas, prefijo NEXT_PUBLIC_):
 *
 * - NEXT_PUBLIC_LINKS_BRAND_NAME
 * - NEXT_PUBLIC_LINKS_TAGLINE (opcional; si falta, no se muestra bajo el logo)
 * - NEXT_PUBLIC_LINKS_LOGO_URL        (URL absoluta o ruta, ej. /logos/logo-completo-azul.svg)
 * - NEXT_PUBLIC_LINKS_WHATSAPP_NUMBER (solo dígitos o formato libre; se normaliza)
 * - NEXT_PUBLIC_LINKS_WHATSAPP_MESSAGE (texto opcional precargado en WhatsApp)
 * - NEXT_PUBLIC_LINKS_WEB_BOOKING_URL
 * - NEXT_PUBLIC_LINKS_MAPS_URL
 * - NEXT_PUBLIC_LINKS_INSTAGRAM_URL
 * - NEXT_PUBLIC_LINKS_SHARE_URL       (URL canónica para compartir; si falta, se infiere del host)
 * - NEXT_PUBLIC_LINKS_MORE_URL        (opcional, botón superior izquierdo)
 * - NEXT_PUBLIC_LINKS_LABEL_WHATSAPP  (opcional, texto del botón)
 * - NEXT_PUBLIC_LINKS_LABEL_WEB
 * - NEXT_PUBLIC_LINKS_LABEL_MAPS
 * - NEXT_PUBLIC_LINKS_SHARE_PREVIEW_HANDLE (opcional; subtítulo estilo Linktree: asterisco + barra + handle, ej. lumapiel)
 * - NEXT_PUBLIC_LINKS_FOOTER_ADDRESS (opcional; default Arenales 3819 2° "A", Palermo, CABA.)
 *
 * Subdominio (solo servidor):
 * - LINKS_HOSTNAME  (ej. links.tudominio.com) — en proxy se reescribe / → /links
 */

import { headers } from "next/headers";

const DEFAULT_LINKS_FOOTER_ADDRESS = 'Arenales 3819 2° "A", Palermo, CABA.';

export type LinksConfig = {
  brandName: string;
  tagline: string | null;
  logoUrl: string | null;
  whatsappNumber: string | null;
  whatsappPresetMessage: string | null;
  webBookingUrl: string | null;
  mapsUrl: string | null;
  instagramUrl: string | null;
  shareUrl: string | null;
  moreUrl: string | null;
  labelWhatsapp: string | null;
  labelWeb: string | null;
  labelMaps: string | null;
  sharePreviewHandle: string | null;
  footerAddress: string;
};

function readEnv(key: string): string | null {
  const v = process.env[key];
  if (!v?.trim()) return null;
  return v.trim();
}

export function getLinksConfig(): LinksConfig {
  return {
    brandName: readEnv("NEXT_PUBLIC_LINKS_BRAND_NAME") ?? "Luma Piel",
    tagline: readEnv("NEXT_PUBLIC_LINKS_TAGLINE"),
    logoUrl: readEnv("NEXT_PUBLIC_LINKS_LOGO_URL"),
    whatsappNumber: readEnv("NEXT_PUBLIC_LINKS_WHATSAPP_NUMBER"),
    whatsappPresetMessage: readEnv("NEXT_PUBLIC_LINKS_WHATSAPP_MESSAGE"),
    webBookingUrl: readEnv("NEXT_PUBLIC_LINKS_WEB_BOOKING_URL"),
    mapsUrl: readEnv("NEXT_PUBLIC_LINKS_MAPS_URL"),
    instagramUrl: readEnv("NEXT_PUBLIC_LINKS_INSTAGRAM_URL"),
    shareUrl: readEnv("NEXT_PUBLIC_LINKS_SHARE_URL"),
    moreUrl: readEnv("NEXT_PUBLIC_LINKS_MORE_URL"),
    labelWhatsapp: readEnv("NEXT_PUBLIC_LINKS_LABEL_WHATSAPP"),
    labelWeb: readEnv("NEXT_PUBLIC_LINKS_LABEL_WEB"),
    labelMaps: readEnv("NEXT_PUBLIC_LINKS_LABEL_MAPS"),
    sharePreviewHandle: readEnv("NEXT_PUBLIC_LINKS_SHARE_PREVIEW_HANDLE"),
    footerAddress:
      readEnv("NEXT_PUBLIC_LINKS_FOOTER_ADDRESS") ??
      DEFAULT_LINKS_FOOTER_ADDRESS,
  };
}

/** Subtítulo bajo el nombre en el modal de compartir (estilo Linktree). */
export function buildSharePreviewSubtitle(
  shareUrl: string,
  handle: string | null,
): string {
  if (handle?.trim()) {
    const h = handle
      .trim()
      .replace(/^\/+/, "")
      .replace(/^\*+\/*/, "");
    return `*/${h}`;
  }
  try {
    const u = new URL(shareUrl);
    const path = u.pathname === "/" || u.pathname === "" ? "" : u.pathname;
    return `${u.host}${path}`;
  } catch {
    return shareUrl;
  }
}

export function buildWhatsAppHref(
  number: string,
  preset?: string | null,
): string {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "#";
  const base = `https://wa.me/${digits}`;
  if (!preset) return base;
  return `${base}?text=${encodeURIComponent(preset)}`;
}

export async function resolveShareUrl(): Promise<string | null> {
  const cfg = getLinksConfig();
  if (cfg.shareUrl) return cfg.shareUrl;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return null;
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`.replace(/\/$/, "");
}
