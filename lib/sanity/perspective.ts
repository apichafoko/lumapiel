import "server-only";

import { draftMode } from "next/headers";
import { getReadToken } from "@/lib/sanity/token";

/**
 * Perspectiva para listados y fichas públicas.
 * Si el modo borrador está activo pero no hay token de lectura (p. ej. en Vercel Preview),
 * se usa "published" para no devolver listas vacías.
 */
export async function resolveContentPerspective(): Promise<
  "published" | "drafts"
> {
  if (!(await draftMode()).isEnabled) return "published";
  return getReadToken() ? "drafts" : "published";
}
