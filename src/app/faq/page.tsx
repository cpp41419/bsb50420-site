import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SITE } from "@/site";
import { getAllQuestions } from "@/lib/questions";
import { getManifest } from "@/content/getManifest";

export const metadata: Metadata = {
  title: `${SITE.course.code} FAQ | Frequently Asked Questions`,
  description: `Get answers to common questions about ${SITE.course.code} ${SITE.course.name} - entry requirements, costs, licensing, career outcomes, and choosing the right RTO.`,
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  const manifest = getManifest();
  const allFaqs = getAllQuestions((manifest as any).faq || { rewritten_faqs: [] });

  // Group FAQs by category
  const faqsByCategory = allFaqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, typeof allFaqs>);

  const categories = Object.keys(faqsByCategory);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {SITE.course.code} Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about {SITE.course.name} training,
          licensing requirements, and career pathways.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="space-y-8">
          {categories.map((category) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
                <CardDescription>
                  {faqsByCategory[category].length} questions in this category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqsByCategory[category].map((faq, index) => (
                    <AccordionItem key={faq.id || index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <p>No FAQs available yet. Check back soon!</p>
          </CardContent>
        </Card>
      )}

      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
