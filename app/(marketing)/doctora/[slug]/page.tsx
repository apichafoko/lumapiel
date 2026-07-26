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
import { TeamSocialLinks } from "@/components/team-social-links";

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
  const linkedinUrl = member?.linkedinUrl?.trim() || undefined;
  const displayName = person.displayName ?? "Agustina Gandolfo";
  const sameAs = [instaUrl, linkedinUrl].filter(Boolean) as string[];

  return (
    <>
      <PersonJsonLd
        name={displayName}
        jobTitle={person.jobTitle ?? "Médica dermatóloga"}
        urlPath={path}
        description={person.seoDescription ?? ""}
        imageUrl={headshot}
        sameAs={sameAs.length ? sameAs : undefined}
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
        <TeamSocialLinks
          instagramUrl={member?.instagramUrl}
          linkedinUrl={linkedinUrl}
          className="mt-6 gap-x-6 gap-y-2"
        />
        <PortableTextBody value={person.body} className="mt-10" />
      </article>
    </>
  );
}
