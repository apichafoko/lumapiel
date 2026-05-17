import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getServiceSlugs,
} from "@/lib/content/load-services";
import { ServiceDetail } from "@/components/service-detail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs
    .filter((s) => s.lista === "consultas")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s || s.lista !== "consultas") return {};
  const description =
    s.aliases.split("|")[0]?.trim() ||
    `${s.titulo} — consulta dermatológica en Luma Piel.`;
  return {
    title: s.titulo,
    description,
    alternates: { canonical: `/consultas/${s.slug_es}` },
    robots: s.published ? undefined : { index: false, follow: true },
  };
}

export default async function ConsultaFichaPage({ params }: Props) {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s || s.lista !== "consultas") notFound();

  return (
    <ServiceDetail
      service={s}
      listPath="/consultas"
      listLabel="Consultas"
      body={s.body}
    />
  );
}
