export type StateCode = "nsw" | "vic" | "qld" | "wa" | "sa" | "tas" | "act" | "nt";

export type SiteMode = "marketing" | "registry";

export type SiteConfig = {
    org: string;
    siteKey: string;
    domain: string;
    answersDomain?: string;
    mode: SiteMode;
    course: { code: string; name: string; vertical: string };
    regulators?: Partial<Record<StateCode, string>>;
    brand?: { primary: string; accent: string };
    socialLinks: {
        twitter?: string;
        github?: string;
    };
    marketingCopy?: {
        heroSubtitle?: string;
        ctaHeadline?: string;
        ctaSubtitle?: string;
    };
    marketStats?: {
        providerCount?: number;
        priceRange?: string;
        riskLevel?: string;
    };
};

export interface ManifestSchema {
    home: { headline: string };
    links: { methodology: string; appeal: string };
    faq?: {
        rewritten_faqs: Array<{
            question: string;
            answer: string;
            category?: string;
            sentiment?: string;
        }>;
    };
}

export interface QualificationJSON {
    qualification: {
        code: string;
        name: string;
        training_package: string;
        status: string; // e.g. "current"
        regulator: string;
    };
    site_identity: {
        role: string;
        scope: string;
        positioning: string;
    };
    scope_exclusion?: string;
    market_snapshot: {
        provider_count: number;
        price_range_aud: {
            min: number;
            max: number;
        };
        risk_level: string; // e.g. "moderate"
    };
    primary_action: {
        type: string;
        label: string;
    };
    last_updated: string;
    data_source: string;
}
