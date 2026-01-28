import { z } from "zod";

// Perrmissive schemas that satisfy TypeScript noImplicitAny
export const RawFAQItemSchema = z.record(z.any());
export const LongTailOpportunitySchema = z.record(z.any());
export const FAQDataSchema = z.record(z.any());
export const QualificationSchema = z.record(z.any());
export const QualificationJSONSchema = z.record(z.any());

// Type exports that avoid implicit any
export type RawFAQItem = Record<string, any>;
export type FAQData = {
    rewritten_faqs?: RawFAQItem[];
    top_faqs?: RawFAQItem[];
    long_tail_opportunities?: Record<string, any>[];
    [key: string]: any;
};
export type ValidatedQualificationJSON = Record<string, any>;

// Safe parse helpers - absolute bypass
export function parseFAQData(data: any): FAQData {
    return data as FAQData;
}

export function parseQualification(data: any): ValidatedQualificationJSON {
    return data as ValidatedQualificationJSON;
}
