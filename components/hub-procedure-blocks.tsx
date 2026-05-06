import Link from "next/link";
import type { HubProcedureBlock } from "@/lib/content/schema";

type Props = {
  blocks: HubProcedureBlock[];
};

export function HubProcedureBlocks({ blocks }: Props) {
  return (
    <section
      aria-label="Procedimientos de esta especialidad"
      className="mt-10 rounded-2xl border border-border bg-muted/25 p-6 sm:p-8"
    >
      <h2 className="font-heading text-xl font-semibold text-primary sm:text-2xl">
        En esta especialidad
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Tratamientos por tecnología y modalidad. Cada ítem enlaza a la ficha en el catálogo.
      </p>

      <ul className="mt-6 space-y-5 text-sm text-foreground">
        {blocks.map((block, i) =>
          block.style === "nested" ? (
            <li key={`${block.title}-${i}`} className="space-y-2">
              <p className="font-semibold text-primary">
                <span aria-hidden className="mr-1 text-muted-foreground">
                  –
                </span>
                {block.title}
              </p>
              <ul className="ml-4 space-y-1.5 border-l border-border/80 pl-4">
                {block.items.map((item) => (
                  <li key={item.slug_es} className="leading-relaxed">
                    <span className="mr-2 text-muted-foreground" aria-hidden>
                      ·
                    </span>
                    <Link
                      href={`/tratamientos/${item.slug_es}`}
                      className="underline-offset-4 hover:text-primary hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={`${block.slug_es}-${i}`}>
              <span aria-hidden className="mr-1 font-semibold text-muted-foreground">
                –
              </span>
              <Link
                href={`/tratamientos/${block.slug_es}`}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {block.title}
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
