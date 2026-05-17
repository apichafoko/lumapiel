import { markdownToPortableText } from "@portabletext/markdown";

/**
 * Convierte markdown a Portable Text, extrayendo tablas GFM a bloques `table`.
 */
export async function mdToPortableText(markdown) {
  if (!markdown?.trim()) return [];

  const tableRegex = /^\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)+/gm;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tableRegex.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "md", content: markdown.slice(lastIndex, match.index) });
    }
    parts.push({ type: "table", content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < markdown.length) {
    parts.push({ type: "md", content: markdown.slice(lastIndex) });
  }
  if (!parts.length) {
    parts.push({ type: "md", content: markdown });
  }

  const blocks = [];
  for (const part of parts) {
    if (part.type === "table") {
      blocks.push(parseMarkdownTable(part.content));
    } else {
      const pt = await markdownToPortableText(part.content.trim());
      if (Array.isArray(pt)) blocks.push(...pt);
    }
  }
  return blocks;
}

function parseMarkdownTable(raw) {
  const lines = raw
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const dataLines = lines.filter((l) => !/^\|[-:\s|]+\|$/.test(l));
  const rows = dataLines.map((line, index) => {
    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim().replace(/\*\*([^*]+)\*\*/g, "$1"));
    return {
      _type: "tableRow",
      _key: `row-${index}`,
      cells,
    };
  });
  return {
    _type: "table",
    _key: `table-${Math.random().toString(36).slice(2, 9)}`,
    rows,
  };
}
