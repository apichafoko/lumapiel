import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableTextBody } from "@/components/portable-text-body";
import { TeamMemberPhoto } from "@/components/team-member-photo";
import { PersonJsonLd } from "@/lib/service-jsonld";
import { getPersonBySlug, getPersonSlugs } from "@/lib/content/load-person";
import { instagramProfileUrl } from "@/lib/instagram-url";
import { getTeamMemberByHref } from "@/lib/site-config";
import { headshotSrcForTeamHref } from "@/lib/team-photos";
import { TeamInstagramLink } from "@/components/team-instagram-link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const people = await getPersonSlugs();
  return people
    .filter((p) => p.role === "cosmetologa")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPersonBySlug(slug, "cosmetologa");
  if (!person) return {};
  return {
    title: person.displayName ?? "Yanina Benavidez",
    description: person.seoDescription ?? "",
    alternates: { canonical: `/cosmetologa/${slug}` },
  };
}

export default async function CosmetologaPage({ params }: Props) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug, "cosmetologa");
  if (!person) notFound();

  const path = `/cosmetologa/${slug}`;
  const headshot = headshotSrcForTeamHref(path);
  const member = getTeamMemberByHref(path);
  const instaUrl = member?.instagramUrl?.trim()
    ? instagramProfileUrl(member.instagramUrl)
    : undefined;
  const displayName = person.displayName ?? "Yanina Benavidez";

  return (
    <>
      <PersonJsonLd
        name={displayName}
        jobTitle={person.jobTitle ?? "Cosmetóloga"}
        urlPath={path}
        description={person.seoDescription ?? ""}
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
              alt={`Retrato profesional — ${displayName}`}
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
        <PortableTextBody value={person.body} className="mt-10" />
      </article>
    </>
  );
}
