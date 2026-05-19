import Link from "next/link";
import { matchesQuery } from "@/lib/search-normalize";
import { Button } from "@/components/ui/button";
import type { ServiceRecord } from "@/lib/content/schema";
import {
  type ServiceRecordWithQueEs,
  withQueEsPreviews,
} from "@/lib/content/enrich-service-cards";
import { ServiceCatalogCard } from "@/components/service-catalog-card";
import {
  TREATMENT_AREA_IDS,
  TREATMENT_AREA_DESCRIPTIONS,
  TREATMENT_AREA_LABELS,
  type TreatmentAreaId,
  groupTratamientosByArea,
  serviceMatchesTreatmentArea,
} from "@/lib/treatment-areas";

const PAGE_SIZE = 12;

type Props = {
  items: ServiceRecord[];
  searchParams: Record<string, string | string[] | undefined>;
};

function parseArea(
  sp: Record<string, string | string[] | undefined>,
): TreatmentAreaId | "" {
  const raw = typeof sp.area === "string" ? sp.area : "";
  if (raw && (TREATMENT_AREA_IDS as readonly string[]).includes(raw)) {
    return raw as TreatmentAreaId;
  }
  return "";
}

export async function TratamientoServiceIndex({
  items,
  searchParams: sp,
}: Props) {
  const q = typeof sp.q === "string" ? sp.q : "";
  const cat = typeof sp.cat === "string" ? sp.cat : "";
  const area = parseArea(sp);
  const pageRaw = typeof sp.page === "string" ? Number(sp.page) : 1;
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  let filtered = items;
  if (area) {
    filtered = filtered.filter((s) => serviceMatchesTreatmentArea(s, area));
  }
  if (cat) {
    filtered = filtered.filter((s) =>
      s.categorias.split("|").some((c) => c.trim() === cat),
    );
  }
  if (q.trim()) {
    filtered = filtered.filter((s) => matchesQuery(s, q));
  }

  const total = filtered.length;
  const sectionedView = !area;

  if (sectionedView) {
    const enriched = await withQueEsPreviews(filtered);
    const grouped = groupTratamientosByArea(enriched);
    const hasAny = TREATMENT_AREA_IDS.some((id) => grouped[id].length > 0);
    return (
      <div className="space-y-14">
        {TREATMENT_AREA_IDS.map((areaId) => {
          const sectionItems = grouped[areaId];
          if (sectionItems.length === 0) return null;
          return (
            <section
              key={areaId}
              id={`tratamientos-${areaId}`}
              aria-labelledby={`heading-tratamientos-${areaId}`}
              className="scroll-mt-28"
            >
              <div className="border-border mb-6 border-b pb-4">
                <h2
                  id={`heading-tratamientos-${areaId}`}
                  className="font-heading text-2xl font-semibold text-primary"
                >
                  {TREATMENT_AREA_LABELS[areaId]}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {TREATMENT_AREA_DESCRIPTIONS[areaId]}
                </p>
              </div>
              <TreatmentGrid items={sectionItems} basePath="/tratamientos" />
            </section>
          );
        })}
        {!hasAny ? (
          <p className="py-12 text-center text-muted-foreground">
            No hay resultados con estos filtros. Probá ampliar la búsqueda o
            cambiar de área.
          </p>
        ) : null}
      </div>
    );
  }

  const start = (page - 1) * PAGE_SIZE;
  const pageSlice = filtered.slice(start, start + PAGE_SIZE);
  const enrichedPage = await withQueEsPreviews(pageSlice);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function hrefForPage(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("cat", cat);
    if (area) params.set("area", area);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/tratamientos?${qs}` : "/tratamientos";
  }

  return (
    <div className="space-y-10">
      <TreatmentGrid items={enrichedPage} basePath="/tratamientos" />

      {enrichedPage.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No hay resultados con estos filtros. Probá ampliar la búsqueda.
        </p>
      ) : null}

      {pageCount > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {page <= 1 ? (
            <Button variant="outline" disabled>
              Anterior
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href={hrefForPage(page - 1)}>Anterior</Link>
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Página {page} de {pageCount}
          </span>
          {page >= pageCount ? (
            <Button variant="outline" disabled>
              Siguiente
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href={hrefForPage(page + 1)}>Siguiente</Link>
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function TreatmentGrid({
  items,
  basePath,
}: {
  items: ServiceRecordWithQueEs[];
  basePath: "/tratamientos" | "/consultas";
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <li key={s.id}>
          <ServiceCatalogCard service={s} basePath={basePath} />
        </li>
      ))}
    </ul>
  );
}
