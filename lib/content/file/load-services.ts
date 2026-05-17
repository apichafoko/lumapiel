import servicesEs from "@/content/services.es.json";
import { serviceSchema, type ServiceRecord } from "@/lib/content/schema";

function parseServices(raw: unknown): ServiceRecord[] {
  const arr = raw as unknown[];
  return arr.map((row) => serviceSchema.parse(row));
}

const es = parseServices(servicesEs);

export function fileGetAllServices(): ServiceRecord[] {
  return es;
}

export function fileGetServiceBySlug(slug: string): ServiceRecord | undefined {
  return es.find((s) => s.slug_es === slug);
}

export function fileListTratamientos(): ServiceRecord[] {
  return es.filter((s) => s.lista === "tratamientos");
}

export function fileListConsultas(): ServiceRecord[] {
  return es.filter((s) => s.lista === "consultas");
}
