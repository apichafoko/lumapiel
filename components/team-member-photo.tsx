import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  /**
   * Contenedor circular (`size-*`). Por defecto pequeño: menos zoom sobre bitmaps livianos.
   */
  sizeClassName?: string
  /** Debe coincidir con el ancho visual del círculo para `next/image`. */
  imageSizes?: string
}

/** Avatar circular para equipo; tamaño contenido para reducir pixelación en fotos de baja resolución. */
export function TeamMemberPhoto({
  src,
  alt,
  className,
  priority = false,
  sizeClassName = "size-24 sm:size-28",
  imageSizes = "(max-width: 640px) 96px, 112px",
}: Props) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border/45",
        sizeClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={imageSizes}
        className="object-cover object-top"
        priority={priority}
      />
    </div>
  )
}
