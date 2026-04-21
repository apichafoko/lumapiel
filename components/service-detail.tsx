import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import type { ServiceRecord } from "@/lib/content/schema";
import { getBookingUrl } from "@/lib/site-config";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/lib/service-jsonld";
import { hubRefToHref } from "@/lib/hub-links";

type Props = {
  service: ServiceRecord;
  /** /tratamientos o /consultas */
  listPath: "/tratamientos" | "/consultas";
  listLabel: string;
  content?: string | null;
};

export function ServiceDetail({
  service,
  listPath,
  listLabel,
  content,
}: Props) {
  const bookingUrl = getBookingUrl();
  const description =
    service.aliases.split("|").slice(0, 2).join(". ").trim() ||
    `${service.titulo} — Luma Piel.`;

  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: listLabel, path: listPath },
    { name: service.titulo, path: `${listPath}/${service.slug_es}` },
  ];

  const hubs = service.hub_refs
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((ref) => ({
      ref,
      href: hubRefToHref(ref),
    }))
    .filter((x): x is { ref: string; href: string } => Boolean(x.href));

  return (
    <>
      <ServiceJsonLd
        name={service.titulo}
        description={description}
        urlPath={`${listPath}/${service.slug_es}`}
      />
      <BreadcrumbJsonLd items={crumbs} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <nav
          aria-label="Migas de pan"
          className="text-sm text-muted-foreground"
        >
          <Link href="/">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href={listPath}>{listLabel}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{service.titulo}</span>
        </nav>

        <header className="mt-8">
          <h1 className="font-heading text-4xl font-semibold text-primary">
            {service.titulo}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          {typeof service.duracion_minutos === "number" ? (
            <p className="mt-4 text-base text-foreground">
              <span className="font-medium text-primary">Duración estimada:</span>{" "}
              {service.duracion_minutos} minutos.
            </p>
          ) : null}
        </header>

        {content ? (
          <div className="mt-12 prose prose-stone dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-primary hover:prose-a:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : null}

        <section className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Los tratamientos y tecnologías se aplican según evaluación en
            consulta; no todos los procedimientos son aptos para todas las
            personas.
          </p>
          <p>
            Para coordinar una visita o aclarar dudas sobre indicaciones, usá
            los canales de contacto oficiales del centro.
          </p>
        </section>

        {hubs.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-primary">
              Área de especialidad
            </h2>
            <ul className="mt-4 space-y-2">
              {hubs.map(({ ref, href }) => (
                <li key={ref}>
                  <Link
                    href={href}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Conocé más sobre esta especialidad
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-14 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Reservar turno
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contacto">Contacto</Link>
          </Button>
        </div>
      </article>
    </>
  );
}
