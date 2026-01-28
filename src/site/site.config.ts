import type { SiteConfig } from "@cpp/config";
import faqData from "@/data/faq.json";

const RAW_MODE = process.env.NEXT_PUBLIC_SITE_MODE;
const MODE = RAW_MODE === "registry" ? "registry" : "marketing";

// Metadata is injected by generate_sites.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta = (faqData as any).metadata || {};
const code = meta.courseCode || process.env.NEXT_PUBLIC_COURSE_CODE || "COURSE_CODE";
const tld = process.env.NEXT_PUBLIC_TLD || ".com.au";
const domain = `${code.toLowerCase()}${tld}`;

export const SITE: SiteConfig = {
    org: process.env.NEXT_PUBLIC_ORG_NAME || "VetIntel",
    siteKey: (process.env.NEXT_PUBLIC_COURSE_CODE || code).toLowerCase(),
    domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || domain,
    answersDomain: process.env.NEXT_PUBLIC_ANSWERS_DOMAIN || `answers.${process.env.NEXT_PUBLIC_SITE_DOMAIN || domain}`,
    mode: MODE,
    course: {
        code: process.env.NEXT_PUBLIC_COURSE_CODE || code,
        name: process.env.NEXT_PUBLIC_COURSE_NAME || meta.title || `Course ${code}`,
        vertical: process.env.NEXT_PUBLIC_VERTICAL || meta.vertical || "vocational",
    },
    regulators: {
        nsw: process.env.NEXT_PUBLIC_REGULATOR_NSW || "NSW Fair Trading",
        vic: process.env.NEXT_PUBLIC_REGULATOR_VIC || "Consumer Affairs Victoria"
    },
    brand: {
        primary: process.env.NEXT_PUBLIC_BRAND_PRIMARY || meta.primaryColor || "#0D1995",
        accent: process.env.NEXT_PUBLIC_BRAND_ACCENT || "#F5B733"
    },
    socialLinks: {
        twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
        github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    },
};
