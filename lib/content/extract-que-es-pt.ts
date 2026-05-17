import type { PortableTextBlock } from "@portabletext/types";

function blockPlainText(block: PortableTextBlock): string {
  if (block._type !== "block" || !("children" in block)) return "";
  return (block.children ?? [])
    .filter((c) => c._type === "span" && "text" in c)
    .map((c) => (c as { text?: string }).text ?? "")
    .join("");
}

const QUE_ES_HEADING = /^#{0,3}\s*1\.\s*¿Qué es\b/i;
const NUMBERED_HEADING = /^#{0,3}\s*\d+\.\s/;

/**
 * Extrae el texto plano del apartado «1. ¿Qué es …» desde Portable Text (ficha completa).
 * Misma lógica que extract-que-es.ts para markdown.
 */
export function extractQueEsFromPortableText(
  blocks: PortableTextBlock[] | null | undefined,
): string | null {
  if (!blocks?.length) return null;

  let inSection = false;
  const parts: string[] = [];

  for (const block of blocks) {
    if (block._type !== "block") continue;
    const text = blockPlainText(block).trim();
    if (!text) continue;

    if (!inSection) {
      if (QUE_ES_HEADING.test(text)) {
        inSection = true;
      }
      continue;
    }

    if (NUMBERED_HEADING.test(text) && !QUE_ES_HEADING.test(text)) {
      break;
    }

    parts.push(
      text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1"),
    );
  }

  const plain = parts.join(" ").replace(/\s+/g, " ").trim();
  return plain.length > 0 ? plain : null;
}
