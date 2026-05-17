import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { SanityLegalDoc } from "@/lib/sanity/types";
import { mdToPortableTextBlocks } from "@/lib/content/file/md-to-blocks";

export function fileGetLegalSlugs(): string[] {
  const dir = join(process.cwd(), "content/legal/es");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function fileGetLegalBySlug(
  slug: string,
): Promise<SanityLegalDoc | undefined> {
  const path = join(process.cwd(), "content/legal/es", `${slug}.md`);
  if (!existsSync(path)) return undefined;
  const raw = readFileSync(path, "utf8");
  const titleLine = raw.split("\n").find((l) => l.startsWith("# "));
  const title = titleLine?.replace(/^#\s+/, "").trim() ?? slug;
  const bodyMd = raw.replace(/^#\s+.+\n+/, "").trim();
  return {
    slug,
    title,
    body: await mdToPortableTextBlocks(bodyMd),
  };
}
