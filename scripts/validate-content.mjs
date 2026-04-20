#!/usr/bin/env node
/**
 * Valida hub_refs de services.es.json contra anclas declaradas en content/hubs/*.es.json
 */
import { readFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

const services = JSON.parse(readFileSync(join(root, "content/services.es.json"), "utf8"))
const hubDir = join(root, "content/hubs")
const hubFiles = readdirSync(hubDir).filter((f) => f.endsWith(".es.json"))

const anchorMap = new Map()
for (const file of hubFiles) {
  const hub = JSON.parse(readFileSync(join(hubDir, file), "utf8"))
  const anchors = new Set(hub.sections.map((s) => s.anchor))
  anchorMap.set(hub.id, anchors)
}

let errors = 0
for (const svc of services) {
  const ref = svc.hub_refs?.trim()
  if (!ref) continue
  const m = ref.match(/^hub:([^:]+):(.+)$/)
  if (!m) {
    console.error(`[hub_refs] formato inválido en ${svc.id}: ${ref}`)
    errors++
    continue
  }
  const [, hubId, anchor] = m
  const set = anchorMap.get(hubId)
  if (!set) {
    console.error(`[hub_refs] hub desconocido ${hubId} en ${svc.id}`)
    errors++
    continue
  }
  if (!set.has(anchor)) {
    console.error(`[hub_refs] ancla "${anchor}" no existe en hub ${hubId} (${svc.id})`)
    errors++
  }
}

if (errors > 0) {
  console.error(`\nvalidate-content: ${errors} error(es)`)
  process.exit(1)
}
console.log("validate-content: OK")
