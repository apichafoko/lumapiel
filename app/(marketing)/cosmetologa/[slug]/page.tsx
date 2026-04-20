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

const ALLOWED = new Set(["yanina-benavidez"]);

const PAGE_DESCRIPTION =
  "Cosmetóloga en Luma Piel (Palermo, CABA): tratamientos cosmiátricos personalizados junto a la Dra. Gandolfo, seguimiento cercano y educación en el cuidado diario.";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [{ slug: "yanina-benavidez" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!ALLOWED.has(slug)) return {};
  return {
    title: "Yanina Benavidez",
    description: PAGE_DESCRIPTION,
    alternates: { canonical: `/cosmetologa/${slug}` },
  };
}

export default async function CosmetologaPage({ params }: Props) {
  const { slug } = await params;
  if (!ALLOWED.has(slug)) notFound();

  const raw = readMarkdownFileUnder(["content", "people"], `${slug}.md`);
  if (!raw) notFound();

  const path = `/cosmetologa/${slug}`;
  const headshot = headshotSrcForTeamHref(path);
  const member = getTeamMemberByHref(path);
  const instaUrl = member?.instagramUrl?.trim()
    ? instagramProfileUrl(member.instagramUrl)
    : undefined;

  return (
    <>
      <PersonJsonLd
        name="Yanina Benavidez"
        jobTitle="Cosmetóloga"
        urlPath={path}
        description={PAGE_DESCRIPTION}
        schemaType="Person"
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
              alt="Retrato profesional — Yanina Benavidez"
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
