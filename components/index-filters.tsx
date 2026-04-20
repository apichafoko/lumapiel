import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  basePath: "/tratamientos" | "/consultas"
  categories: string[]
  /** Query actual normalizada */
  activeCat?: string
  activeQ?: string
}

export function IndexFilters({ basePath, categories, activeCat = "", activeQ = "" }: Props) {
  function href(overrides: { cat?: string; q?: string }) {
    const params = new URLSearchParams()
    const cat = overrides.cat !== undefined ? overrides.cat : activeCat
    const q = overrides.q !== undefined ? overrides.q : activeQ
    if (q.trim()) params.set("q", q.trim())
    if (cat) params.set("cat", cat)
    const qs = params.toString()
    return qs ? `${basePath}?${qs}` : basePath
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        <FilterChip href={href({ cat: "" })} active={!activeCat}>
          Todas
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c} href={href({ cat: c })} active={activeCat === c}>
            {c}
          </FilterChip>
        ))}
      </div>
      <form action={basePath} method="get" className="flex w-full max-w-sm gap-2">
        <input type="hidden" name="cat" value={activeCat} />
        <input
          name="q"
          defaultValue={activeQ}
          placeholder="Buscar…"
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Buscar en la lista"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 shrink-0 items-center rounded-md px-4 text-sm font-medium"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}

function FilterChip({
  href: hrefProp,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={hrefProp}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  )
}
