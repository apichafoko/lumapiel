import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBookingUrl, getSiteConfig } from "@/lib/site-config";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = getSiteConfig();
  const bookingUrl = getBookingUrl();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader site={site} bookingUrl={bookingUrl} />
      <main className="flex-1">{children}</main>
      <SiteFooter site={site} />
    </div>
  );
}
