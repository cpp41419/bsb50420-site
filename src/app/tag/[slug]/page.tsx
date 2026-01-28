import { getAllTags, getQuestionsByTag } from "@/lib/questions";
import { FAQSection } from "@/components/FAQSection";
import faqData from "@/data/faq.json";
import { ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        slug: tag.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const allTags = getAllTags();
    const tagInfo = allTags.find(t => t.slug === slug);
    const verticalName = (faqData as any).metadata?.vertical || (faqData as any).metadata?.courseCode || "BSB40520";

    if (!tagInfo) {
        return { title: "Tag Not Found" };
    }

    return {
        title: `${tagInfo.name} Questions | ${verticalName}`,
        description: `Browse all ${tagInfo.count} questions related to ${tagInfo.name} for the ${verticalName} qualification.`,
    };
}

export default async function TagPage({ params }: PageProps) {
    const { slug } = await params;
    const allTags = getAllTags();
    const tagInfo = allTags.find(t => t.slug === slug);

    if (!tagInfo) {
        return notFound();
    }

    const questions = getQuestionsByTag(slug);
    const metadata = (faqData as any).metadata || {};
    const verticalName = metadata.vertical || metadata.courseCode || "BSB40520";

    return (
        <>
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

            <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1120_0%,#1e293b_100%)] z-0" />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                    <Tag className="w-64 h-64 rotate-12" />
                </div>

                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-start max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-8 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-backwards">
                            <Tag className="w-4 h-4 mr-2" />
                            Curated Topic Cluster
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
                            {tagInfo.name}
                        </h1>

                        <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-backwards">
                            Explore {questions.length} expert guides and answers regarding {tagInfo.name.toLowerCase()}.
                            A specialized collection for the {verticalName}.
                        </p>
                    </div>
                </div>
            </section>

            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-backwards">
                <FAQSection
                    items={questions}
                    title={`Common Questions about ${tagInfo.name}`}
                    description={`We have compiled the most comprehensive and up-to-date information available for ${tagInfo.name}, covering everything you need to know about this topic.`}
                    code={metadata.courseCode || "BSB40520"}
                />
            </div>
        </>
    );
}
