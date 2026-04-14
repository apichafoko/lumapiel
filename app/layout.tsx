import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Luma Piel - Dermatología Funcional y Láser",
  description:
    "Próximamente - Dermatología funcional y tratamientos láser de última generación",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn(plusJakartaSans.variable, geistMono.variable)}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
