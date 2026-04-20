import type { Metadata } from "next";
import { listTratamientos } from "@/lib/content/load-services";
import { TratamientoJumpLinks } from "@/components/tratamiento-jump-links";
import { TratamientoFilters } from "@/components/tratamiento-filters";
import { TratamientoServiceIndex } from "@/components/tratamiento-service-index";
import type { TreatmentAreaId } from "@/lib/treatment-areas";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const sp = await searchParams;
  const noisy = Boolean(sp.q || sp.cat || sp.page || sp.area);
  return {
    title: "Tratamientos",
    description:
      "Tratamientos dermatológicos y estéticos en Luma Piel: láser, cosmiatría, peelings, capilar y medicina estética.",
    alternates: { canonical: "/tratamientos" },
    robots: noisy ? { index: false, follow: true } : undefined,
  };
}

function parseArea(
  sp: Record<string, string | string[] | undefined>,
): TreatmentAreaId | "" {
  const raw = typeof sp.area === "string" ? sp.area : "";
  const allowed = [
    "laser",
    "cosmiatria",
    "peelings",
    "capilar",
    "dermatologicos",
  ];
  if (raw && allowed.includes(raw)) return raw as TreatmentAreaId;
  return "";
}

export default async function TratamientosPage({ searchParams }: Props) {
  const sp = await searchParams;
  const items = listTratamientos();

  const area = parseArea(sp);
  const cat = typeof sp.cat === "string" ? sp.cat : "";
  const q = typeof sp.q === "string" ? sp.q : "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Tratamientos
        </h1>
        <p className="mt-4 text-muted-foreground">
          Primero elegí el{" "}
          <strong className="font-medium text-foreground">área clínica</strong>{" "}
          (las mismas líneas que venías usando: láser, cosmiatría, peelings…).
          Después refiná por etiqueta o buscá por nombre.
        </p>
      </header>

      <div className="mt-10">
        <TratamientoFilters
          items={items}
          activeArea={area}
          activeCat={cat}
          activeQ={q}
        />
      </div>

      {!area ? (
        <div className="mt-8 rounded-lg border border-border bg-muted/30 px-4 py-3">
          <TratamientoJumpLinks />
        </div>
      ) : null}

      <div className="mt-10">
        <TratamientoServiceIndex items={items} searchParams={sp} />
      </div>
    </div>
  );
}
