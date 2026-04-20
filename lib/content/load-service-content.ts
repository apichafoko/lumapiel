import fs from "fs";
import path from "path";

export async function getServiceContent(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "services",
      `${slug}.md`,
    );
    const content = await fs.promises.readFile(filePath, "utf-8");
    return content;
  } catch (err) {
    return null;
  }
}
