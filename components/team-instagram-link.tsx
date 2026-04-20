import { Instagram } from "lucide-react"
import {
  instagramDisplayHandle,
  instagramProfileUrl,
} from "@/lib/instagram-url"
import { cn } from "@/lib/utils"

type Props = {
  /** URL, `@usuario` o usuario sin arroba. */
  raw: string | undefined
  className?: string
}

export function TeamInstagramLink({ raw, className }: Props) {
  const trimmed = raw?.trim()
  if (!trimmed) return null
  const url = instagramProfileUrl(trimmed)
  if (!url) return null
  const label = instagramDisplayHandle(trimmed)
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
      <Instagram className="size-4 shrink-0" aria-hidden />
      <span>{label}</span>
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  )
}
