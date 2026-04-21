"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TREATMENT_AREA_IDS,
  TREATMENT_AREA_LABELS,
} from "@/lib/treatment-areas";

type Props = {
  label: string;
  /** Si viene definido, se muestra versión acordeón (menú móvil) y se llama al elegir un enlace. */
  closeMobile?: () => void;
};

const linkClass =
  "text-sm font-medium text-foreground/90 hover:text-primary transition-colors";

export function TratamientosNavMenu({ label, closeMobile }: Props) {
  if (closeMobile !== undefined) {
    return (
      <details className="group border-b border-border/70 last:border-0">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-1 text-[1.02rem] font-medium text-foreground/90 [&::-webkit-details-marker]:hidden">
          <span>{label}</span>
          <ChevronDown
            className="size-4 shrink-0 opacity-70 transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <nav
          aria-label={`${label}: áreas`}
          className="mt-2 mb-3 flex flex-col gap-2 border-l border-border pl-4"
        >
          <Link
            href="/tratamientos"
            className={linkClass}
            onClick={() => closeMobile()}
          >
            Ver todos los tratamientos
          </Link>
          {TREATMENT_AREA_IDS.map((id) => (
            <Link
              key={id}
              href={`/tratamientos?area=${id}`}
              className={linkClass}
              onClick={() => closeMobile()}
            >
              {TREATMENT_AREA_LABELS[id]}
            </Link>
          ))}
        </nav>
      </details>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-1 outline-none ${linkClass}`}
        >
          {label}
          <ChevronDown className="size-4 opacity-70" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[17rem]">
        <DropdownMenuItem asChild>
          <Link href="/tratamientos" className="cursor-pointer">
            Ver todos los tratamientos
          </Link>
        </DropdownMenuItem>
        {TREATMENT_AREA_IDS.map((id) => (
          <DropdownMenuItem key={id} asChild>
            <Link href={`/tratamientos?area=${id}`} className="cursor-pointer">
              {TREATMENT_AREA_LABELS[id]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
