import type { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children?: ReactNode;
  /** Clases en el contenedor (p. ej. `min-w-[200px]` en el hero). */
  wrapClassName?: string;
};

/**
 * CTA naranja de catálogo: mismas clases que `<Button variant="catalog" />` aplicadas en el `<Link>` con `cn()` / tailwind-merge.
 * No usamos `asChild` + Slot: Radix concatena `className` sin merge y Next `Link` puede dejar utilidades conflictivas sin resolver.
 */
export function CatalogVerMasLink({
  href,
  children = "Ver más",
  wrapClassName,
}: Props) {
  return (
    <div
      className={cn("w-full sm:inline-block sm:w-auto", wrapClassName)}
    >
      <Link
        href={href}
        data-slot="button"
        data-variant="catalog"
        data-size="lg"
        className={cn(
          buttonVariants({ variant: "catalog", size: "lg" }),
          "w-full sm:w-auto",
        )}
      >
        {children}
      </Link>
    </div>
  );
}
