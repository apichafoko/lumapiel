import { defineLive } from "next-sanity/live";
import { client } from "@/lib/sanity/client";
import { getReadToken } from "@/lib/sanity/token";

const serverToken = getReadToken();

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: serverToken ?? false,
  browserToken: serverToken ?? false,
});
