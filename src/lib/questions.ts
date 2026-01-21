import faqData from "@/data/faq.json";
// Better to use a simple JS hash function for compatibility

export interface FAQItem {
    id: string;
    slug: string;
    question: string;
    answer: string;
    category: string;
    tags: string[];
    source?: string;
    sentiment?: string;
    rationale?: string;
    type: "standard" | "opportunity";
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}

function generateHash(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).substring(0, 8);
}

export function getAllTags(): { slug: string; name: string; count: number }[] {
    const questions = getAllQuestions();
    const tagMap = new Map<string, { name: string; count: number }>();

    questions.forEach(q => {
        q.tags.forEach(tag => {
            if (!tag) return;
            const slug = slugify(tag);
            if (!tagMap.has(slug)) {
                tagMap.set(slug, { name: tag, count: 0 });
            }
            tagMap.get(slug)!.count++;
        });
    });

    return Array.from(tagMap.entries()).map(([slug, { name, count }]) => ({
        slug,
        name,
        count
    })).sort((a, b) => b.count - a.count);
}

export function getQuestionsByTag(tagSlug: string): FAQItem[] {
    const all = getAllQuestions();
    return all.filter(q => q.tags.some(tag => slugify(tag) === tagSlug));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAllQuestions(overrideData?: any): FAQItem[] {
    // Handle either rewritten_faqs (normalized), top_faqs (legacy), or direct Array (Swarm)
    const sourceData = overrideData || faqData;
    let rawFaqs = [];

    if (Array.isArray(sourceData)) {
        rawFaqs = sourceData;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rawFaqs = (sourceData.rewritten_faqs || (sourceData as any).top_faqs || []);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const standard = rawFaqs.map((item: any) => {
        const slug = slugify(item.question);
        return {
            id: generateHash(slug),
            slug: slug,
            question: item.question,
            answer: item.answer,
            category: item.category || "General",
            tags: [item.category, item.sentiment, "FAQ"].filter(Boolean),
            source: item.original_source,
            sentiment: item.sentiment,
            rationale: undefined,
            type: "standard" as const,
        };
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawOpportunities = ((faqData as any).long_tail_opportunities || (faqData as any).longtail_opportunities || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const opportunities = rawOpportunities.map((item: any) => {
        const slug = slugify(item.proposed_question || item.question);
        return {
            id: generateHash(slug),
            slug: slug,
            question: item.proposed_question || item.question,
            answer: item.proposed_answer || item.answer,
            category: "Expert Insights",
            tags: ["Expert Insights", item.topic || "Insight", item.intent_specificity || "General"].filter(Boolean),
            source: undefined,
            sentiment: item.intent_specificity || "Neutral",
            rationale: item.rationale,
            type: "opportunity" as const,
        };
    });

    // Deduplicate slugs
    const seen = new Set();
    const all = [...standard, ...opportunities].filter(item => {
        if (seen.has(item.slug)) return false;
        seen.add(item.slug);
        return true;
    });

    return all;
}

export function getQuestionBySlug(slug: string): FAQItem | undefined {
    const all = getAllQuestions();
    return all.find((item) => item.slug === slug);
}

export function getRelatedQuestions(currentQuestion: FAQItem, limit: number = 3): FAQItem[] {
    const all = getAllQuestions();

    // Scoring system:
    // +2 points for same category
    // +1 point for each shared tag
    // Exclude self

    const scored = all
        .filter(q => q.id !== currentQuestion.id)
        .map(q => {
            let score = 0;
            if (q.category === currentQuestion.category) score += 2;

            // Count shared tags
            const sharedTags = q.tags.filter(t => currentQuestion.tags.includes(t));
            score += sharedTags.length;

            return { question: q, score };
        })
        .filter(item => item.score > 0) // Must have some relationship
        .sort((a, b) => b.score - a.score); // Sort by highest score

    return scored.slice(0, limit).map(item => item.question);
}
