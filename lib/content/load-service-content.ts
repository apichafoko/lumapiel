/**
 * @deprecated El cuerpo de las fichas vive en Sanity (`service.body`).
 * Usar getServiceBySlug() desde load-services.ts.
 */
export async function getServiceContent(_slug: string): Promise<string | null> {
  return null;
}
