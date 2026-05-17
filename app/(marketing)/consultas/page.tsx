import type { Metadata } from "next";
import { listConsultas } from "@/lib/content/load-services";
import { IndexFilters } from "@/components/index-filters";
import { ServiceIndex } from "@/components/service-index";
import { extractCategories } from "@/lib/extract-filters";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const sp = await searchParams;
  const noisy = Boolean(sp.q || sp.cat || sp.page);
  return {
    title: "Consultas",
    description:
      "Modalidades de consulta dermatológica en Luma Piel: primera vez, seguimiento y consulta online cuando aplique.",
    alternates: { canonical: "/consultas" },
    robots: noisy ? { index: false, follow: true } : undefined,
  };
}

export default async function ConsultasPage({ searchParams }: Props) {
  const sp = await searchParams;
  const items = await listConsultas();
  const categories = extractCategories(items);

  const cat = typeof sp.cat === "string" ? sp.cat : "";
  const q = typeof sp.q === "string" ? sp.q : "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Consultas
        </h1>
        <p className="mt-4 text-muted-foreground">
          Elegí el tipo de consulta que necesitás. La indicación final se
          determina en evaluación médica.
        </p>
      </header>

      <div className="mt-10">
        <IndexFilters
          basePath="/consultas"
          categories={categories}
          activeCat={cat}
          activeQ={q}
        />
      </div>

      <div className="mt-10">
        <ServiceIndex items={items} basePath="/consultas" searchParams={sp} />
      </div>
    </div>
  );
}
