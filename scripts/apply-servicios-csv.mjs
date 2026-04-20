#!/usr/bin/env node
/**
 * Fusiona Duración (min) desde content/catalog/servicios.csv en content/services.es.json.
 * Matching por nombre de servicio normalizado (equivale al CSV "Nombre").
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

function parseCsvLine(line) {
  const out = []
  let cur = ""
  let q = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      q = !q
      continue
    }
    if (!q && c === ",") {
      out.push(cur)
      cur = ""
      continue
    }
    cur += c
  }
  out.push(cur)
  return out
}

function norm(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/°/g, "o")
    .replace(/\s+/g, " ")
    .trim()
}

const csvPath = join(root, "content/catalog/servicios.csv")
const jsonPath = join(root, "content/services.es.json")

const raw = readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "")
const lines = raw.split(/\r?\n/).filter((l) => l.trim())

const header = parseCsvLine(lines[0])
const idxNombre = header.indexOf("Nombre")
const idxDur = header.findIndex((h) => h.includes("Duración"))
if (idxNombre < 0 || idxDur < 0) {
  console.error("CSV: no se encontraron columnas Nombre o Duración", header)
  process.exit(1)
}

/** @type {Map<string, number>} */
const durByNombre = new Map()
for (let i = 1; i < lines.length; i++) {
  const cols = parseCsvLine(lines[i])
  const nombre = cols[idxNombre]?.trim()
  const durRaw = cols[idxDur]?.trim()
  if (!nombre || durRaw === "") continue
  const n = Number.parseInt(durRaw, 10)
  if (!Number.isFinite(n) || n < 0) {
    console.warn("Duración inválida para", nombre, durRaw)
    continue
  }
  durByNombre.set(norm(nombre), n)
}

const services = JSON.parse(readFileSync(jsonPath, "utf8"))
let matched = 0
let missing = 0

for (const svc of services) {
  const key = norm(svc.titulo)
  const d = durByNombre.get(key)
  if (d === undefined) {
    console.warn("[sin match CSV]", svc.titulo, `(${svc.slug_es})`)
    missing++
    delete svc.duracion_minutos
    continue
  }
  svc.duracion_minutos = d
  matched++
}

writeFileSync(jsonPath, JSON.stringify(services, null, 2) + "\n")
console.log(`duracion_minutos: ${matched} servicios actualizados, ${missing} sin fila en CSV.`)
