import Image from "next/image"
import Link from "next/link"
import type { SiteConfig } from "@/lib/site-config"
import { telHref, mailHref, whatsappHrefForLocale } from "@/lib/contact-links"

type Props = {
  site: SiteConfig
}

export function SiteFooter({ site }: Props) {
  const wa = whatsappHrefForLocale("es")

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-heading text-lg font-semibold text-primary">{site.brandName}</p>
          <p className="text-sm text-muted-foreground">{site.tagline}</p>
          <p className="text-xs text-muted-foreground">{site.address}</p>
        </div>

        <div className="space-y-3">
          <p className="font-heading text-sm font-semibold text-foreground">Explorá</p>
          <ul className="space-y-2 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted-foreground hover:text-primary">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/buscar" className="text-muted-foreground hover:text-primary">
                Buscar
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="font-heading text-sm font-semibold text-foreground">Especialidades</p>
          <ul className="space-y-2 text-sm">
            {site.hubs.map((h) => (
              <li key={h.href}>
                <Link href={h.href} className="text-muted-foreground hover:text-primary">
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="font-heading text-sm font-semibold text-foreground">Contacto</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={telHref()} className="hover:text-primary">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailHref()} className="hover:text-primary">
                {site.email}
              </a>
            </li>
            <li>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/80 bg-background/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {site.brandName}. {site.footerDisclaimer}</p>
          <p className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 sm:text-right">
            <span className="text-muted-foreground">Sitio potenciado por</span>
            <a
              href={site.lumaSoftwareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-opacity hover:opacity-90"
            >
              <Image
                src="/logos/luma-software.png"
                alt="Luma Software"
                width={700}
                height={184}
                className="h-auto max-h-11 w-auto max-w-[min(100vw-6rem,260px)] object-contain object-right sm:max-h-12"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
