"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoPreviewProps = {
  /** Por defecto `/logo-piel.svg` */
  src?: string
  alt?: string
  className?: string
}

export function LogoPreview({
  src = "/logo-piel.svg",
  alt = "Luma Piel — Dermatología Integral",
  className,
}: LogoPreviewProps) {
  const isRemote = /^https?:\/\//i.test(src)

  return (
    <div className={cn("relative w-full max-w-lg px-2", className)}>
      {isRemote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={800}
          height={262}
          className="h-auto w-full object-contain"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={262}
          className="h-auto w-full object-contain"
          priority
        />
      )}
    </div>
  )
}
