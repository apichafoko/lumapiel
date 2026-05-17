import type { PortableTextBlock } from "@portabletext/types";
import type { HubProcedureBlock, HubRecord, ServiceRecord } from "@/lib/content/schema";

export type SanityServiceDoc = {
  _id: string;
  legacyId: string;
  slug_es: string;
  tipo: "tratamiento" | "consulta";
  lista: "tratamientos" | "consultas";
  titulo: string;
  categorias: string;
  aliases: string;
  hubRefs: string;
  relatedServiceIds: string;
  hubPinRank: number;
  published: boolean;
  duracionMinutos?: number;
  queEsExcerpt?: string | null;
  body?: PortableTextBlock[] | null;
};

export type SanityHubDoc = HubRecord & {
  description: PortableTextBlock[] | null;
  sections: Array<{
    anchor: string;
    title: string;
    body: PortableTextBlock[] | null;
  }>;
  procedureBlocks?: HubProcedureBlock[];
};

export type HomePageContent = {
  hero: {
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  pillars: Array<{
    title: string;
    body: string;
    href: string;
    linkLabel: string;
    supportLine?: {
      prefix: string;
      linkText: string;
      href: string;
    };
  }>;
  howWeWork?: {
    sectionTitle: string;
    almaLaserHref: string;
    steps: Array<{
      id: string;
      stepLabel: string;
      title: string;
      body: string;
      linkAlmaInBody?: boolean;
    }>;
  };
  frequentConsults: {
    title: string;
    intro: string;
    cards: Array<{
      id: string;
      title: string;
      body: string;
      href: string;
      linkLabel: string;
    }>;
  };
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

export type SanityPersonDoc = {
  slug: string;
  role: "doctora" | "cosmetologa";
  displayName?: string;
  jobTitle?: string;
  seoDescription?: string;
  body?: PortableTextBlock[] | null;
};

export type SanityLegalDoc = {
  slug: string;
  title: string;
  body?: PortableTextBlock[] | null;
};

export type ServiceWithBody = ServiceRecord & {
  body?: PortableTextBlock[] | null;
  queEsPreview: string | null;
};
