import "server-only";

export const readToken = process.env.SANITY_API_READ_TOKEN;

export function getReadToken(): string | undefined {
  return readToken;
}
