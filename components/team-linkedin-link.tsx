import { Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  /** URL completa del perfil. Vacío u omitido: no se muestra. */
  raw: string | undefined
  className?: string
}

export function TeamLinkedinLink({ raw, className }: Props) {
  const url = raw?.trim()
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
        className,
      )}
    >
      <Linkedin className="size-4 shrink-0" aria-hidden />
      <span>LinkedIn</span>
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  )
}
