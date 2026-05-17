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
    .filter((s) => s.lista === "tratamientos")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s || s.lista !== "tratamientos") return {};
  const description =
    s.aliases.split("|")[0]?.trim() ||
    `${s.titulo} en Luma Piel — dermatología y estética clínica.`;
  return {
    title: s.titulo,
    description,
    alternates: { canonical: `/tratamientos/${s.slug_es}` },
    robots: s.published ? undefined : { index: false, follow: true },
  };
}

export default async function TratamientoFichaPage({ params }: Props) {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s || s.lista !== "tratamientos") notFound();

  return (
    <ServiceDetail
      service={s}
      listPath="/tratamientos"
      listLabel="Tratamientos"
      body={s.body}
    />
  );
}
