import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";
import { getAllServices } from "@/lib/content/load-services";
import { getAllHubs } from "@/lib/content/load-hubs";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const hubs = await getAllHubs();
  const services = await getAllServices();

  const publishedTreatments = services.filter(
    (s) => s.lista === "tratamientos" && s.published,
  );
  const publishedConsultas = services.filter(
    (s) => s.lista === "consultas" && s.published,
  );

  const lines: string[] = [
    "# Luma Piel — Dermatología Integral y Tratamientos Láser",
    "",
    "> Luma Piel es un centro médico especializado en dermatología clínica, tecnología láser de vanguardia y estética médica ubicado en Palermo, Ciudad Autónoma de Buenos Aires (CABA), Argentina.",
    "",
    "## Información Institucional y Ubicación",
    `- **Sitio Web:** ${SITE_URL}`,
    "- **Dirección:** Arenales 3819 2° \"A\", Palermo, C1425 Cdad. Autónoma de Buenos Aires, Argentina",
    "- **Transporte Público Cercano:** Subte Línea D (Estación Scalabrini Ortiz a 100m / Bulnes / Agüero). Colectivos: Líneas 12, 15, 29, 39, 64, 68, 110, 111, 145, 152, 160 y 194.",
    "- **Estacionamientos Cercanos:** Armenia Parking (150m), Santa Fe 3956 (250m), Aparcar SA (250m), El Garage (290m), San Cayetano (350m).",
    "- **Teléfono / WhatsApp:** +54 9 11 2527-6361",
    "- **Email:** contacto@lumapiel.com.ar",
    "- **Reserva de turnos:** https://links.lumapiel.com.ar",
    "",
    "## Equipo Médico y Profesional",
    `- **Dra. Agustina Gandolfo (MN 176541):** Médica dermatóloga egresada de la Universidad de Buenos Aires (UBA), miembro de la Sociedad Argentina de Dermatología (SAD), especialista en Psiconeuroinmunología Clínica y tecnología láser Alma Lasers. [Perfil](${SITE_URL}/doctora/agustina-gandolfo)`,
    `- **Dr. Francisco Colazo (MN 172954):** Médico cirujano plástico egresado de la UBA, especialista en Cirugía General y Cirugía Plástica, Estética y Reconstructiva facial. [Perfil](${SITE_URL}/cirujano-plastico/francisco-colazo)`,
    `- **Yanina Benavidez:** Cosmetóloga y cosmiatra especializada en protocolos de higiene facial profunda, peelings químicos y cuidado de la barrera cutánea. [Perfil](${SITE_URL}/cosmetologa/yanina-benavidez)`,
    "",
    "## Especialidades y Áreas Clínicas",
    ...hubs.map(
      (h) =>
        `- **${h.title}:** ${SITE_URL}/especialidades/${h.id}`,
    ),
    "",
    "## Tratamientos Médicos y Láser",
    ...publishedTreatments.map((t) => {
      const desc = t.aliases.split("|")[0]?.trim() || t.titulo;
      return `- **[${t.titulo}](${SITE_URL}/tratamientos/${t.slug_es}):** ${desc}`;
    }),
    "",
    "## Consultas Dermatológicas",
    ...publishedConsultas.map((c) => {
      const desc = c.aliases.split("|")[0]?.trim() || c.titulo;
      return `- **[${c.titulo}](${SITE_URL}/consultas/${c.slug_es}):** ${desc}`;
    }),
    "",
    "## Información para Pacientes",
    "- Los procedimientos médicos, inyectables y tecnologías láser se realizan bajo estricta evaluación y criterio médico. Los tratamientos de cosmiatría clínica e higiene facial profunda están a cargo del equipo de cosmetología.",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
