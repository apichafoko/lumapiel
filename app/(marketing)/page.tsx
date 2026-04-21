import Link from "next/link";
import type { Metadata } from "next";
import homeContent from "@/content/pages/home.es.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getAllServices } from "@/lib/content/load-services";
import { withQueEsPreviews } from "@/lib/content/enrich-service-cards";
import { getBookingUrl, getSiteConfig } from "@/lib/site-config";
import { whatsappHrefForLocale } from "@/lib/contact-links";
import { headshotSrcForTeamHref } from "@/lib/team-photos";
import { TeamInstagramLink } from "@/components/team-instagram-link";
import { TeamMemberPhoto } from "@/components/team-member-photo";
import { CatalogVerMasLink } from "@/components/catalog-ver-mas-link";

type HomePillar = (typeof homeContent.pillars)[number] & {
  supportLine?: {
    prefix: string;
    linkText: string;
    href: string;
  };
};

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Dermatología integral, estética médica y tratamientos láser en Palermo. Consultas y tecnología con enfoque profesional.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const site = getSiteConfig();
  const bookingUrl = getBookingUrl();
  const wa = whatsappHrefForLocale("es");
  const hero = homeContent.hero;
  const pillars = homeContent.pillars as HomePillar[];

  const ranked = [...getAllServices()].sort(
    (a, b) => b.hub_pin_rank - a.hub_pin_rank,
  );
  const featured = await withQueEsPreviews(ranked.slice(0, 6));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 font-normal">
              Palermo · CABA
            </Badge>
            <h1 className="font-heading text-balance text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              {hero.subhead}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  {hero.primaryCta}
                </a>
              </Button>
              <CatalogVerMasLink
                href="/tratamientos"
                wrapClassName="w-full sm:w-auto sm:min-w-[200px]"
              >
                {hero.secondaryCta}
              </CatalogVerMasLink>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto sm:min-w-[200px]"
              >
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Card
              key={p.href}
              className="border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  {p.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {p.body}
                  {p.supportLine ? (
                    <>
                      {" "}
                      <span className="mt-1 block sm:mt-0 sm:inline">
                        {p.supportLine.prefix}
                        <a
                          href={p.supportLine.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#d86448] underline-offset-4 hover:underline"
                        >
                          {p.supportLine.linkText}
                        </a>
                        .
                      </span>
                    </>
                  ) : null}
                </CardDescription>
                <div className="mt-4">
                  <CatalogVerMasLink href={p.href}>{p.linkLabel}</CatalogVerMasLink>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold text-primary">
              Motivos frecuentes
            </h2>
            <p className="mt-3 text-muted-foreground">
              {homeContent.featuredIntro}
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => {
              const href =
                s.lista === "tratamientos"
                  ? `/tratamientos/${s.slug_es}`
                  : `/consultas/${s.slug_es}`;
              const ctaLabel =
                s.lista === "tratamientos"
                  ? "Ver tratamiento"
                  : "Ver consulta";
              const fallback =
                (s.aliases.split("|")[0] ?? "").trim() ||
                "Información detallada en la ficha del servicio.";
              const preview = s.queEsPreview ?? fallback;
              return (
                <li key={s.id}>
                  <Card className="flex h-full flex-col border-border/80">
                    <CardHeader className="flex flex-1 flex-col gap-0 pb-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <CardTitle className="font-heading text-lg leading-snug">
                          <Link href={href} className="hover:underline">
                            {s.titulo}
                          </Link>
                        </CardTitle>
                      </div>
                      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          ¿Qué es?
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
                          {preview}
                        </p>
                      </div>
                      <div className="mt-5">
                        <CatalogVerMasLink href={href}>
                          {ctaLabel}
                        </CatalogVerMasLink>
                      </div>
                    </CardHeader>
                  </Card>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto sm:min-w-[200px]">
              <Link href="/tratamientos">Ver todos los tratamientos</Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
              <Link href="/consultas">Consultas</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="font-heading text-center text-3xl font-semibold text-primary">
          Equipo
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {site.team.map((member, index) => {
            const photo = headshotSrcForTeamHref(member.href);
            return (
              <Card key={member.href} className="border-border/80">
                {photo ? (
                  <div className="flex justify-center pt-6">
                    <TeamMemberPhoto
                      src={photo}
                      alt={`Retrato profesional — ${member.label}`}
                      priority={index === 0}
                    />
                  </div>
                ) : null}
                <CardHeader
                  className={
                    photo
                      ? "justify-items-center pt-4 text-center sm:pt-5"
                      : "justify-items-center pt-8 text-center sm:pt-9"
                  }
                >
                  <CardTitle className="font-heading text-xl">
                    {member.label}
                  </CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                  <TeamInstagramLink
                    raw={member.instagramUrl}
                    className="mt-3 justify-center"
                  />
                  <Button
                    asChild
                    size="lg"
                    className="mt-4 w-full sm:w-auto sm:min-w-[200px] self-center"
                  >
                    <Link href={member.href}>Ver perfil</Link>
                  </Button>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-heading text-center text-3xl font-semibold text-primary">
            {homeContent.faqTitle}
          </h2>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {homeContent.faq.map((item, i) => (
              <AccordionItem key={item.question} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Información general; no sustituye una consulta médica personalizada.
          </p>
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl space-y-2">
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-primary-foreground/85">
              Reservá turno web, escribinos por WhatsApp o llamanos. Te
              respondemos a la brevedad.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Reservar turno
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
