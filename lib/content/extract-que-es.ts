/**
 * Extrae el texto plano del primer apartado "### 1. ¿Qué es ..." en fichas markdown de servicios.
 */
export function extractQueEsPlainText(markdown: string): string | null {
  const lines = markdown.split(/\r?\n/);
  let bodyStart = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^###\s*1\.\s*¿Qué es\b/i.test(line)) {
      bodyStart = i + 1;
      break;
    }
  }
  if (bodyStart < 0) return null;

  const bodyLines: string[] = [];
  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{1,3}\s+\d/.test(line.trim())) break;
    bodyLines.push(line);
  }

  let text = bodyLines
    .join("\n")
    .trim()
    .replace(/\n{2,}/g, "\n")
    .replace(/\n/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "");

  text = text.replace(/\|/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 0 ? text : null;
}
