import { markdownToPortableText } from "@portabletext/markdown";
import type { PortableTextBlock } from "@portabletext/types";

/** Convierte markdown a PT en runtime (solo fallback sin Sanity). */
export async function mdToPortableTextBlocks(
  markdown: string,
): Promise<PortableTextBlock[]> {
  const blocks = await markdownToPortableText(markdown);
  return blocks as PortableTextBlock[];
}
