import React from 'react';
import { DataLoader } from '@/lib/DataLoader';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateArticleSchema } from '@/lib/schema';
import Script from 'next/script';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = DataLoader.getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    return {
        title: `Blog: ${slug}`,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const rawContent = DataLoader.loadPost(slug);

    if (!rawContent) {
        notFound();
    }

    // Naive frontmatter parsing
    const titleMatch = rawContent.match(/title:\s*"(.*?)"/);
    const descMatch = rawContent.match(/description:\s*"(.*?)"/);
    const dateMatch = rawContent.match(/date:\s*"(.*?)"/);

    const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');
    const description = descMatch ? descMatch[1] : "Guide for " + title;
    const datePublished = dateMatch ? dateMatch[1] : new Date().toISOString();

    const articleSchema = generateArticleSchema({
        headline: title,
        description: description,
        datePublished: datePublished,
        slug: slug
    });

    const contentBody = rawContent.replace(/---[\s\S]*?---/, '').trim();

    return (
        <main className="min-h-screen bg-white py-12">
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <article className="container mx-auto px-4 max-w-3xl prose lg:prose-xl">
                <Link href="/" className="no-underline text-blue-600 hover:text-blue-800 mb-8 inline-block">← Back to Home</Link>

                <h1 className="capitalize mb-4">{title}</h1>
                <p className="text-xl text-slate-600 mb-8 not-prose border-l-4 border-blue-500 pl-4 italic">
                    {description}
                </p>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-8 not-prose">
                    <strong>Dev Note:</strong> MDX Rendering is not yet configured. Displaying raw source below.
                </div>

                <pre className="whitespace-pre-wrap bg-slate-50 p-6 rounded-lg text-sm text-slate-800">
                    {contentBody}
                </pre>
            </article>
        </main>
    );
}
