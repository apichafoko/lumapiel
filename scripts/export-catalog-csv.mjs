#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const rows = JSON.parse(readFileSync(join(root, "content/services.es.json"), "utf8"))

function esc(v) {
  const s = String(v ?? "")
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

const cols = [
  "id",
  "tipo",
  "lista",
  "titulo",
  "slug_es",
  "categorias",
  "aliases",
  "hub_refs",
  "related_service_ids",
  "hub_pin_rank",
  "published",
  "duracion_minutos",
]

const lines = [cols.join(",")]
for (const r of rows) {
  lines.push(cols.map((c) => esc(r[c])).join(","))
}

const outDir = join(root, "content/catalog")
mkdirSync(outDir, { recursive: true })
const outPath = join(outDir, "services.master.csv")
writeFileSync(outPath, lines.join("\n"))
console.log(`Wrote ${rows.length} rows -> ${outPath}`)
