import type { Metadata } from "next";
import { LinksHub } from "@/components/links-hub";
import { getLinksConfig, resolveShareUrl } from "@/lib/links-config";

export async function generateMetadata(): Promise<Metadata> {
  const cfg = getLinksConfig();
  const share = await resolveShareUrl();
  const title = `${cfg.brandName} — Enlaces`;
  const description = cfg.tagline ?? `Enlaces oficiales de ${cfg.brandName}.`;

  return {
    title,
    description,
    alternates: share ? { canonical: share } : undefined,
    openGraph: {
      title,
      description,
      url: share ?? undefined,
      type: "website",
    },
  };
}

export default function LinksPage() {
  return <LinksHub />;
}
