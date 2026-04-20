import type { Metadata } from "next";
import { Suspense } from "react";
import { listConsultas, listTratamientos } from "@/lib/content/load-services";
import { BuscarClient } from "@/components/buscar-client";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Buscá tratamientos o consultas en Luma Piel.",
  alternates: { canonical: "/buscar" },
};

export default function BuscarPage() {
  const tratamientos = listTratamientos();
  const consultas = listConsultas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Buscar
        </h1>
        <p className="mt-4 text-muted-foreground">
          Resultados en vivo en tratamientos o consultas. Podés cambiar de
          pestaña sin perder tu búsqueda.
        </p>
      </header>

      <div className="mt-12">
        <Suspense
          fallback={
            <p className="text-center text-muted-foreground">Cargando…</p>
          }
        >
          <BuscarClient tratamientos={tratamientos} consultas={consultas} />
        </Suspense>
      </div>
    </div>
  );
}
