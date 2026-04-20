"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Link2, Mail, Share2, XIcon } from "lucide-react"
import { toast } from "sonner"
import { LogoPreview } from "@/components/logo-preview"
import { cn } from "@/lib/utils"

type LinksShareModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  shareUrl: string
  brandName: string
  logoUrl: string | null
  previewSubtitle: string
}

function IconX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

type ShareChipProps = {
  href?: string
  onClick?: () => void | Promise<void>
  label: string
  className?: string
  children: ReactNode
}

function ShareChip({ href, onClick, label, className, children }: ShareChipProps) {
  const body = (
    <>
      <span
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-md transition active:scale-95",
          className,
        )}
      >
        {children}
      </span>
      <span className="font-title max-w-[5.5rem] text-balance text-center text-[11px] font-medium leading-snug text-brand-blue/80 sm:max-w-[6.5rem]">
        {label}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex snap-start flex-col items-center gap-2"
      >
        {body}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex snap-start flex-col items-center gap-2"
    >
      {body}
    </button>
  )
}

export function LinksShareModal({
  open,
  onOpenChange,
  shareUrl,
  brandName,
  logoUrl,
  previewSubtitle,
}: LinksShareModalProps) {
  const [canNativeShare, setCanNativeShare] = useState(false)
  const logoSrc = logoUrl ?? "/logos/logo-completo-azul.svg"

  useEffect(() => {
    if (!open) return
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share)
  }, [open])

  const shareText = `${brandName}\n${shareUrl}`

  const twitterUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
    url: shareUrl,
    text: brandName,
  }).toString()}`

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  const telegramUrl = `https://t.me/share/url?${new URLSearchParams({
    url: shareUrl,
    text: brandName,
  }).toString()}`

  const mailUrl = `mailto:?subject=${encodeURIComponent(brandName)}&body=${encodeURIComponent(shareUrl)}`

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Enlace copiado")
    } catch {
      toast.error("No se pudo copiar")
    }
  }

  async function onNativeShare() {
    try {
      await navigator.share({ title: brandName, text: brandName, url: shareUrl })
      onOpenChange(false)
    } catch {
      /* usuario canceló */
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(90dvh,85svh)] w-full max-w-[min(420px,calc(100vw-1.5rem))] min-w-0 flex-col gap-0 overflow-hidden rounded-2xl border border-brand-blue/10 bg-brand-white p-0 text-brand-blue shadow-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogDescription className="sr-only">
          Elegí cómo compartir la página de enlaces de {brandName}.
        </DialogDescription>

        <div className="relative border-b border-brand-blue/10 px-6 pb-4 pt-5">
          <DialogHeader className="space-y-0 p-0 text-center">
            <DialogTitle className="font-title pr-10 text-lg font-bold tracking-tight text-brand-blue">
              Compartir
            </DialogTitle>
          </DialogHeader>
          <DialogClose
            type="button"
            className="absolute right-3 top-3 rounded-full p-2.5 text-brand-blue/70 transition hover:bg-brand-blue/5 hover:text-brand-blue"
            aria-label="Cerrar"
          >
            <XIcon className="h-5 w-5" />
          </DialogClose>
        </div>

        <div className="min-h-0 min-w-0 shrink overflow-y-auto px-3 pb-3 sm:px-4 sm:pb-4">
          <div className="min-w-0 rounded-2xl bg-brand-blue px-3 py-6 text-center shadow-inner ring-1 ring-black/10 sm:px-4 sm:py-8">
            <div className="mb-4 flex w-full min-w-0 justify-center overflow-hidden">
              <LogoPreview
                src={logoSrc}
                alt={brandName}
                className="max-w-full min-w-0 px-0"
              />
            </div>
            <p className="font-subtext break-words px-1 text-sm leading-snug text-brand-white/90">
              {previewSubtitle}
            </p>
          </div>
        </div>

        <div className="min-w-0 shrink-0 border-t border-brand-blue/10 bg-brand-white/95 px-2 py-4 sm:px-3 sm:py-5">
          <p className="font-title mb-3 text-center text-xs font-semibold uppercase tracking-wider text-brand-blue/50 sm:mb-4">
            Compartir en
          </p>
          <div className="flex min-w-0 flex-wrap justify-center gap-x-3 gap-y-4 px-1 sm:gap-x-4">
            <ShareChip
              onClick={onCopy}
              label="Copiar enlace"
              className="bg-neutral-200 text-brand-blue"
            >
              <Link2 className="h-6 w-6" strokeWidth={2.25} />
            </ShareChip>

            {canNativeShare ? (
              <ShareChip
                onClick={onNativeShare}
                label="Más opciones"
                className="bg-brand-piel text-brand-blue"
              >
                <Share2 className="h-6 w-6" strokeWidth={2} />
              </ShareChip>
            ) : null}

            <ShareChip href={twitterUrl} label="X" className="bg-neutral-900">
              <IconX className="h-5 w-5" />
            </ShareChip>

            <ShareChip href={facebookUrl} label="Facebook" className="bg-[#1877F2]">
              <IconFacebook className="h-6 w-6" />
            </ShareChip>

            <ShareChip href={whatsappUrl} label="WhatsApp" className="bg-[#25D366]">
              <IconWhatsApp className="h-7 w-7" />
            </ShareChip>

            <ShareChip href={linkedInUrl} label="LinkedIn" className="bg-[#0A66C2]">
              <IconLinkedIn className="h-6 w-6" />
            </ShareChip>

            <ShareChip href={telegramUrl} label="Telegram" className="bg-[#229ED9]">
              <IconTelegram className="h-6 w-6" />
            </ShareChip>

            <ShareChip href={mailUrl} label="Correo" className="bg-secondary text-brand-white">
              <Mail className="h-6 w-6" strokeWidth={2} />
            </ShareChip>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
