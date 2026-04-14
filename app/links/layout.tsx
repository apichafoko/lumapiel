import type { Metadata } from "next"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  robots: { index: true, follow: true },
}

export default function LinksLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Toaster richColors position="top-center" />
    </>
  )
}
