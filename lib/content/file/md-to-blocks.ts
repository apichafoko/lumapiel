import { markdownToPortableText } from "@portabletext/markdown";
import type { PortableTextBlock } from "@portabletext/types";

const TABLE_RE = /^\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)+/gm;

/**
 * Extrae una tabla GFM a un bloque `table` (mismo formato que produce
 * scripts/lib/md-to-portable-text.mjs al migrar a Sanity, y que espera
 * components/portable-text-body.tsx).
 */
function parseMarkdownTable(raw: string, index: number): PortableTextBlock {
  const rows = raw
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^\|[-:\s|]+\|$/.test(l))
    .map((line, i) => ({
      _type: "tableRow",
      _key: `row-${i}`,
      cells: line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim().replace(/\*\*([^*]+)\*\*/g, "$1")),
    }));
  return {
    _type: "table",
    _key: `table-${index}`,
    rows,
  } as unknown as PortableTextBlock;
}

/** Convierte markdown a PT en runtime (solo fallback sin Sanity). */
export async function mdToPortableTextBlocks(
  markdown: string,
): Promise<PortableTextBlock[]> {
  if (!markdown?.trim()) return [];

  const parts: Array<{ type: "md" | "table"; content: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TABLE_RE.lastIndex = 0;
  while ((match = TABLE_RE.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "md", content: markdown.slice(lastIndex, match.index) });
    }
    parts.push({ type: "table", content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < markdown.length) {
    parts.push({ type: "md", content: markdown.slice(lastIndex) });
  }

  const blocks: PortableTextBlock[] = [];
  for (const [i, part] of parts.entries()) {
    if (part.type === "table") {
      blocks.push(parseMarkdownTable(part.content, i));
      continue;
    }
    const pt = await markdownToPortableText(part.content.trim());
    if (Array.isArray(pt)) blocks.push(...(pt as PortableTextBlock[]));
  }
  return blocks;
}
