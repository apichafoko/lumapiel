import { getSiteConfig } from "@/lib/site-config";
import { LINKS_BOOKING_URL } from "@/lib/constants";

export function buildWhatsAppHref(preset?: string | null): string {
  const { whatsappE164 } = getSiteConfig();
  if (!whatsappE164) return "#";
  const base = `https://wa.me/${whatsappE164}`;
  if (!preset?.trim()) return base;
  return `${base}?text=${encodeURIComponent(preset)}`;
}

/** Preset en español desde site config; sin precarga si `noPreset`. */
export function whatsappHrefForLocale(locale: "es" | "en"): string {
  const cfg = getSiteConfig();
  if (locale === "en") {
    return buildWhatsAppHref(null);
  }
  return buildWhatsAppHref(cfg.whatsappPresetEs);
}

export function telHref(): string {
  const { phoneE164 } = getSiteConfig();
  const digits = phoneE164.replace(/\D/g, "");
  return digits ? `tel:+${digits.replace(/^\+/, "")}` : "#";
}

export function mailHref(): string {
  return `mailto:${getSiteConfig().email}`;
}

export function bookingHref(): string {
  return getSiteConfig().webBookingUrl || LINKS_BOOKING_URL;
}
