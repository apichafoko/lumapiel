import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { MarkdownBody } from "@/components/markdown-body";
import { readMarkdownFileUnder } from "@/lib/read-markdown";

type Props = { params: Promise<{ slug: string }> };

function listLegalSlugs(): string[] {
  try {
    const dir = join(process.cwd(), "content/legal/es");
    return readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  return listLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = readMarkdownFileUnder(["content", "legal", "es"], `${slug}.md`);
  if (!raw) return {};
  const titleLine = raw.split("\n").find((l) => l.startsWith("# "));
  const title = titleLine?.replace(/^#\s+/, "").trim() ?? slug;
  return {
    title,
    description: `Información legal — ${title}.`,
    alternates: { canonical: `/legal/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const raw = readMarkdownFileUnder(["content", "legal", "es"], `${slug}.md`);
  if (!raw) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <nav className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Legal</span>
      </nav>
      <MarkdownBody content={raw} className="mt-10" />
    </article>
  );
}
