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
