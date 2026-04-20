import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CatalogVerMasLink } from "@/components/catalog-ver-mas-link";
import type { ServiceRecordWithQueEs } from "@/lib/content/enrich-service-cards";

type Props = {
  service: ServiceRecordWithQueEs;
  basePath: "/tratamientos" | "/consultas";
};

export function ServiceCatalogCard({ service: s, basePath }: Props) {
  const slugPath = `${basePath}/${s.slug_es}`;
  const fallback =
    (s.aliases.split("|")[0] ?? "").trim() ||
    "Información detallada en la ficha.";
  const preview = s.queEsPreview ?? fallback;

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold leading-snug text-primary">
          <Link href={slugPath} className="hover:underline">
            {s.titulo}
          </Link>
        </h3>
        {!s.published ? (
          <Badge variant="outline" className="text-[10px] uppercase">
            Borrador
          </Badge>
        ) : null}
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          ¿Qué es?
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {preview}
        </p>
      </div>

      <div className="mt-5">
        <CatalogVerMasLink href={slugPath} />
      </div>
    </article>
  );
}
