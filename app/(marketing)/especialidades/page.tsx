import type { Metadata } from "next";
import { HubIndexCard } from "@/components/hub-index-card";
import { getAllHubs } from "@/lib/content/load-hubs";
import { getSiteConfig } from "@/lib/site-config";
import { TREATMENT_AREA_DESCRIPTIONS } from "@/lib/treatment-areas";

export const metadata: Metadata = {
  title: "Especialidades",
  description:
    "Especialidades clínicas y áreas de tratamiento en Luma Piel: estética médica, tecnología láser y consultas.",
  alternates: { canonical: "/especialidades" },
};

export default function EspecialidadesIndexPage() {
  const hubs = getAllHubs();
  const site = getSiteConfig();

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
        {hubs.map((hub) => {
          const m = site.hubs.find(
            (x) => x.href === `/especialidades/${hub.id}`,
          );
          return (
            <HubIndexCard
              key={hub.id}
              hubId={hub.id}
              detailHref={`/especialidades/${hub.id}`}
              marketingTitle={m?.label ?? hub.title}
              marketingDescription={m?.description ?? hub.description}
            />
          );
        })}
        <HubIndexCard
          key="cosmiatria"
          hubId="estetica-medica"
          sectionAnchor="cosmiatria-y-acompanamiento"
          detailHref="/especialidades/estetica-medica#cosmiatria-y-acompanamiento"
          marketingTitle="Cosmiatría"
          marketingDescription={TREATMENT_AREA_DESCRIPTIONS.cosmiatria}
        />
      </div>
    </div>
  );
}
