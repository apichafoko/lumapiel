import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export function readMarkdownFileUnder(
  rootSegments: string[],
  filename: string,
): string | null {
  const base = join(process.cwd(), ...rootSegments);
  const path = join(base, filename);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}
