import type { PortableTextBlock } from "@portabletext/types";

/** Extrae texto plano de PT para meta descriptions (primeros ~160 chars). */
export function portableTextToPlainDescription(
  blocks: PortableTextBlock[] | null | undefined,
  maxLen = 160,
): string {
  if (!blocks?.length) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    if (block._type !== "block" || !("children" in block)) continue;
    for (const child of block.children ?? []) {
      if (child._type === "span" && "text" in child && child.text) {
        parts.push(child.text);
      }
    }
  }
  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1).trim()}…`;
}
