import type { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children?: ReactNode;
  /** Clases en el contenedor (p. ej. `min-w-[200px]` en el hero). */
  wrapClassName?: string;
  /** `lg`: hero — texto más grande; `default`: cards y listados (alto alineado con «Consultas» `size="lg"`). */
  size?: "default" | "lg";
};

/**
 * CTA naranja de catálogo: mismas clases que `<Button variant="catalog" />` aplicadas en el `<Link>` con `cn()` / tailwind-merge.
 * No usamos `asChild` + Slot: Radix concatena `className` sin merge y Next `Link` puede dejar utilidades conflictivas sin resolver.
 */
export function CatalogVerMasLink({
  href,
  children = "Ver más",
  wrapClassName,
  size = "default",
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
          size === "lg" &&
            "min-h-10 h-auto px-5 py-2 text-base leading-normal",
        )}
      >
        {children}
      </Link>
    </div>
  );
}
