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
import { GoogleTag } from "@/components/google-tag";
import { ConversionTracking } from "@/components/conversion-tracking";

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
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Luma Piel",
    title: "Luma Piel — Dermatología y láser en Palermo",
    description:
      "Dermatología integral, estética médica y tratamientos láser en Palermo, CABA. Consultas personalizadas y tecnología médica.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luma Piel — Dermatología y láser en Palermo",
    description:
      "Dermatología integral, estética médica y tratamientos láser en Palermo, CABA. Consultas personalizadas y tecnología médica.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/icon.svg"],
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
        <GoogleTag />
        <ConversionTracking />
      </body>
    </html>
  );
}
