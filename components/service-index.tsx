import Link from "next/link";
import { matchesQuery } from "@/lib/search-normalize";
import { Button } from "@/components/ui/button";
import type { ServiceRecord } from "@/lib/content/schema";
import {
  type ServiceRecordWithQueEs,
  withQueEsPreviews,
} from "@/lib/content/enrich-service-cards";
import { ServiceCatalogCard } from "@/components/service-catalog-card";

const PAGE_SIZE = 12;

type Props = {
  items: ServiceRecord[];
  basePath: "/tratamientos" | "/consultas";
  searchParams: Record<string, string | string[] | undefined>;
};

export async function ServiceIndex({
  items,
  basePath,
  searchParams,
}: Props) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const cat = typeof searchParams.cat === "string" ? searchParams.cat : "";
  const tipo = typeof searchParams.tipo === "string" ? searchParams.tipo : "";
  const pageRaw =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  let filtered = items;
  if (cat) {
    filtered = filtered.filter((s) =>
      s.categorias.split("|").some((c) => c.trim() === cat),
    );
  }
  if (tipo && basePath === "/consultas") {
    filtered = filtered.filter((s) => s.tipo === tipo);
  }
  if (q.trim()) {
    filtered = filtered.filter((s) => matchesQuery(s, q));
  }

  const total = filtered.length;
  const start = (page - 1) * PAGE_SIZE;
  const pageSlice = filtered.slice(start, start + PAGE_SIZE);
  const enrichedPage: ServiceRecordWithQueEs[] =
    await withQueEsPreviews(pageSlice);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function hrefForPage(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("cat", cat);
    if (tipo) params.set("tipo", tipo);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  return (
    <div className="space-y-10">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {enrichedPage.map((s) => (
          <li key={s.id}>
            <ServiceCatalogCard service={s} basePath={basePath} />
          </li>
        ))}
      </ul>

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
