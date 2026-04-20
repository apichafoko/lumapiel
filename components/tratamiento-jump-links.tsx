import Link from "next/link";
import {
  TREATMENT_AREA_IDS,
  TREATMENT_AREA_LABELS,
} from "@/lib/treatment-areas";

/** Atajos de lectura cuando la lista está agrupada por área. */
export function TratamientoJumpLinks() {
  return (
    <nav
      aria-label="Ir a sección por área"
      className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
    >
      <span className="text-muted-foreground">Ir a:</span>
      {TREATMENT_AREA_IDS.map((id, i) => (
        <span key={id} className="flex items-center gap-3">
          {i > 0 ? <span className="text-border select-none">·</span> : null}
          <Link
            href={`#tratamientos-${id}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {TREATMENT_AREA_LABELS[id]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
