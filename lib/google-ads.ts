/** Identificadores de Google Ads de la cuenta 242-411-7364 (Luma Piel). */

export const GOOGLE_ADS_TAG_ID = "AW-18419111160";

export const GOOGLE_ADS_CONVERSIONS = {
  whatsapp: "AW-18419111160/DIiDCOSO8OocEPip9c5E",
  reserva: "AW-18419111160/URw6COeO8OocEPip9c5E",
  telefono: "AW-18419111160/0lw0CPLV8OocEPip9c5E",
} as const;

export type ConversionKey = keyof typeof GOOGLE_ADS_CONVERSIONS;
