/** Normaliza handle o URL parcial a URL absoluta de perfil de Instagram. */
export function instagramProfileUrl(input: string): string {
  const t = input.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  const handle = t
    .replace(/^@/, "")
    .replace(/^instagram\.com\/?/i, "")
    .split("/")[0];
  if (!handle) return "";
  return `https://www.instagram.com/${handle}/`;
}

/** Etiqueta corta para UI (ej. `@usuario`). */
export function instagramDisplayHandle(input: string): string {
  const url = instagramProfileUrl(input);
  if (!url) return "";
  try {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
    const first = path.split("/")[0];
    return first ? `@${first}` : "Instagram";
  } catch {
    return "Instagram";
  }
}
