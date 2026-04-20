import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const nm = (...segments) => path.join(projectRoot, "node_modules", ...segments)

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Turbopack: raíz absoluta del app + alias de paquetes CSS.
   * Sin esto, `@import 'tailwindcss'` puede resolverse desde la carpeta padre
   * (`.../Desktop/Projects`) cuando existe un `package.json` en el home del usuario,
   * lo que dispara errores en bucle y satura CPU/RAM en `next dev`.
   */
  turbopack: {
    root: path.resolve(projectRoot),
    resolveAlias: {
      tailwindcss: nm("tailwindcss"),
      "@tailwindcss/postcss": nm("@tailwindcss/postcss"),
      "@tailwindcss/typography": nm("@tailwindcss/typography"),
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: nm("tailwindcss"),
      "@tailwindcss/postcss": nm("@tailwindcss/postcss"),
      "@tailwindcss/typography": nm("@tailwindcss/typography"),
    }
    return config
  },
}

export default nextConfig
