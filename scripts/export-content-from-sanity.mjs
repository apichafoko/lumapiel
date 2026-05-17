#!/usr/bin/env node
/**
 * Exporta contenido publicado (y borradores si hay token) desde Sanity → content/.
 * Inverso de migrate:content. No modifica Sanity.
 *
 * Requiere: NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_API_READ_TOKEN
 * (o SANITY_API_WRITE_TOKEN como respaldo) en .env.local
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { ptToMarkdown } from "./lib/pt-to-markdown.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

config({ path: join(root, ".env.local") });
config({ path: join(root, ".env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

const publishedOnly = process.argv.includes("--published-only");

if (!projectId || !token) {
  console.error(
    "Faltan NEXT_PUBLIC_SANITY_PROJECT_ID y/o SANITY_API_READ_TOKEN (o WRITE) en .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const perspective = publishedOnly ? "published" : "drafts";

function writeJson(rel, data) {
  const path = join(root, rel);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`  wrote ${rel}`);
}

function writeText(rel, text) {
  const path = join(root, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text.endsWith("\n") ? text : `${text}\n`, "utf8");
  console.log(`  wrote ${rel}`);
}

function stripProcedureBlock(block) {
  if (!block) return block;
  const { _key, _type, items, ...rest } = block;
  if (items?.length) {
    return {
      ...rest,
      items: items.map(({ label, slug_es }) => ({ label, slug_es })),
    };
  }
  const { slug_es, style, title } = rest;
  return { style, title, slug_es };
}

async function exportServices() {
  const docs = await client.fetch(
    `*[_type == "service"] | order(titulo asc) {
      legacyId,
      titulo,
      "slug_es": slug.current,
      tipo,
      lista,
      categorias,
      aliases,
      hubRefs,
      relatedServiceIds,
      hubPinRank,
      published,
      duracionMinutos,
      body
    }`,
    {},
    { perspective },
  );

  const catalog = docs.map((doc) => ({
    id: doc.legacyId,
    tipo: doc.tipo,
    lista: doc.lista,
    titulo: doc.titulo,
    slug_es: doc.slug_es,
    categorias: doc.categorias ?? "",
    aliases: doc.aliases ?? "",
    hub_refs: doc.hubRefs ?? "",
    related_service_ids: doc.relatedServiceIds ?? "",
    hub_pin_rank: doc.hubPinRank ?? 0,
    published: Boolean(doc.published),
    duracion_minutos: doc.duracionMinutos ?? undefined,
  }));

  writeJson("content/services.es.json", catalog);

  let mdCount = 0;
  for (const doc of docs) {
    if (!doc.slug_es) continue;
    const md = ptToMarkdown(doc.body);
    if (md) {
      writeText(join("content", "services", `${doc.slug_es}.md`), md);
      mdCount++;
    }
  }
  return { services: catalog.length, markdown: mdCount };
}

async function exportHubs() {
  const docs = await client.fetch(
    `*[_type == "hub"] | order(title asc) {
      "id": slug.current,
      title,
      description,
      sections[] { anchor, title, body },
      procedureBlocks[] {
        style,
        title,
        slug_es,
        items[] { label, slug_es }
      }
    }`,
    {},
    { perspective },
  );

  let n = 0;
  for (const hub of docs) {
    if (!hub.id) continue;
    const payload = {
      id: hub.id,
      title: hub.title,
      description: ptToMarkdown(hub.description),
      procedureBlocks: (hub.procedureBlocks ?? []).map(stripProcedureBlock),
      sections: await Promise.all(
        (hub.sections ?? []).map(async (s) => ({
          anchor: s.anchor,
          title: s.title,
          body: ptToMarkdown(s.body),
        })),
      ),
    };
    writeJson(`content/hubs/${hub.id}.es.json`, payload);
    n++;
  }
  return { hubs: n };
}

async function exportHome() {
  const doc = await client.fetch(
    `*[_type == "homePage"][0] {
      hero,
      pillars,
      howWeWork,
      frequentConsults,
      faqTitle,
      faq
    }`,
    {},
    { perspective },
  );
  if (!doc) {
    console.warn("  [skip] No hay documento homePage en Sanity");
    return { home: 0 };
  }
  writeJson("content/pages/home.es.json", doc);
  return { home: 1 };
}

async function exportPeople() {
  const docs = await client.fetch(
    `*[_type == "person"] | order(displayName asc) {
      "slug": slug.current,
      role,
      displayName,
      jobTitle,
      seoDescription,
      body
    }`,
    {},
    { perspective },
  );

  let n = 0;
  for (const p of docs) {
    if (!p.slug) continue;
    const bodyMd = ptToMarkdown(p.body);
    const md = `# ${p.displayName}\n\n**${p.jobTitle}**\n\n${bodyMd}`.trim();
    writeText(join("content", "people", `${p.slug}.md`), md);
    n++;
  }
  return { people: n };
}

async function exportLegal() {
  const docs = await client.fetch(
    `*[_type == "legalPage"] | order(title asc) {
      title,
      "slug": slug.current,
      body
    }`,
    {},
    { perspective },
  );

  let n = 0;
  for (const doc of docs) {
    if (!doc.slug) continue;
    const bodyMd = ptToMarkdown(doc.body);
    const md = `# ${doc.title}\n\n${bodyMd}`.trim();
    writeText(join("content", "legal", "es", `${doc.slug}.md`), md);
    n++;
  }
  return { legal: n };
}

async function main() {
  console.log(
    `Exportando desde ${projectId}/${dataset} (perspectiva: ${perspective})...\n`,
  );
  if (!publishedOnly) {
    console.log(
      "  Incluye borradores no publicados (última edición en Studio).\n",
    );
  }

  const counts = {
    ...(await exportServices()),
    ...(await exportHubs()),
    ...(await exportHome()),
    ...(await exportPeople()),
    ...(await exportLegal()),
  };

  console.log("\nResumen:", counts);
  console.log(
    "\nListo. Los archivos en content/ reflejan Sanity. No ejecutes migrate:content salvo que quieras SOBRESCRIBIR el CMS.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
