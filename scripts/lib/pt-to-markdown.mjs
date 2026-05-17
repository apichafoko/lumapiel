import { portableTextToMarkdown } from "@portabletext/markdown";

/** Tablas creadas con @sanity/table (celdas como strings). */
function sanityTableToMarkdown(table) {
  const rows = table.rows ?? [];
  if (!rows.length) return "";

  const lines = rows.map((row) => {
    const cells = (row.cells ?? []).map((c) =>
      typeof c === "string" ? c.trim() : String(c ?? "").trim(),
    );
    return `| ${cells.join(" | ")} |`;
  });

  if (lines.length > 1) {
    const colCount = rows[0]?.cells?.length ?? 0;
    const sep = `| ${Array.from({ length: colCount }, () => "---").join(" | ")} |`;
    lines.splice(1, 0, sep);
  }

  return lines.join("\n");
}

/**
 * Portable Text (Sanity) → markdown, con tablas @sanity/table.
 */
export function ptToMarkdown(blocks) {
  if (!blocks?.length) return "";

  const chunks = [];
  let textBatch = [];

  function flushTextBatch() {
    if (!textBatch.length) return;
    const md = portableTextToMarkdown(textBatch).trim();
    if (md) chunks.push(md);
    textBatch = [];
  }

  for (const block of blocks) {
    if (block._type === "table") {
      flushTextBatch();
      const tableMd = sanityTableToMarkdown(block);
      if (tableMd) chunks.push(tableMd);
    } else {
      textBatch.push(block);
    }
  }
  flushTextBatch();

  return chunks.join("\n\n").trim();
}
