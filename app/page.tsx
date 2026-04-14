import { LogoPreview } from "@/components/logo-preview"
import { Sparkles } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-12">
        <LogoPreview />
      </div>

      {/* Coming Soon Badge */}
      <div className="flex items-center gap-2 bg-secondary/50 px-6 py-3 rounded-full border border-primary/30">
        <Sparkles className="w-5 h-5 text-primary" />
        <span className="font-title text-foreground text-sm font-medium uppercase tracking-widest">
          Próximamente
        </span>
      </div>

      {/* Description */}
      <p className="font-subtext mt-12 max-w-lg leading-relaxed text-muted-foreground">
        Estamos preparando algo especial para vos. Tratamientos dermatológicos de vanguardia con tecnología láser de última generación.
      </p>

      {/* Footer */}
      <footer className="font-subtext absolute bottom-8 text-sm text-muted-foreground">
        © 2026 Luma Piel. Todos los derechos reservados.
      </footer>
    </main>
  )
}
