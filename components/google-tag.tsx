import Script from "next/script";
import { GOOGLE_ADS_TAG_ID } from "@/lib/google-ads";

/**
 * Etiqueta de Google (gtag.js) para medir conversiones de Google Ads.
 * Solo se carga en produccion: en desarrollo ensuciaria los datos de la cuenta.
 */
export function GoogleTag() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_TAG_ID}');`}
      </Script>
    </>
  );
}
