#!/usr/bin/env node
/**
 * Valida hubRefs de servicios en Sanity contra anclas de hubs.
 */
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

config({ path: join(root, ".env.local") });
config({ path: join(root, ".env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.warn(
    "validate-sanity-hub-refs: omitido (configurá NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_API_READ_TOKEN, luego npm run migrate:content)",
  );
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token,
  useCdn: false,
});

const hubs = await client.fetch(
  `*[_type == "hub"]{ "id": slug.current, "anchors": sections[].anchor }`,
);
const anchorMap = new Map(hubs.map((h) => [h.id, new Set(h.anchors ?? [])]));

const services = await client.fetch(
  `*[_type == "service"]{ legacyId, hubRefs }`,
);

let errors = 0;
for (const svc of services) {
  const ref = svc.hubRefs?.trim();
  if (!ref) continue;
  const m = ref.match(/^hub:([^:]+):(.+)$/);
  if (!m) {
    console.error(`[hubRefs] formato inválido en ${svc.legacyId}: ${ref}`);
    errors++;
    continue;
  }
  const [, hubId, anchor] = m;
  const set = anchorMap.get(hubId);
  if (!set) {
    console.error(`[hubRefs] hub desconocido ${hubId} en ${svc.legacyId}`);
    errors++;
    continue;
  }
  if (!set.has(anchor)) {
    console.error(
      `[hubRefs] ancla "${anchor}" no existe en hub ${hubId} (${svc.legacyId})`,
    );
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nvalidate-sanity-hub-refs: ${errors} error(es)`);
  process.exit(1);
}
console.log("validate-sanity-hub-refs: OK");
