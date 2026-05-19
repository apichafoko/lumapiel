import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  TREATMENT_AREA_IDS,
  TREATMENT_AREA_LABELS,
  type TreatmentAreaId,
  extractCategoriesInItems,
  serviceMatchesTreatmentArea,
} from "@/lib/treatment-areas";
import type { ServiceRecord } from "@/lib/content/schema";

type Props = {
  items: ServiceRecord[];
  activeArea: TreatmentAreaId | "";
  activeCat: string;
  activeQ: string;
};

/** Filtros en dos niveles: área clínica + etiquetas del catálogo (mismas que antes). */
export function TratamientoFilters({
  items,
  activeArea,
  activeCat,
  activeQ,
}: Props) {
  const basePath = "/tratamientos";

  function href(overrides: {
    area?: TreatmentAreaId | "";
    cat?: string;
    q?: string;
  }) {
    const params = new URLSearchParams();
    const area = overrides.area !== undefined ? overrides.area : activeArea;
    const cat = overrides.cat !== undefined ? overrides.cat : activeCat;
    const q = overrides.q !== undefined ? overrides.q : activeQ;
    if (q.trim()) params.set("q", q.trim());
    if (area) params.set("area", area);
    if (cat) params.set("cat", cat);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const itemsForSubchips =
    activeArea === ""
      ? items
      : items.filter((s) => serviceMatchesTreatmentArea(s, activeArea));

  const subCategories = extractCategoriesInItems(itemsForSubchips);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Área
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip href={href({ area: "", cat: "" })} active={!activeArea}>
            Todas las áreas
          </FilterChip>
          {TREATMENT_AREA_IDS.map((id) => (
            <FilterChip
              key={id}
              href={href({ area: id, cat: "" })}
              active={activeArea === id}
            >
              {TREATMENT_AREA_LABELS[id]}
            </FilterChip>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Etiquetas
          {activeArea ? (
            <span className="ml-1 font-normal normal-case text-muted-foreground/80">
              (en {TREATMENT_AREA_LABELS[activeArea]})
            </span>
          ) : null}
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip href={href({ cat: "" })} active={!activeCat}>
            Todas
          </FilterChip>
          {subCategories.map((c) => (
            <FilterChip
              key={c}
              href={href({ cat: c })}
              active={activeCat === c}
            >
              {c}
            </FilterChip>
          ))}
        </div>
      </div>

      <form
        action={basePath}
        method="get"
        className="flex w-full max-w-md flex-wrap gap-2 sm:max-w-lg"
      >
        {activeArea ? (
          <input type="hidden" name="area" value={activeArea} />
        ) : null}
        {activeCat ? (
          <input type="hidden" name="cat" value={activeCat} />
        ) : null}
        <input
          name="q"
          defaultValue={activeQ}
          placeholder="Buscar por nombre o palabra clave…"
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 min-w-0 flex-1 rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none sm:min-w-[200px]"
          aria-label="Buscar tratamientos"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 shrink-0 items-center rounded-md px-4 text-sm font-medium"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

function FilterChip({
  href: hrefProp,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={hrefProp}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
