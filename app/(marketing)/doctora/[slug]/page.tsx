import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/markdown-body";
import { TeamMemberPhoto } from "@/components/team-member-photo";
import { PersonJsonLd } from "@/lib/service-jsonld";
import { readMarkdownFileUnder } from "@/lib/read-markdown";
import { instagramProfileUrl } from "@/lib/instagram-url";
import { getTeamMemberByHref } from "@/lib/site-config";
import { headshotSrcForTeamHref } from "@/lib/team-photos";
import { TeamInstagramLink } from "@/components/team-instagram-link";

const ALLOWED = new Set(["agustina-gandolfo"]);

const PAGE_DESCRIPTION =
  "Dermatóloga en Luma Piel (Palermo, CABA): mirada integral de la piel, enfoque PNI y tecnología Alma Lasers; resultados naturales y sostenibles.";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [{ slug: "agustina-gandolfo" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!ALLOWED.has(slug)) return {};
  return {
    title: "Dra. Agustina Gandolfo",
    description: PAGE_DESCRIPTION,
    alternates: { canonical: `/doctora/${slug}` },
  };
}

export default async function DoctoraPage({ params }: Props) {
  const { slug } = await params;
  if (!ALLOWED.has(slug)) notFound();

  const raw = readMarkdownFileUnder(["content", "people"], `${slug}.md`);
  if (!raw) notFound();

  const path = `/doctora/${slug}`;
  const headshot = headshotSrcForTeamHref(path);
  const member = getTeamMemberByHref(path);
  const instaUrl = member?.instagramUrl?.trim()
    ? instagramProfileUrl(member.instagramUrl)
    : undefined;

  return (
    <>
      <PersonJsonLd
        name="Agustina Gandolfo"
        jobTitle="Médica dermatóloga"
        urlPath={path}
        description={PAGE_DESCRIPTION}
        imageUrl={headshot}
        sameAs={instaUrl ? [instaUrl] : undefined}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Equipo</span>
        </nav>
        {headshot ? (
          <div className="mt-10 flex justify-center">
            <TeamMemberPhoto
              src={headshot}
              alt="Retrato profesional — Dra. Agustina Gandolfo"
              priority
              sizeClassName="size-28 sm:size-32"
              imageSizes="(max-width: 640px) 112px, 128px"
              className="shadow-sm"
            />
          </div>
        ) : null}
        {member?.instagramUrl?.trim() ? (
          <div className="mt-6 flex justify-center">
            <TeamInstagramLink raw={member.instagramUrl} />
          </div>
        ) : null}
        <MarkdownBody content={raw} className="mt-10" />
      </article>
    </>
  );
}
