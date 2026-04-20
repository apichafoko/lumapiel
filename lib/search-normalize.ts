/** Normaliza para búsqueda (sin tildes, minúsculas). */
export function normalizeSearch(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function matchesQuery(
  service: {
    titulo: string;
    aliases: string;
    slug_es: string;
    categorias: string;
  },
  q: string,
): boolean {
  if (!q.trim()) return true;
  const n = normalizeSearch(q);
  const haystack = normalizeSearch(
    `${service.titulo} ${service.aliases} ${service.slug_es} ${service.categorias}`,
  );
  return haystack.includes(n);
}
