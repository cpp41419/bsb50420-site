import { siteConfig } from "@/config/site";

// Helper for absolute URLs
const abs = (path: string) =>
  path.startsWith("http") ? path : `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;

export function buildSiteGraph() {
  const domain = siteConfig.url; // e.g. https://answers.bsb50820.com.au
  const orgId = `${domain}/#org`;
  const websiteId = `${domain}/#website`;
  const brandName = siteConfig.name;

  const graph: any[] = [
    {
      "@type": "Organization",
      "@id": orgId,
      "name": brandName,
      "url": domain + "/",
      "logo": {
        "@type": "ImageObject",
        "url": abs("/apple-touch-icon.png"), // Standardised path
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      "url": domain + "/",
      "name": brandName,
      "publisher": { "@id": orgId },
      "potentialAction": {
          "@type": "SearchAction",
          "target": `${domain}/questions/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
      },
    },
  ];

  return { "@context": "https://schema.org", "@graph": graph };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };
}
