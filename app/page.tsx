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
        <span className="text-foreground font-medium tracking-widest uppercase text-sm">
          Próximamente
        </span>
      </div>

      {/* Description */}
      <p className="mt-12 text-muted-foreground max-w-lg leading-relaxed">
        Estamos preparando algo especial para vos. Tratamientos dermatológicos de vanguardia con tecnología láser de última generación.
      </p>

      {/* Footer */}
      <footer className="absolute bottom-8 text-muted-foreground text-sm">
        © 2026 Luma Piel. Todos los derechos reservados.
      </footer>
    </main>
  )
}
