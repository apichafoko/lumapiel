"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import type { ServiceRecord } from "@/lib/content/schema"
import { matchesQuery } from "@/lib/search-normalize"
import { getPrimaryHubHref } from "@/lib/hub-links"

type TabKey = "tratamientos" | "consultas"

type Props = {
  tratamientos: ServiceRecord[]
  consultas: ServiceRecord[]
}

export function BuscarClient({ tratamientos, consultas }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab") === "consultas" ? "consultas" : "tratamientos"
  const [tab, setTab] = useState<TabKey>(tabFromUrl)
  const [q, setQ] = useState(searchParams.get("q") ?? "")

  const list = tab === "tratamientos" ? tratamientos : consultas

  const filtered = useMemo(() => {
    if (!q.trim()) return list
    return list.filter((s) => matchesQuery(s, q))
  }, [list, q])

  const base: "/tratamientos" | "/consultas" =
    tab === "tratamientos" ? "/tratamientos" : "/consultas"

  const pushUrl = useCallback(
    (nextTab: TabKey, nextQ: string) => {
      const params = new URLSearchParams()
      params.set("tab", nextTab)
      if (nextQ.trim()) params.set("q", nextQ.trim())
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router],
  )

  useEffect(() => {
    const t = window.setTimeout(() => {
      pushUrl(tab, q)
    }, 280)
    return () => window.clearTimeout(t)
  }, [q, tab, pushUrl])

  return (
    <div className="space-y-8">
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="tratamientos">Tratamientos</TabsTrigger>
          <TabsTrigger value="consultas">Consultas</TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        <label className="sr-only" htmlFor="buscar-global">
          Buscar
        </label>
        <Input
          id="buscar-global"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nombre del tratamiento o palabra clave…"
          className="max-w-xl"
        />
      </div>

      <ResultList items={filtered} base={base} />
    </div>
  )
}

function ResultList({
  items,
  base,
}: {
  items: ServiceRecord[]
  base: "/tratamientos" | "/consultas"
}) {
  const fichaLabel =
    base === "/tratamientos" ? "Ver tratamiento" : "Ver consulta"

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No hay coincidencias. Probá otra palabra o cambiá de pestaña.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-card">
      {items.map((s) => {
        const hub = getPrimaryHubHref(s)
        const href = `${base}/${s.slug_es}`
        return (
          <li
            key={s.id}
            className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link href={href} className="font-heading font-semibold text-primary hover:underline">
                {s.titulo}
              </Link>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {(s.aliases.split("|")[0] ?? "").trim()}
              </p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm font-medium">
              <Link href={href} className="text-primary hover:underline">
                {fichaLabel}
              </Link>
              {hub ? (
                <Link href={hub} className="text-muted-foreground hover:text-primary hover:underline">
                  Ver especialidad
                </Link>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
