import siteEs from "@/content/site.es.json";
import { LINKS_BOOKING_URL, MAPS_URL } from "@/lib/constants";

export type SiteNavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type SiteTeamLink = {
  label: string;
  href: string;
  role: string;
  /** Perfil público (URL completa, o `@usuario` / `usuario`). Vacío u omitido: no se muestra. */
  instagramUrl?: string;
  /** Perfil de LinkedIn (URL completa). Vacío u omitido: no se muestra. */
  linkedinUrl?: string;
};

export type SiteConfig = {
  brandName: string;
  tagline: string;
  phoneDisplay: string;
  phoneE164: string;
  email: string;
  whatsappE164: string;
  whatsappPresetEs: string | null;
  webBookingUrl: string;
  /** Enlace “Sitio potenciado por Luma Software” en el pie. */
  lumaSoftwareUrl: string;
  address: string;
  mapsUrl: string;
  nav: SiteNavItem[];
  hubs: { label: string; href: string; description: string }[];
  team: SiteTeamLink[];
  footerDisclaimer: string;
};

const raw = siteEs as SiteConfig;

export function getSiteConfig(): SiteConfig {
  return {
    ...raw,
    mapsUrl: MAPS_URL,
    webBookingUrl: process.env.NEXT_PUBLIC_WEB_BOOKING_URL ?? raw.webBookingUrl,
    lumaSoftwareUrl:
      process.env.NEXT_PUBLIC_LUMA_SOFTWARE_URL ?? raw.lumaSoftwareUrl,
    whatsappE164:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ??
      raw.whatsappE164.replace(/\D/g, ""),
  };
}

export function getBookingUrl(): string {
  return getSiteConfig().webBookingUrl || LINKS_BOOKING_URL;
}

export function getTeamMemberByHref(href: string): SiteTeamLink | undefined {
  return getSiteConfig().team.find((m) => m.href === href);
}
