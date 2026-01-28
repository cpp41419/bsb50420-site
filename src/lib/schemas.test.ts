import { describe, it, expect } from 'vitest';
import {
    parseFAQData,
    parseQualification,
    FAQDataSchema,
    QualificationJSONSchema,
    RawFAQItemSchema,
} from './schemas';

describe('RawFAQItemSchema', () => {
    it('validates a valid FAQ item', () => {
        const valid = {
            question: "What is this course?",
            answer: "It teaches you skills.",
            category: "Overview",
            sentiment: "positive",
        };
        const result = RawFAQItemSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });

    it('rejects empty question', () => {
        const invalid = {
            question: "",
            answer: "Some answer",
        };
        const result = RawFAQItemSchema.safeParse(invalid);
        expect(result.success).toBe(false);
    });

    it('rejects missing answer', () => {
        const invalid = {
            question: "A question?",
        };
        const result = RawFAQItemSchema.safeParse(invalid);
        expect(result.success).toBe(false);
    });
});

describe('FAQDataSchema', () => {
    it('validates FAQ data with rewritten_faqs', () => {
        const valid = {
            rewritten_faqs: [
                { question: "Q1", answer: "A1" },
                { question: "Q2", answer: "A2" },
            ],
            metadata: {
                course_code: "BSB40520",
            },
        };
        const result = FAQDataSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });

    it('validates FAQ data with top_faqs (legacy format)', () => {
        const valid = {
            top_faqs: [
                { question: "Q1", answer: "A1" },
            ],
        };
        const result = FAQDataSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });

    it('validates FAQ data with long_tail_opportunities', () => {
        const valid = {
            rewritten_faqs: [{ question: "Q", answer: "A" }],
            long_tail_opportunities: [
                { proposed_question: "PQ", proposed_answer: "PA" },
            ],
        };
        const result = FAQDataSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });
});

describe('parseFAQData', () => {
    it('parses valid FAQ data', () => {
        const data = {
            rewritten_faqs: [
                { question: "What is X?", answer: "X is Y." },
            ],
        };
        const result = parseFAQData(data);
        expect(result).not.toBeNull();
        expect(result?.rewritten_faqs).toHaveLength(1);
    });

    it('handles array input (direct FAQ list)', () => {
        const data = [
            { question: "Q1", answer: "A1" },
            { question: "Q2", answer: "A2" },
        ];
        const result = parseFAQData(data);
        expect(result).not.toBeNull();
        expect(result?.rewritten_faqs).toHaveLength(2);
    });

    it('returns null for invalid data and logs warning', () => {
        const invalid = { invalid: "structure" };
        const result = parseFAQData(invalid);
        expect(result).toBeNull();
    });

    it('returns null for null input', () => {
        const result = parseFAQData(null);
        expect(result).toBeNull();
    });
});

describe('QualificationJSONSchema', () => {
    it('validates complete qualification data', () => {
        const valid = {
            qualification: {
                code: "BSB40520",
                name: "Certificate IV in Leadership and Management",
                training_package: "BSB",
                status: "current",
                regulator: "ASQA",
            },
            metadata: {
                title: "Leadership Course",
                description: "Learn leadership skills",
            },
        };
        const result = QualificationJSONSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });

    it('rejects missing qualification.code', () => {
        const invalid = {
            qualification: {
                name: "Some Course",
                training_package: "BSB",
                status: "current",
                regulator: "ASQA",
            },
        };
        const result = QualificationJSONSchema.safeParse(invalid);
        expect(result.success).toBe(false);
    });

    it('allows additional properties (passthrough)', () => {
        const withExtra = {
            qualification: {
                code: "BSB40520",
                name: "Test",
                training_package: "BSB",
                status: "current",
                regulator: "ASQA",
            },
            custom_field: "should be preserved",
        };
        const result = QualificationJSONSchema.safeParse(withExtra);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.custom_field).toBe("should be preserved");
        }
    });
});

describe('parseQualification', () => {
    it('parses valid qualification', () => {
        const data = {
            qualification: {
                code: "FNS50322",
                name: "Diploma of Finance",
                training_package: "FNS",
                status: "current",
                regulator: "ASQA",
            },
        };
        const result = parseQualification(data);
        expect(result).not.toBeNull();
        expect(result?.qualification.code).toBe("FNS50322");
    });

    it('returns null for invalid qualification', () => {
        const invalid = { not: "qualification data" };
        const result = parseQualification(invalid);
        expect(result).toBeNull();
    });
});
