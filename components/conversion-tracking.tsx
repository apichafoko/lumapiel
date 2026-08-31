"use client";

import { useEffect } from "react";
import { GOOGLE_ADS_CONVERSIONS, type ConversionKey } from "@/lib/google-ads";
import { conversionValueUsd } from "@/lib/conversion-values";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_HOSTS = ["wa.me", "api.whatsapp.com", "web.whatsapp.com"];
const RESERVA_HOSTS = ["links.lumapiel.com.ar", "lumasoftware.app"];

/** Clasifica un href saliente como una de nuestras conversiones, o null. */
function classify(href: string): ConversionKey | null {
  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }

  if (url.protocol === "tel:") return "telefono";

  const host = url.hostname.replace(/^www\./, "");
  if (WHATSAPP_HOSTS.includes(host)) return "whatsapp";
  if (RESERVA_HOSTS.includes(host)) return "reserva";
  return null;
}

/**
 * Registra las conversiones de Google Ads que ocurren como clics salientes.
 *
 * El sitio no tiene formularios: contactar es abrir WhatsApp o el telefono,
 * y reservar es saltar a la turnera, todo fuera del dominio. Sin esto,
 * Google Ads no ve ninguna conversion.
 *
 * Escucha en el documento en vez de en cada boton, asi cualquier CTA nuevo
 * queda medido sin tocarlo.
 */
export function ConversionTracking() {
  useEffect(() => {
    const yaEnviadas = new Set<ConversionKey>();

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor?.href) return;

      const key = classify(anchor.href);
      if (!key) return;

      // Un mismo visitante que insiste con el boton sigue siendo un solo lead.
      if (yaEnviadas.has(key)) return;
      yaEnviadas.add(key);

      window.gtag?.("event", "conversion", {
        send_to: GOOGLE_ADS_CONVERSIONS[key],
        value: conversionValueUsd(window.location.pathname),
        currency: "USD",
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
