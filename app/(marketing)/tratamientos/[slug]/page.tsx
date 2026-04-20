import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/lib/content/load-services";
import { getServiceContent } from "@/lib/content/load-service-content";
import { ServiceDetail } from "@/components/service-detail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServices()
    .filter((s) => s.lista === "tratamientos")
    .map((s) => ({ slug: s.slug_es }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
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
  const s = getServiceBySlug(slug);
  if (!s || s.lista !== "tratamientos") notFound();

  const content = await getServiceContent(slug);

  return (
    <ServiceDetail
      service={s}
      listPath="/tratamientos"
      listLabel="Tratamientos"
      content={content}
    />
  );
}
