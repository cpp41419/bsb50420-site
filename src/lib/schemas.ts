import { z } from "zod";

// FAQ Item schemas
export const RawFAQItemSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    category: z.string().optional(),
    sentiment: z.string().optional(),
    original_source: z.string().optional(),
});

export const LongTailOpportunitySchema = z.object({
    proposed_question: z.string().optional(),
    question: z.string().optional(),
    proposed_answer: z.string().optional(),
    answer: z.string().optional(),
    topic: z.string().optional(),
    intent_specificity: z.string().optional(),
    rationale: z.string().optional(),
}).refine(
    (data) => data.proposed_question || data.question,
    { message: "Either proposed_question or question is required" }
);

export const FAQDataSchema = z.object({
    rewritten_faqs: z.array(RawFAQItemSchema).optional(),
    top_faqs: z.array(RawFAQItemSchema).optional(),
    long_tail_opportunities: z.array(LongTailOpportunitySchema).optional(),
    longtail_opportunities: z.array(LongTailOpportunitySchema).optional(),
    metadata: z.object({
        course_code: z.string().optional(),
        generated_at: z.string().optional(),
    }).optional(),
}).refine(
    (data) => data.rewritten_faqs || data.top_faqs || Array.isArray(data),
    { message: "FAQ data must contain rewritten_faqs, top_faqs, or be an array" }
);

// Qualification schema
export const QualificationSchema = z.object({
    code: z.string().min(1),
    name: z.string().min(1),
    training_package: z.string(),
    status: z.string(),
    regulator: z.string(),
});

export const QualificationJSONSchema = z.object({
    qualification: QualificationSchema,
    metadata: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        courseCode: z.string().optional(),
        vertical: z.string().optional(),
        primaryColor: z.string().optional(),
    }).optional(),
    site_identity: z.object({
        role: z.string(),
        scope: z.string(),
        positioning: z.string(),
    }).optional(),
    courseInfo: z.object({
        overview: z.string(),
        personas: z.array(z.object({
            title: z.string(),
            description: z.string(),
        })),
        entryRequirements: z.array(z.string()),
        duration: z.string(),
        studyModes: z.string(),
        costs: z.object({
            average: z.string(),
            range: z.string(),
            funding: z.array(z.string()),
        }),
        outcomes: z.array(z.string()),
        checklist: z.array(z.string()),
        riskRadar: z.object({
            title: z.string(),
            items: z.array(z.object({
                title: z.string(),
                description: z.string(),
                riskLevel: z.enum(["high", "medium", "low"]),
            })),
        }).optional(),
    }).optional(),
    units: z.array(z.object({
        code: z.string(),
        title: z.string(),
        type: z.string(),
        description: z.string(),
        evidence: z.string(),
    })).optional(),
}).passthrough(); // Allow additional properties

// Type exports
export type RawFAQItem = z.infer<typeof RawFAQItemSchema>;
export type FAQData = z.infer<typeof FAQDataSchema>;
export type ValidatedQualificationJSON = z.infer<typeof QualificationJSONSchema>;

// Safe parse helpers
export function parseFAQData(data: unknown): FAQData | null {
    // Handle array input (direct FAQ list)
    if (Array.isArray(data)) {
        const result = z.array(RawFAQItemSchema).safeParse(data);
        if (result.success) {
            return { rewritten_faqs: result.data };
        }
        console.warn("FAQ data validation failed:", result.error.format());
        return null;
    }

    const result = FAQDataSchema.safeParse(data);
    if (result.success) {
        return result.data;
    }
    console.warn("FAQ data validation failed:", result.error.format());
    return null;
}

export function parseQualification(data: unknown): ValidatedQualificationJSON | null {
    const result = QualificationJSONSchema.safeParse(data);
    if (result.success) {
        return result.data;
    }
    console.warn("Qualification validation failed:", result.error.format());
    return null;
}
