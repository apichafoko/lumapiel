import type { Metadata } from "next";
import { HubIndexCard } from "@/components/hub-index-card";
import { getAllHubs } from "@/lib/content/load-hubs";
import { getSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Especialidades",
  description:
    "Especialidades clínicas y áreas de tratamiento en Luma Piel: consulta dermatológica, láser, estética médica y cosmiatría.",
  alternates: { canonical: "/especialidades" },
};

export default async function EspecialidadesIndexPage() {
  const hubs = await getAllHubs();
  const site = getSiteConfig();
  const hubsById = new Map(hubs.map((hub) => [hub.id, hub] as const));
  const orderedHubs = site.hubs
    .map((item) => ({
      item,
      hub: hubsById.get(item.href.replace("/especialidades/", "")),
    }))
    .filter((entry): entry is { item: (typeof site.hubs)[number]; hub: (typeof hubs)[number] } => Boolean(entry.hub));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Nuestras Especialidades
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Conocé en profundidad nuestras áreas de trabajo. Cada especialidad
          reúne protocolos clínicos, tecnología de vanguardia y tratamientos
          específicos para cuidar la salud y belleza de tu piel.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {orderedHubs.map(({ item, hub }) => {
          return (
            <HubIndexCard
              key={hub.id}
              hubId={hub.id}
              detailHref={`/especialidades/${hub.id}`}
              marketingTitle={item.label ?? hub.title}
              marketingDescription={item.description ?? hub.description}
            />
          );
        })}
      </div>
    </div>
  );
}
