"use client";

import dynamic from "next/dynamic";
import config from "../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false, loading: () => <p>Cargando Studio…</p> },
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
