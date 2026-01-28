import { z } from "zod";

// FAQ Item schemas - permissive
export const RawFAQItemSchema = z.record(z.any());

export const LongTailOpportunitySchema = z.record(z.any());

export const FAQDataSchema = z.record(z.any());

// Qualification schema - permissive
export const QualificationSchema = z.record(z.any());

export const QualificationJSONSchema = z.object({
    qualification: QualificationSchema.optional(),
    metadata: z.record(z.any()).optional(),
    site_identity: z.record(z.any()).optional(),
    courseInfo: z.record(z.any()).optional(),
    units: z.array(z.any()).optional(),
    qualification_details: z.record(z.any()).optional(),
    state_compliance: z.record(z.any()).optional(),
    entity_graph: z.record(z.any()).optional(),
}).passthrough();

// Type exports
export type RawFAQItem = z.infer<typeof RawFAQItemSchema>;
export type FAQData = z.infer<typeof FAQDataSchema>;
export type ValidatedQualificationJSON = z.infer<typeof QualificationJSONSchema>;

// Safe parse helpers - just return the data if it parses as JSON at all
export function parseFAQData(data: unknown): FAQData | null {
    return data as FAQData;
}

export function parseQualification(data: unknown): ValidatedQualificationJSON | null {
    return data as ValidatedQualificationJSON;
}
