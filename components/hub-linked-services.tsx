import Link from "next/link";
import { getLinkedServicesForHub } from "@/lib/content/hub-services";

type Props = {
  hubId: string;
};

export function HubLinkedServices({ hubId }: Props) {
  const { tratamientos, consultas } = getLinkedServicesForHub(hubId);

  if (tratamientos.length === 0 && consultas.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Servicios relacionados"
      className="mt-10 rounded-2xl border border-border bg-muted/25 p-6 sm:p-8"
    >
      <h2 className="font-heading text-xl font-semibold text-primary sm:text-2xl">
        En esta especialidad
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Tratamientos y modalidades de consulta vinculados a esta área clínica.
      </p>

      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        {consultas.length > 0 ? (
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Consultas
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {consultas.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/consultas/${s.slug_es}`}
                    className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    {s.titulo}
                    {!s.published ? (
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        (borrador)
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {tratamientos.length > 0 ? (
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Tratamientos
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {tratamientos.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/tratamientos/${s.slug_es}`}
                    className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    {s.titulo}
                    {!s.published ? (
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        (borrador)
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
