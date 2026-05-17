"use client";

import { Stack, Text, TextArea } from "@sanity/ui";
import { useFormValue } from "sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { extractQueEsFromPortableText } from "@/lib/content/extract-que-es-pt";

/** Vista de solo lectura: refleja la sección «1. ¿Qué es…» de Ficha completa. */
export function QueEsCatalogPreview() {
  const body = useFormValue(["body"]) as PortableTextBlock[] | undefined;
  const excerpt = extractQueEsFromPortableText(body) ?? "";

  return (
    <Stack space={3}>
      <Text size={1} muted>
        Este texto se muestra en las tarjetas del listado de tratamientos/consultas.
        Para cambiarlo, editá la sección <strong>«1. ¿Qué es…»</strong> en{" "}
        <strong>Ficha completa</strong> (arriba).
      </Text>
      <TextArea value={excerpt} readOnly rows={4} />
      {!excerpt ? (
        <Text size={1} style={{ color: "var(--card-badge-caution-fg-color)" }}>
          Aún no hay sección «1. ¿Qué es…» en la ficha. Usá un encabezado que
          empiece con «1. ¿Qué es».
        </Text>
      ) : null}
    </Stack>
  );
}
