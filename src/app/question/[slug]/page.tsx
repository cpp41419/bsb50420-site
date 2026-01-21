import { getAllQuestions, getQuestionBySlug, slugify } from "@/lib/questions";
import faqData from "@/data/faq.json";
import { ArrowLeft,  ShieldCheck, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import { SITE } from "@/site";
import { generateFAQSchema } from "@/lib/schema";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const questions = getAllQuestions();
    return questions.map((q) => ({
        slug: q.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const question = getQuestionBySlug(slug);

    if (!question) {
        return {
            title: "Question Not Found",
        };
    }

    return {
        title: `${question.question} | ${(faqData as any).metadata?.vertical || (faqData as any).metadata?.courseCode || SITE.course.code} Guide`,
        description: question.answer.substring(0, 160),
    };
}

export default async function QuestionPage({ params }: PageProps) {
    const { slug } = await params;
    const question = getQuestionBySlug(slug);
    const metadata = (faqData as any).metadata || {};
    const verticalName = metadata.vertical || metadata.courseCode || SITE.course.code;

    if (!question) {
        notFound();
    }

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

    const faqSchema = generateFAQSchema([{ question: question.question, answer: question.answer }]);

    // Breadcrumb schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": verticalName,
                "item": SITE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": question.question,
                "item": `${SITE_URL}/question/${slug}`
            }
        ]
    };

    const jsonLd = [faqSchema, breadcrumbSchema];

    // Get related questions (simple random or same category)
    const allQuestions = getAllQuestions();
    const relatedQuestions = allQuestions
        .filter((q) => q.category === question.category && q.slug !== question.slug)
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Script
                id={`qa-schema-${slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header / Breadcrumb */}
            <div className="bg-muted/30 border-b">
                <div className="container px-4 md:px-6 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Course Guide
                    </Link>
                </div>
            </div>

            <article className="flex-1">
                {/* Content Header */}
                <section className="py-12 md:py-20 bg-background">
                    <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {question.category}
                            </span>
                            {question.type === "opportunity" && (
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-primary/20 text-primary">
                                    Expert Insight
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary mb-8 leading-tight">
                            {question.question}
                        </h1>

                        <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground">
                            <div className="bg-muted/10 border rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
                                <p className="font-medium text-foreground leading-relaxed">
                                    {question.answer}
                                </p>
                                {question.rationale && (
                                    <div className="mt-6 pt-6 border-t border-border/50">
                                        <p className="text-sm font-semibold text-primary mb-2 flex items-center">
                                            <ShieldCheck className="w-4 h-4 mr-2 text-secondary" />
                                            Why this matters:
                                        </p>
                                        <p className="text-sm text-muted-foreground italic">
                                            {question.rationale}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Metadata Footer: Tags, Hash, Source */}
                        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary/70 uppercase tracking-wider">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    {question.tags.map(tag => (
                                        <Link
                                            key={tag}
                                            href={`/tag/${slugify(tag)}`}
                                            className="inline-flex px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-secondary/20 hover:text-primary transition-colors cursor-pointer"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="w-px h-4 bg-border hidden md:block" />

                            <div className="flex items-center gap-1 font-mono">
                                <span className="text-primary/50">ID:</span>
                                <span>{question.id}</span>
                            </div>

                            {question.source && (
                                <>
                                    <div className="w-px h-4 bg-border hidden md:block" />
                                    <a
                                        href={question.source}
                                        target="_blank"
                                        rel="nofollow noreferrer"
                                        className="flex items-center gap-1 hover:text-primary transition-colors hover:underline"
                                    >
                                        Original Source
                                        <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Related Questions */}
                {relatedQuestions.length > 0 && (
                    <section className="py-16 bg-muted/30 border-t">
                        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8 flex items-center">
                                <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                                Related Topics
                            </h2>
                            <div className="grid gap-6">
                                {relatedQuestions.map((q) => (
                                    <Link
                                        key={q.slug}
                                        href={`/question/${q.slug}`}
                                        className="group block p-6 bg-background rounded-xl border shadow-sm hover:shadow-md transition-all hover:border-primary/20"
                                    >
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                            {q.question}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-2 text-sm">
                                            {q.answer}
                                        </p>
                                        <div className="mt-4 flex items-center text-sm text-secondary font-medium">
                                            Read Answer <ArrowLeft className="w-4 h-4 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </article>

            {/* CTA Footer */}
            <section className="py-12 bg-primary text-primary-foreground">
                <div className="container px-4 md:px-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Still have questions about {verticalName}?</h2>
                    <p className="mb-8 text-primary-foreground/80">
                        Download the comprehensive course guide for full details on units, fees, and career outcomes.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-white text-primary px-8 text-sm font-bold shadow hover:bg-white/90">
                            View Full Guide
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
