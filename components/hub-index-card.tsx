import Link from "next/link";
import { CatalogVerMasLink } from "@/components/catalog-ver-mas-link";
import hubCardStyles from "@/components/hub-index-card.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getLinkedServicesForHub,
  getLinkedServicesForHubSection,
} from "@/lib/content/hub-services";
import { cn } from "@/lib/utils";

const MAX_LINKS = 6;

export type HubIndexCardProps = {
  marketingTitle: string;
  marketingDescription: string;
  /** Destino del título y del pie (puede incluir `#ancla`). */
  detailHref: string;
  /** Id de hub en `hub_refs` (p. ej. `estetica-medica`). */
  hubId: string;
  /** Si se indica, solo servicios con `hub:hubId:sectionAnchor`. */
  sectionAnchor?: string;
  /** Texto del enlace inferior (por defecto según hub vs sección). */
  detailLinkLabel?: string;
};

export function HubIndexCard({
  marketingTitle,
  marketingDescription,
  detailHref,
  hubId,
  sectionAnchor,
  detailLinkLabel,
}: HubIndexCardProps) {
  const { tratamientos, consultas } = sectionAnchor
    ? getLinkedServicesForHubSection(hubId, sectionAnchor)
    : getLinkedServicesForHub(hubId);

  const footerLabel =
    detailLinkLabel ??
    (sectionAnchor
      ? "Ver sección completa"
      : "Ver especialidad completa");

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="font-heading text-xl">
          <Link
            href={detailHref}
            className="text-primary transition-colors hover:underline"
          >
            {marketingTitle}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-4">
          {marketingDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 border-t border-border/60 pt-2">
        {consultas.length > 0 ? (
          <div>
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-wide",
                hubCardStyles.sectionHeadingOrange,
              )}
            >
              Consultas
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {consultas.slice(0, MAX_LINKS).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/consultas/${s.slug_es}`}
                    className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    {s.titulo}
                  </Link>
                </li>
              ))}
            </ul>
            {consultas.length > MAX_LINKS ? (
              <p className="mt-2 text-xs text-muted-foreground">
                +{consultas.length - MAX_LINKS} más en la especialidad
              </p>
            ) : null}
          </div>
        ) : null}

        {tratamientos.length > 0 ? (
          <div>
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-wide",
                hubCardStyles.sectionHeadingOrange,
              )}
            >
              Tratamientos
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {tratamientos.slice(0, MAX_LINKS).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/tratamientos/${s.slug_es}`}
                    className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    {s.titulo}
                  </Link>
                </li>
              ))}
            </ul>
            {tratamientos.length > MAX_LINKS ? (
              <p className="mt-2 text-xs text-muted-foreground">
                +{tratamientos.length - MAX_LINKS} más en la especialidad
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto border-t border-border/40 pt-4">
          <CatalogVerMasLink href={detailHref}>{footerLabel}</CatalogVerMasLink>
        </div>
      </CardContent>
    </Card>
  );
}
