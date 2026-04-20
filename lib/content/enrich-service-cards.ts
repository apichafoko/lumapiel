import { extractQueEsPlainText } from "@/lib/content/extract-que-es";
import { getServiceContent } from "@/lib/content/load-service-content";
import type { ServiceRecord } from "@/lib/content/schema";

export type ServiceRecordWithQueEs = ServiceRecord & {
  /** Texto del apartado ¿Qué es? (markdown → plano); null si no hay sección o archivo. */
  queEsPreview: string | null;
};

export async function withQueEsPreviews(
  items: ServiceRecord[],
): Promise<ServiceRecordWithQueEs[]> {
  return Promise.all(
    items.map(async (s) => {
      const md = await getServiceContent(s.slug_es);
      const queEsPreview = md ? extractQueEsPlainText(md) : null;
      return { ...s, queEsPreview };
    }),
  );
}
