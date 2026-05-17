import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { cn } from "@/lib/utils";
import { WebsiteJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/constants";
import { SanityLive } from "@/lib/sanity/live";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luma Piel — Dermatología y láser",
    template: "%s · Luma Piel",
  },
  description:
    "Dermatología integral y estética clínica en Palermo, CABA. Consultas, tratamientos y tecnología láser con enfoque profesional.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html
      lang="es"
      className={cn(
        plusJakartaSans.variable,
        fraunces.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body className="font-sans antialiased">
        <WebsiteJsonLd />
        {children}
        <SanityLive />
        {isDraft ? <VisualEditing /> : null}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
