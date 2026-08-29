import type { Metadata } from "next";
import Link from "next/link";
import { AddressLink } from "@/components/address-link";
import { Button } from "@/components/ui/button";
import { getBookingUrl, getSiteConfig } from "@/lib/site-config";
import { telHref, mailHref, whatsappHrefForLocale } from "@/lib/contact-links";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Teléfono, WhatsApp, correo y reserva web de Luma Piel. Arenales 3819, CABA.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  const site = getSiteConfig();
  const bookingUrl = getBookingUrl();
  const wa = whatsappHrefForLocale("es");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="font-heading text-4xl font-semibold text-primary">
        Contacto
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Elegí el canal que prefieras. Respondemos durante el horario de
        atención.
      </p>

      <ul className="mt-10 space-y-6 text-base">
        <li>
          <span className="font-medium text-foreground">Dirección:</span>{" "}
          <AddressLink
            address={site.address}
            mapsUrl={site.mapsUrl}
            className="text-muted-foreground"
          />
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Palermo, CABA · A 2 cuadras de Av. Santa Fe y Alto Palermo (Subte D: Estación Bulnes / Agüero).</span>
            {process.env.NODE_ENV !== "production" ? (
              <span className="inline-flex items-center rounded-md bg-amber-100 dark:bg-amber-950/50 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:text-amber-300 ring-1 ring-inset ring-amber-600/20">
                ✨ Nuevo: Contexto GEO Local
              </span>
            ) : null}
          </p>
        </li>
        <li>
          <span className="font-medium text-foreground">Teléfono:</span>{" "}
          <a
            href={telHref()}
            className="text-primary underline-offset-4 hover:underline"
          >
            {site.phoneDisplay}
          </a>
        </li>
        <li>
          <span className="font-medium text-foreground">Email:</span>{" "}
          <a
            href={mailHref()}
            className="text-primary underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </li>
      </ul>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Reservar por la web
          </a>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </Button>
      </div>

      <section className="mt-14 space-y-6">
        <h2 className="font-heading text-2xl font-semibold text-primary">
          Cómo llegar
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Estacionamientos */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
              <span>Estacionamientos cercanos</span>
            </div>

            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://share.google/hozwP9IxBbVXXE7PP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Armenia Parking
                </a>{" "}
                — a 150 mts.
              </li>
              <li>
                <a
                  href="https://share.google/ISz3z2y2aDXjaINxG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Santa Fe 3956
                </a>{" "}
                — a 250 mts.
              </li>
              <li>
                <a
                  href="https://share.google/PaSJYxkSuUBfs6fqt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Aparcar SA
                </a>{" "}
                — a 250 mts.
              </li>
              <li>
                <a
                  href="https://share.google/UAW9TwJateq0K7jfz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  El Garage
                </a>{" "}
                — a 290 mts.
              </li>
              <li>
                <a
                  href="https://share.google/amu7RO08rVrEQD5MZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  San Cayetano
                </a>{" "}
                — a 350 mts.
              </li>
            </ul>
          </div>

          {/* Transporte público */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M8 6v6" />
                <path d="M15 6v6" />
                <path d="M2 12h19.6" />
                <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.2 6 18.1 6H5.9C4.8 6 3.9 6.8 3.6 7.8L2.2 12.8c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3" />
                <circle cx="6" cy="18" r="2" />
                <path d="M8 18h8" />
                <circle cx="18" cy="18" r="2" />
              </svg>
              <span>Transporte público cercano</span>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <p>
                <a
                  href="https://maps.app.goo.gl/EHumJwUKxS4bMUTD7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Subte D - Estación Scalabrini Ortiz
                </a>{" "}
                <span className="text-muted-foreground">— a 100 mts.</span>
              </p>
              <p className="leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Líneas de colectivo:</span>{" "}
                12, 15, 29, 39, 64, 68, 110, 111, 145, 152, 160 y 194.
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        <Link
          href="/legal/privacidad"
          className="underline underline-offset-4 hover:text-primary"
        >
          Política de privacidad
        </Link>
      </p>
    </div>
  );
}
