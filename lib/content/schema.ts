import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string(),
  tipo: z.enum(["tratamiento", "consulta"]),
  lista: z.enum(["tratamientos", "consultas"]),
  titulo: z.string(),
  slug_es: z.string(),
  categorias: z.string(),
  aliases: z.string(),
  hub_refs: z.string(),
  related_service_ids: z.string(),
  hub_pin_rank: z.number(),
  published: z.boolean(),
  /** Duración estimada de la sesión en minutos. */
  duracion_minutos: z.number().int().nonnegative().optional(),
});

export type ServiceRecord = z.infer<typeof serviceSchema>;

export const hubSectionSchema = z.object({
  anchor: z.string(),
  title: z.string(),
  body: z.string(),
});

export const hubSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  sections: z.array(hubSectionSchema),
});

export type HubRecord = z.infer<typeof hubSchema>;
