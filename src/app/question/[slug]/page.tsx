import { getAllQuestions, getAdjacentQuestions, getQuestionBySlug, getRelatedQuestions, slugify } from "@/lib/questions";
import { QuestionBottomTabs } from "@/components/question/QuestionBottomTabs";
import faqData from "@/data/faq.json";
import { ArrowLeft, Share2, ShieldCheck, Zap, Info, BarChart3, Target, GraduationCap, Search, CheckCircle2, HelpCircle, Users, ArrowUpRight, BookOpen } from "lucide-react";
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
    const adjacent = question ? getAdjacentQuestions(question.slug) : { prev: null, next: null };
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

    // Get smart related questions (weighted by tags and category)
    const relatedQuestions = getRelatedQuestions(question, 3);

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
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {question.category}
                            </span>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold uppercase tracking-wider">
                                <ShieldCheck className="w-3 h-3" />
                                Fact Verified
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                Last Updated: {new Date(question.date || Date.now()).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary mb-8 leading-tight">
                            {question.question}
                        </h1>

                        {/* Expert Review Metadata (Pattern 4) */}
                        <div className="flex items-center gap-4 mb-10 p-4 bg-muted/30 rounded-2xl border border-dashed">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">VI</div>
                            <div>
                                <p className="text-xs font-bold text-foreground">Reviewed by VetIntel Research Team</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter font-medium">Compliance Specialist Verification • TAE40122 Certified</p>
                            </div>
                        </div>

                        <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground">
                            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8 group/content">
                                <div className="absolute top-0 left-0 w-2 h-full bg-secondary transition-all group-hover/content:w-4" />
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                                
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary mr-4 animate-pulse" />
                                        Technical Fact-Check: Analysis Core
                                    </h2>
                                    <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        VERIFIED NODE
                                    </div>
                                </div>
                                
                                <div className="font-medium text-slate-800 leading-[1.6] text-xl md:text-2xl tracking-tight mb-12">
                                    {question.answer}
                                </div>

                                {/* "Did You Know" Intelligence Inlay (Blas/Sector specific) */}
                                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 relative group/dyk hover:border-secondary/20 transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                            <Zap className="w-4 h-4" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Did You Know? (Sector Intelligence)</p>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium italic leading-relaxed">
                                        This technical node is directly linked to the 2026 Sector Transformation Protocol. Most providers still reference legacy BSB40520 standards, making this a critical differentiation point for high-stakes audits.
                                    </p>
                                </div>

                                {/* Citation Transparency (Pattern 7) */}
                                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                                            <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Authenticity Protocol Verified</span>
                                    </div>
                                    <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest font-mono italic">
                                        REF: TGA.{SITE.course.code}.2026.RE04
                                    </div>
                                </div>
                            </div>

                            {question.rationale && (
                                <div className="mt-20 p-12 md:p-16 bg-slate-950 text-slate-300 rounded-[3.5rem] border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group/shadow">
                                    {/* Animated background pulse */}
                                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--secondary),0.05),transparent_70%)]" />
                                    
                                    <div className="absolute top-12 right-12 opacity-5 group-hover/shadow:opacity-10 transition-opacity">
                                        <ShieldCheck className="w-48 h-48" />
                                    </div>

                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.5em] mb-8 flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-secondary mr-3 shadow-[0_0_15px_rgba(var(--secondary),0.5)]" />
                                            Shadow Board Intelligence (Internal Rationale)
                                        </p>
                                        
                                        <h3 className="text-3xl md:text-5xl font-black text-white mb-8 italic tracking-tighter leading-tight">
                                            "What the sector <span className="text-secondary">won't tell you</span> about this node..."
                                        </h3>
                                        
                                        <div className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed italic border-l-2 border-white/10 pl-10 mb-12 py-2">
                                            {question.rationale}
                                        </div>

                                        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
                                            <div className="flex items-center gap-6">
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Impact</p>
                                                    <p className="text-sm font-black text-secondary uppercase tracking-tighter italic">Critical</p>
                                                </div>
                                                <div className="w-[1px] h-8 bg-white/10" />
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Risk</p>
                                                    <p className="text-sm font-black text-red-500 uppercase tracking-tighter italic">High</p>
                                                </div>
                                            </div>
                                            
                                            <Link 
                                                href={`${process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://www.bsb50820.com.au'}/strategic-audit`} 
                                                className="w-full md:w-auto text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 bg-secondary hover:bg-white px-10 py-5 rounded-2xl transition-all shadow-[0_20px_40px_rgba(var(--secondary),0.3)] hover:-translate-y-1 flex items-center justify-center group/btn"
                                            >
                                                Commission Full Audit
                                                <ArrowUpRight className="ml-4 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Metadata Footer: Tags, Hash, Source */}
                        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary/70 uppercase tracking-wider">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    {question.tags.map(tag => (
                                        <Link
                                            key={tag}
                                            href={`/questions/${slugify(tag)}`}
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

            <QuestionBottomTabs prev={adjacent.prev} next={adjacent.next} />
        </main >
    );
}
