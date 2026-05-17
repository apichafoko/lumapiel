#!/usr/bin/env node
/**
 * Migra content/ → Sanity (proyecto nuevo).
 * Requiere: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_WRITE_TOKEN en .env.local
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { mdToPortableText } from "./lib/md-to-portable-text.mjs";
import { extractQueEsPlainText } from "./lib/extract-que-es.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

config({ path: join(root, ".env.local") });
config({ path: join(root, ".env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !token) {
  console.error(
    "Faltan NEXT_PUBLIC_SANITY_PROJECT_ID y/o SANITY_API_WRITE_TOKEN en .env.local",
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

function readJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), "utf8"));
}

function readMd(...segments) {
  const path = join(root, ...segments);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

function docId(type, key) {
  return `${type}-${key}`.replace(/[^a-zA-Z0-9-_]/g, "-");
}

async function migrateHubs() {
  const hubDir = join(root, "content/hubs");
  const files = readdirSync(hubDir).filter((f) => f.endsWith(".es.json"));
  let n = 0;
  for (const file of files) {
    const hub = readJson(join("content/hubs", file));
    const description = await mdToPortableText(hub.description || "");
    const sections = await Promise.all(
      (hub.sections || []).map(async (s) => ({
        _key: s.anchor,
        anchor: s.anchor,
        title: s.title,
        body: await mdToPortableText(s.body || ""),
      })),
    );
    const procedureBlocks = (hub.procedureBlocks || []).map((b) => ({
      _key: `${b.style}-${b.title}`.slice(0, 40),
      ...b,
      items: b.items?.map((it, i) => ({ _key: `item-${i}`, ...it })),
    }));

    await client.createOrReplace({
      _id: docId("hub", hub.id),
      _type: "hub",
      slug: { _type: "slug", current: hub.id },
      title: hub.title,
      description,
      sections,
      procedureBlocks: procedureBlocks.length ? procedureBlocks : undefined,
    });
    n++;
    console.log(`  hub: ${hub.id}`);
  }
  return n;
}

async function migrateServices() {
  const services = readJson("content/services.es.json");
  let n = 0;
  let hubErrors = 0;
  const anchorMap = new Map();
  for (const file of readdirSync(join(root, "content/hubs")).filter((f) =>
    f.endsWith(".es.json"),
  )) {
    const h = readJson(join("content/hubs", file));
    anchorMap.set(h.id, new Set(h.sections.map((s) => s.anchor)));
  }

  for (const svc of services) {
    const md = readMd("content", "services", `${svc.slug_es}.md`);
    const body = md ? await mdToPortableText(md) : [];
    const queEsExcerpt = md ? extractQueEsPlainText(md) : null;

    const ref = svc.hub_refs?.trim();
    if (ref) {
      const m = ref.match(/^hub:([^:]+):(.+)$/);
      if (m) {
        const [, hubId, anchor] = m;
        const set = anchorMap.get(hubId);
        if (!set?.has(anchor)) {
          console.error(`  [hub_refs] ${svc.id}: ancla "${anchor}" no en hub ${hubId}`);
          hubErrors++;
        }
      }
    }

    await client.createOrReplace({
      _id: docId("service", svc.id.replace(/^svc:/, "")),
      _type: "service",
      legacyId: svc.id,
      titulo: svc.titulo,
      slug: { _type: "slug", current: svc.slug_es },
      lista: svc.lista,
      tipo: svc.tipo,
      categorias: svc.categorias || "",
      aliases: svc.aliases || "",
      hubRefs: svc.hub_refs || "",
      relatedServiceIds: svc.related_service_ids || "",
      hubPinRank: svc.hub_pin_rank ?? 0,
      published: Boolean(svc.published),
      duracionMinutos: svc.duracion_minutos,
      queEsExcerpt,
      body,
    });
    n++;
    console.log(`  service: ${svc.slug_es}`);
  }
  if (hubErrors) {
    console.error(`\n${hubErrors} error(es) hub_refs (revisar antes de publicar)`);
  }
  return n;
}

async function migrateHome() {
  const home = readJson("content/pages/home.es.json");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    ...home,
  });
  console.log("  homePage");
  return 1;
}

async function migratePeople() {
  const people = [
    {
      slug: "agustina-gandolfo",
      role: "doctora",
      displayName: "Dra. Agustina Gandolfo",
      jobTitle: "Médica dermatóloga",
      seoDescription:
        "Dra. Agustina Gandolfo, dermatóloga en Luma Piel (Palermo, CABA): medicina de precisión, psiconeuroinmunología clínica y tecnología Alma Lasers con criterio médico.",
    },
    {
      slug: "yanina-benavidez",
      role: "cosmetologa",
      displayName: "Yanina Benavidez",
      jobTitle: "Cosmetóloga",
      seoDescription:
        "Cosmetóloga en Luma Piel (Palermo, CABA): tratamientos cosmiátricos personalizados junto a la Dra. Gandolfo, seguimiento cercano y educación en el cuidado diario.",
    },
  ];
  let n = 0;
  for (const p of people) {
    const md = readMd("content", "people", `${p.slug}.md`);
    const body = md ? await mdToPortableText(md) : [];
    await client.createOrReplace({
      _id: docId("person", p.slug),
      _type: "person",
      slug: { _type: "slug", current: p.slug },
      role: p.role,
      displayName: p.displayName,
      jobTitle: p.jobTitle,
      seoDescription: p.seoDescription,
      body,
    });
    n++;
    console.log(`  person: ${p.slug}`);
  }
  return n;
}

async function migrateLegal() {
  const dir = join(root, "content/legal/es");
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  let n = 0;
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const md = readMd("content", "legal", "es", file);
    const titleLine = md?.split("\n").find((l) => l.startsWith("# "));
    const title = titleLine?.replace(/^#\s+/, "").trim() ?? slug;
    const bodyMd = md?.replace(/^#\s+.+\n+/, "").trim() ?? "";
    const body = await mdToPortableText(bodyMd);
    await client.createOrReplace({
      _id: docId("legal", slug),
      _type: "legalPage",
      slug: { _type: "slug", current: slug },
      title,
      body,
    });
    n++;
    console.log(`  legal: ${slug}`);
  }
  return n;
}

async function main() {
  console.log(`Migrando a ${projectId}/${dataset}...\n`);
  const counts = {
    hubs: await migrateHubs(),
    services: await migrateServices(),
    home: await migrateHome(),
    people: await migratePeople(),
    legal: await migrateLegal(),
  };
  console.log("\nResumen:", counts);
  console.log("\nListo. Invitá editores en sanity.io/manage y abrí /studio");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
