import type { ReactNode } from "react"
import {
  buildSharePreviewSubtitle,
  buildWhatsAppHref,
  getLinksConfig,
  resolveShareUrl,
  type LinksConfig,
} from "@/lib/links-config"
import { LogoPreview } from "@/components/logo-preview"
import { LinksHubToolbar } from "@/components/links-hub-toolbar"
import { CalendarDays, Gift, Instagram, MapPin, MessageCircle } from "lucide-react"

type PillLinkProps = {
  href: string
  label: string
  icon: ReactNode
  /** “cta” = botón principal; “sentence” = texto en oración (ej. Ubicación) */
  labelTone?: "cta" | "sentence"
}

function PillLink({ href, label, icon, labelTone = "cta" }: PillLinkProps) {
  const labelClasses =
    labelTone === "cta"
      ? "font-title text-center text-sm font-semibold tracking-wide"
      : "font-title text-center text-sm font-semibold tracking-wide normal-case"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full max-w-md items-center gap-3 rounded-full border border-border bg-brand-white px-4 py-3.5 text-brand-blue shadow-md transition hover:brightness-[0.98] active:scale-[0.99]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-blue/15 bg-brand-white text-brand-blue">
        {icon}
      </span>
      <span className={`flex-1 ${labelClasses}`}>
        {label}
      </span>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-brand-blue/40">
        <span className="flex flex-col gap-0.5" aria-hidden>
          <span className="block h-1 w-1 rounded-full bg-current" />
          <span className="block h-1 w-1 rounded-full bg-current" />
          <span className="block h-1 w-1 rounded-full bg-current" />
        </span>
      </span>
    </a>
  )
}

function buildRows(cfg: LinksConfig) {
  const rows: { key: string; node: ReactNode }[] = []

  if (cfg.webBookingUrl) {
    rows.push({
      key: "web",
      node: (
        <PillLink
          href={cfg.webBookingUrl}
          label={cfg.labelWeb ?? "Turnos Web"}
          icon={<CalendarDays className="h-5 w-5" strokeWidth={2} />}
        />
      ),
    })
  }

  if (cfg.whatsappNumber) {
    const href = buildWhatsAppHref(
      cfg.whatsappNumber,
      cfg.whatsappPresetMessage,
    )
    if (href !== "#") {
      rows.push({
        key: "wa",
        node: (
          <PillLink
            href={href}
            label={cfg.labelWhatsapp ?? "Turnos Whatsapp"}
            icon={<MessageCircle className="h-5 w-5" strokeWidth={2} />}
          />
        ),
      })
    }
  }

  if (cfg.giftCardUrl) {
    rows.push({
      key: "gift-card",
      node: (
        <PillLink
          href={cfg.giftCardUrl}
          label={cfg.labelGiftCard ?? "Regala una Gift Card"}
          icon={<Gift className="h-5 w-5" strokeWidth={2} />}
        />
      ),
    })
  }

  if (cfg.mapsUrl) {
    rows.push({
      key: "maps",
      node: (
        <PillLink
          href={cfg.mapsUrl}
          label={cfg.labelMaps ?? "Ubicación"}
          labelTone="sentence"
          icon={<MapPin className="h-5 w-5" strokeWidth={2} />}
        />
      ),
    })
  }

  return rows
}

export async function LinksHub() {
  const cfg = getLinksConfig()
  const shareUrl = await resolveShareUrl()
  const rows = buildRows(cfg)
  const previewSubtitle =
    shareUrl != null
      ? buildSharePreviewSubtitle(shareUrl, cfg.sharePreviewHandle)
      : ""

  return (
    <div className="flex min-h-screen flex-col items-center bg-brand-blue px-4 pb-16 pt-10 text-brand-white">
      <div className="flex w-full max-w-md flex-col items-center">
        {shareUrl ? (
          <LinksHubToolbar
            shareUrl={shareUrl}
            moreUrl={cfg.moreUrl}
            brandName={cfg.brandName}
            logoUrl={cfg.logoUrl}
            previewSubtitle={previewSubtitle}
          />
        ) : (
          <div className="mb-8 h-11" aria-hidden />
        )}

        <div className="mb-8 flex w-full justify-center">
          <LogoPreview
            src={cfg.logoUrl ?? undefined}
            alt={`${cfg.brandName} — logo`}
            tone="dark"
          />
        </div>

        {cfg.tagline ? (
          <p className="font-subtext max-w-sm text-center text-sm leading-relaxed text-brand-piel">
            {cfg.tagline}
          </p>
        ) : null}

        <div className="mt-10 flex w-full flex-col items-center gap-3">
          {rows.map((r) => (
            <div key={r.key} className="w-full flex justify-center">
              {r.node}
            </div>
          ))}
        </div>

        {cfg.instagramUrl ? (
          <a
            href={cfg.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-white/20 bg-brand-white/10 text-brand-white shadow-sm transition hover:bg-brand-white/20"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
        ) : null}

        <p className="font-subtext mt-12 max-w-sm text-center text-xs leading-relaxed text-brand-piel/90">
          © {new Date().getFullYear()} - {cfg.brandName} -{" "}
          {cfg.mapsUrl ? (
            <a
              href={cfg.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-brand-white hover:underline"
            >
              {cfg.footerAddress}
            </a>
          ) : (
            cfg.footerAddress
          )}
        </p>
      </div>
    </div>
  )
}
