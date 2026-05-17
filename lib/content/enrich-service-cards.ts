import { getServiceQueEsMap } from "@/lib/content/load-services";
import type { ServiceRecord } from "@/lib/content/schema";

export type ServiceRecordWithQueEs = ServiceRecord & {
  queEsPreview: string | null;
};

export async function withQueEsPreviews(
  items: ServiceRecord[],
): Promise<ServiceRecordWithQueEs[]> {
  const map = await getServiceQueEsMap();
  return items.map((s) => ({
    ...s,
    queEsPreview: map.get(s.slug_es) ?? null,
  }));
}
