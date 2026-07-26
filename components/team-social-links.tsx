import { TeamInstagramLink } from "@/components/team-instagram-link"
import { TeamLinkedinLink } from "@/components/team-linkedin-link"
import { cn } from "@/lib/utils"

type Props = {
  instagramUrl?: string
  linkedinUrl?: string
  className?: string
  /** Tamaño del texto de los enlaces (el menú del header usa `text-xs`). */
  linkClassName?: string
}

/** Perfiles públicos de un integrante del equipo. No renderiza nada si no hay ninguno. */
export function TeamSocialLinks({
  instagramUrl,
  linkedinUrl,
  className,
  linkClassName,
}: Props) {
  if (!instagramUrl?.trim() && !linkedinUrl?.trim()) return null
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1",
        className,
      )}
    >
      <TeamInstagramLink raw={instagramUrl} className={linkClassName} />
      <TeamLinkedinLink raw={linkedinUrl} className={linkClassName} />
    </div>
  )
}
