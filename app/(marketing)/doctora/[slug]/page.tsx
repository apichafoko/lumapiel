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
    .filter((p) => p.role === "doctora")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPersonBySlug(slug, "doctora");
  if (!person) return {};
  return {
    title: person.displayName ?? "Dra. Agustina Gandolfo",
    description: person.seoDescription ?? "",
    alternates: { canonical: `/doctora/${slug}` },
  };
}

export default async function DoctoraPage({ params }: Props) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug, "doctora");
  if (!person) notFound();

  const path = `/doctora/${slug}`;
  const headshot = headshotSrcForTeamHref(path);
  const member = getTeamMemberByHref(path);
  const instaUrl = member?.instagramUrl?.trim()
    ? instagramProfileUrl(member.instagramUrl)
    : undefined;
  const displayName = person.displayName ?? "Agustina Gandolfo";

  return (
    <>
      <PersonJsonLd
        name={displayName}
        jobTitle={person.jobTitle ?? "Médica dermatóloga"}
        urlPath={path}
        description={person.seoDescription ?? ""}
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
