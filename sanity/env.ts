export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export function assertSanityEnv(): { projectId: string; dataset: string } {
  if (!projectId) {
    throw new Error(
      "Falta NEXT_PUBLIC_SANITY_PROJECT_ID. Creá un proyecto en sanity.io, copiá .env.example a .env.local y ejecutá npm run migrate:content.",
    );
  }
  return { projectId, dataset };
}
