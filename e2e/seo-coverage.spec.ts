import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

function getTestPaths(): string[] {
    try {
        const faqPath = path.join(process.cwd(), "src/data/faq.json");
        if (fs.existsSync(faqPath)) {
            const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
            return faqData.long_tail_opportunities
                .filter((q: any) => q.proposed_question)
                .map((q: any) => slugify(q.proposed_question))
                .slice(0, 5);
        }
        return [];
    } catch (error) {
        console.warn("Could not retrieve slugs:", error);
        return [];
    }
}

test.describe("SEO & UX Architecture Analysis", () => {
    const slugs = getTestPaths();

    for (const slug of slugs) {
        test(`Analyze /question/${slug}`, async ({ page }) => {
            const url = `${BASE_URL}/question/${slug}`;
            console.log(`\n🔍 Analyzing: ${url}`);

            await page.goto(url, { waitUntil: "networkidle" });

            const schemaAnalysis = await page.evaluate(() => {
                const schemas: any[] = [];
                document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
                    try {
                        const parsed = JSON.parse(script.textContent || "{}");
                        if (Array.isArray(parsed)) {
                            schemas.push(...parsed);
                        } else {
                            schemas.push(parsed);
                        }
                    } catch (e) { }
                });

                const types = new Set(schemas.map(s => s["@type"]));
                const completeness = {
                    qaPage: false,
                    breadcrumb: false,
                    howTo: false,
                    organization: false
                };

                const qa = schemas.find(s => s["@type"] === "QAPage");
                if (qa && qa.mainEntity && qa.mainEntity.name && qa.mainEntity.acceptedAnswer) {
                    completeness.qaPage = true;
                }

                const breadcrumb = schemas.find(s => s["@type"] === "BreadcrumbList");
                if (breadcrumb && Array.isArray(breadcrumb.itemListElement) && breadcrumb.itemListElement.length > 0) {
                    completeness.breadcrumb = true;
                }

                if (types.has("HowTo")) completeness.howTo = true;
                if (types.has("Organization")) completeness.organization = true;

                return { types: Array.from(types), completeness };
            });

            console.log(`   Schema Types: ${schemaAnalysis.types.join(", ")}`);
            expect(schemaAnalysis.types).toContain("QAPage");
            expect(schemaAnalysis.completeness.qaPage).toBeTruthy();
            expect(schemaAnalysis.types).toContain("BreadcrumbList");

            const structureAnalysis = await page.evaluate(() => {
                const detailsCount = document.querySelectorAll('details > summary').length;
                const radixAccordionCount = document.querySelectorAll('[data-state][data-orientation]').length;
                return { detailsCount, radixAccordionCount };
            });

            const answerMetrics = await page.evaluate(() => {
                const answerEl = document.querySelector('.prose');
                const text = answerEl?.textContent || "";
                return {
                    wordCount: text.split(/\s+/).length,
                    hasHeading: !!answerEl?.querySelector('h1, h2, h3')
                };
            });
            console.log(`   Content Length: ${answerMetrics.wordCount} words`);
            expect(answerMetrics.wordCount).toBeGreaterThan(30);

            const performanceMetrics = await page.evaluate(async () => {
                const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
                return {
                    ttfb: navEntry.responseStart - navEntry.requestStart,
                    loadTime: navEntry.loadEventEnd - navEntry.startTime,
                    domInteractive: navEntry.domInteractive
                };
            });
            console.log(`   Load Time: ${Math.round(performanceMetrics.loadTime)}ms`);

            expect(performanceMetrics.loadTime).toBeLessThan(5000);

            const score = {
                seo: (schemaAnalysis.completeness.qaPage ? 40 : 0) + (schemaAnalysis.completeness.breadcrumb ? 20 : 0),
                content: (answerMetrics.wordCount > 50 ? 30 : 15),
                ux: (performanceMetrics.loadTime < 1500 ? 10 : 5)
            };
            const totalScore = score.seo + score.content + score.ux;
            console.log(`   Effectiveness Score: ${totalScore}/100`);

            expect(totalScore).toBeGreaterThan(60);
        });
    }
});
