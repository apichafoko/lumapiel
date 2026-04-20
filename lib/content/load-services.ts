import servicesEs from "@/content/services.es.json";
import servicesEn from "@/content/services.en.json";
import { serviceSchema, type ServiceRecord } from "@/lib/content/schema";

function parseServices(raw: unknown): ServiceRecord[] {
  const arr = raw as unknown[];
  return arr.map((row) => serviceSchema.parse(row));
}

const es = parseServices(servicesEs);
const enMap = new Map(parseServices(servicesEn).map((s) => [s.id, s]));

/** Merge EN overrides by id (EN file can be partial). */
export function getServicesMerged(locale: "es" | "en"): ServiceRecord[] {
  if (locale === "es") return es;
  return es.map((row) => {
    const ov = enMap.get(row.id);
    return ov ?? row;
  });
}

export function getAllServices(): ServiceRecord[] {
  return es;
}

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return es.find((s) => s.slug_es === slug);
}

export function listTratamientos(): ServiceRecord[] {
  return es.filter((s) => s.lista === "tratamientos");
}

export function listConsultas(): ServiceRecord[] {
  return es.filter((s) => s.lista === "consultas");
}
