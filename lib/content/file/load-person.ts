import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { SanityPersonDoc, TeamRole } from "@/lib/sanity/types";
import { mdToPortableTextBlocks } from "@/lib/content/file/md-to-blocks";

const PEOPLE: SanityPersonDoc[] = [
  {
    slug: "agustina-gandolfo",
    role: "doctora",
    displayName: "Dra. Agustina Gandolfo",
    jobTitle: "Médica dermatóloga",
    seoDescription:
      "Dra. Agustina Gandolfo, dermatóloga en Luma Piel (Palermo, CABA): medicina de precisión, psiconeuroinmunología clínica y tecnología Alma Lasers con criterio médico.",
    body: null,
  },
  {
    slug: "francisco-colazo",
    role: "cirujano-plastico",
    displayName: "Dr. Francisco Colazo",
    jobTitle: "Cirujano plástico",
    seoDescription:
      "Dr. Francisco Colazo, cirujano plástico en Luma Piel (Palermo, CABA): cirugía estética facial con resultados naturales, evaluación personalizada y criterio quirúrgico.",
    body: null,
  },
  {
    slug: "yanina-benavidez",
    role: "cosmetologa",
    displayName: "Yanina Benavidez",
    jobTitle: "Cosmetóloga",
    seoDescription:
      "Cosmetóloga en Luma Piel (Palermo, CABA): tratamientos cosmiátricos personalizados junto a la Dra. Gandolfo, seguimiento cercano y educación en el cuidado diario.",
    body: null,
  },
];

async function loadBody(slug: string): Promise<SanityPersonDoc["body"]> {
  const path = join(process.cwd(), "content", "people", `${slug}.md`);
  if (!existsSync(path)) return null;
  const md = readFileSync(path, "utf8");
  return mdToPortableTextBlocks(md);
}

export async function fileGetPersonBySlug(
  slug: string,
  role: TeamRole,
): Promise<SanityPersonDoc | undefined> {
  const base = PEOPLE.find((p) => p.slug === slug && p.role === role);
  if (!base) return undefined;
  return { ...base, body: await loadBody(slug) };
}

export function fileGetPersonSlugs(): Array<{ slug: string; role: string }> {
  return PEOPLE.map((p) => ({ slug: p.slug, role: p.role }));
}
