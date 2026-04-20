"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

/** Logo completo con descriptor (azul marca) — fondos claros (#f4f4f4, blanco). */
const LOGO_LIGHT_BG = "/logos/logo-completo-azul.svg"

/**
 * Logo completo en tonos “Piel” del manual — barras oscuras, hero azul o pie con fondo intenso.
 */
const LOGO_ON_DARK_BG = "/logos/logo-completo-piel.svg"

/** Ratio SVG horizontal oficial. */
const LOGO_WIDTH = 936
const LOGO_HEIGHT = 306

type LogoPreviewProps = {
  /** Ruta bajo `public/` o URL HTTPS. Sin `src`, usa `tone` (completo azul / completo piel). */
  src?: string
  alt?: string
  className?: string
  /**
   * `light`: archivo azul sobre superficies claras (header por defecto).
   * `dark`: variante tono piel del pack para contrastar sobre fondos oscuros.
   */
  tone?: "light" | "dark"
}

export function LogoPreview({
  src,
  alt = "Luma Piel — Dermatología Integral",
  className,
  tone = "light",
}: LogoPreviewProps) {
  const resolvedSrc = src ?? (tone === "dark" ? LOGO_ON_DARK_BG : LOGO_LIGHT_BG)
  const isRemote = /^https?:\/\//i.test(resolvedSrc)

  return (
    <div className={cn("relative min-w-0 w-full max-w-lg px-2", className)}>
      {isRemote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedSrc}
          alt={alt}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="h-auto w-full object-contain"
        />
      ) : (
        <Image
          src={resolvedSrc}
          alt={alt}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="h-auto w-full object-contain"
          priority
        />
      )}
    </div>
  )
}
