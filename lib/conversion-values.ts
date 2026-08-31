/**
 * Valor relativo de cada conversion para Google Ads.
 *
 * NO son precios. Son pesos de prioridad: le dicen a Google que un lead de
 * laser vale mas que uno de cosmiatria, para que no optimice hacia el lead
 * mas barato de conseguir. Google solo necesita la proporcion entre ellos.
 *
 * Deliberadamente no se usa el precio real de ningun servicio: este archivo
 * viaja al navegador y seria publico. Los precios se informan al agendar.
 */

type Prioridad = "alta" | "media" | "consulta" | "baja";

const PESO: Record<Prioridad, number> = {
  alta: 100,
  media: 60,
  consulta: 35,
  baja: 15,
};

/** Tratamientos de sesion larga, los de mayor retorno del catalogo. */
const RUTAS_PRIORIDAD_ALTA = [
  "laser-luma-skin-reset",
  "laser-velo-de-novia",
  "laser-q-switch-completo",
  "luz-pulsada-completa",
];

/** Cosmiatria: ticket bajo y alta frecuencia. */
const PATRONES_PRIORIDAD_BAJA = ["limpieza-", "peeling-", "luma-hydrojelly"];

function prioridadPara(path: string): Prioridad {
  if (path.startsWith("/consultas")) return "consulta";
  if (path.startsWith("/especialidades/consulta-dermatologica")) return "consulta";
  if (path.startsWith("/especialidades/cosmiatria")) return "baja";

  const slug = path.split("/").pop() ?? "";
  if (PATRONES_PRIORIDAD_BAJA.some((p) => slug.startsWith(p))) return "baja";
  if (RUTAS_PRIORIDAD_ALTA.includes(slug)) return "alta";

  return "media";
}

/**
 * Peso de la conversion segun la pagina desde la que se contacta.
 * Se envia en USD; Google lo convierte a la moneda de la cuenta.
 */
export function conversionValueUsd(pathname: string): number {
  const path = pathname.replace(/\/+$/, "") || "/";
  return PESO[prioridadPara(path)];
}
