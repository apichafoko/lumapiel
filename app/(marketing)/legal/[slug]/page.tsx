import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableTextBody } from "@/components/portable-text-body";
import { getLegalBySlug, getLegalSlugs } from "@/lib/content/load-legal";
import { portableTextToPlainDescription } from "@/lib/sanity/portable-text-plain";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getLegalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getLegalBySlug(slug);
  if (!doc) return {};
  const description =
    portableTextToPlainDescription(doc.body) ||
    `Información legal — ${doc.title}.`;
  return {
    title: doc.title,
    description,
    alternates: { canonical: `/legal/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getLegalBySlug(slug);
  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <nav className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Legal</span>
      </nav>
      <h1 className="font-heading mt-10 text-3xl font-semibold text-primary">
        {doc.title}
      </h1>
      <PortableTextBody value={doc.body} className="mt-10" />
    </article>
  );
}
