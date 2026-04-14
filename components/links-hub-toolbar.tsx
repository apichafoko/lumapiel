"use client"

import { useState } from "react"
import { Share2, Sparkles } from "lucide-react"
import { LinksShareModal } from "@/components/links-share-modal"

type LinksHubToolbarProps = {
  shareUrl: string
  moreUrl?: string | null
  brandName: string
  logoUrl: string | null
  previewSubtitle: string
}

export function LinksHubToolbar({
  shareUrl,
  moreUrl,
  brandName,
  logoUrl,
  previewSubtitle,
}: LinksHubToolbarProps) {
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <>
      <div className="mb-8 flex w-full max-w-md justify-between gap-3">
        {moreUrl ? (
          <a
            href={moreUrl}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-sm transition hover:bg-secondary/80"
            aria-label="Más información"
          >
            <Sparkles className="h-5 w-5" />
          </a>
        ) : (
          <span className="inline-block h-11 w-11 shrink-0" aria-hidden />
        )}
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-sm transition hover:bg-secondary/80"
          aria-label="Compartir enlace"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <LinksShareModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        shareUrl={shareUrl}
        brandName={brandName}
        logoUrl={logoUrl}
        previewSubtitle={previewSubtitle}
      />
    </>
  )
}
