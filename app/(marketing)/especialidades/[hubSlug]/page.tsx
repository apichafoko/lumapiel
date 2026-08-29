import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHubBySlug, getHubSlugs } from "@/lib/content/load-hubs";
import { HubLinkedServices } from "@/components/hub-linked-services";
import { HubProcedureBlocks } from "@/components/hub-procedure-blocks";
import { PortableTextBody } from "@/components/portable-text-body";
import { Button } from "@/components/ui/button";
import { getBookingUrl } from "@/lib/site-config";
import { portableTextToPlainDescription } from "@/lib/sanity/portable-text-plain";
import { BreadcrumbJsonLd } from "@/lib/service-jsonld";

type Props = { params: Promise<{ hubSlug: string }> };

export async function generateStaticParams() {
  const slugs = await getHubSlugs();
  return slugs.map((hubSlug) => ({ hubSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hubSlug } = await params;
  const hub = await getHubBySlug(hubSlug);
  if (!hub) return { title: "Especialidad" };
  const description = portableTextToPlainDescription(hub.description);
  return {
    title: hub.title,
    description,
    alternates: { canonical: `/especialidades/${hubSlug}` },
  };
}

export default async function HubPage({ params }: Props) {
  const { hubSlug } = await params;
  const hub = await getHubBySlug(hubSlug);
  if (!hub) notFound();

  const bookingUrl = getBookingUrl();
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Especialidades", path: "/especialidades" },
    { name: hub.title, path: `/especialidades/${hubSlug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          <Link href="/especialidades" className="hover:text-primary">
            Especialidades
          </Link>
          <span className="mx-2">/</span>
          <span>{hub.title}</span>
        </p>
        <h1 className="font-heading mt-4 text-4xl font-semibold text-primary">
          {hub.title}
        </h1>
        <div className="prose prose-stone dark:prose-invert mt-4 max-w-none text-lg text-muted-foreground prose-p:mb-0 prose-p:leading-relaxed prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:underline">
          <PortableTextBody value={hub.description} />
        </div>
      </header>

      {hub.procedureBlocks?.length ? (
        <HubProcedureBlocks blocks={hub.procedureBlocks} />
      ) : (
        <HubLinkedServices hubId={hub.id} />
      )}

      <div className="mt-12 space-y-12">
        {hub.sections.map((section) => (
          <section
            key={section.anchor}
            id={section.anchor}
            className="scroll-mt-28"
          >
            <h2 className="font-heading text-2xl font-semibold text-primary">
              {section.title}
            </h2>
            <div className="mt-4 prose prose-stone dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-primary hover:prose-a:underline">
              <PortableTextBody value={section.body} />
            </div>
          </section>
        ))}
      </div>

      <aside className="mt-16 rounded-2xl border border-border bg-muted/40 p-8">
        <h3 className="font-heading text-xl font-semibold text-primary">
          ¿Siguiente paso?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Coordiná tu consulta o pedí más información por WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Reservar turno
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contacto">Contacto</Link>
          </Button>
        </div>
      </aside>

      <section className="mt-16 rounded-2xl border border-dashed border-border bg-card p-8">
        <h3 className="font-heading text-lg font-semibold text-primary">
          Importante
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          La información descrita en esta sección es de carácter orientativo.
          Para evaluar qué opciones se adaptan a tus necesidades y tipo de piel,
          te sugerimos solicitar una consulta de diagnóstico.
        </p>
      </section>
    </article>
    </>
  );
}
