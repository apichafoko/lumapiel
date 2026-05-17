import fs from "fs";
import path from "path";
import { extractQueEsPlainText } from "@/lib/content/extract-que-es";

export async function fileGetServiceMarkdown(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "content", "services", `${slug}.md`);
    return await fs.promises.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export async function fileGetServiceQueEs(slug: string): Promise<string | null> {
  const md = await fileGetServiceMarkdown(slug);
  return md ? extractQueEsPlainText(md) : null;
}
