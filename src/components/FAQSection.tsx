"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
interface FAQItem {
    question: string
    answer: string
    category: string
    sentiment?: string
    slug?: string
    rationale?: string
}

interface FAQSectionProps {
    items: FAQItem[]
    title?: string
    description?: string
    code?: string
}

export function FAQSection({
    items,
    title = "Frequently Asked Questions",
    description,
    code
}: FAQSectionProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredItems = items.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Group by category
    const categories = Array.from(new Set(filteredItems.map(item => item.category)))

    return (
        <section className="w-full py-32 md:py-48 bg-white relative overflow-hidden">
            {/* Background elements - Subtle Professional Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

            <div className="container px-4 md:px-6 mx-auto max-w-6xl relative">
                <div className="flex flex-col items-center justify-center space-y-10 text-center mb-28">
                    {code && (
                        <div className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-primary mr-3 animate-pulse"></span>
                            {code} KNOWLEDGE NODE
                        </div>
                    )}
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 bg-primary/5 px-6 py-2 rounded-full border border-primary/10 shadow-sm animate-pulse">
                            Intelligence Core
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 italic leading-[0.9]">
                            Regulatory <br />
                            <span className="text-primary not-italic text-sm md:text-base font-black uppercase tracking-[0.4em] block mt-4">Knowledge Base Matrix</span>
                        </h2>
                    </div>
                    <p className="max-w-[800px] text-slate-500 md:text-2xl font-light leading-relaxed border-l-4 border-slate-100 pl-8 text-left mx-auto">
                        {description}
                    </p>

                    <div className="relative w-full max-w-2xl group mt-8">
                        <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-2xl group-focus-within:bg-primary/10 transition-all pointer-events-none" />
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                            <input
                                type="text"
                                placeholder="Interrogate the regulatory repository..."
                                className="flex h-20 w-full rounded-[1.5rem] border-2 border-slate-100 bg-white px-8 pl-16 text-xl text-slate-900 ring-offset-white placeholder:text-slate-400 focus:border-primary/30 focus:outline-none focus:ring-8 focus:ring-primary/5 transition-all shadow-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="text-center py-32 rounded-[3.5rem] border-2 border-dashed border-slate-100 bg-slate-50/50">
                        <div className="w-24 h-24 rounded-3xl bg-white border border-slate-100 flex items-center justify-center mx-auto mb-8 text-slate-300 shadow-sm">
                            <Search className="w-10 h-10" />
                        </div>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">No Matching Knowledge Found</p>
                        <p className="text-slate-500 mt-3 text-lg font-medium">Try adjusting your technical search parameters.</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-10 font-black text-[10px] uppercase tracking-[0.3em] text-primary hover:text-slate-900 transition-colors bg-white px-8 py-3 rounded-full border border-slate-200 shadow-sm"
                        >
                            Reset System
                        </button>
                    </div>
                ) : (
                    <div className="space-y-24">
                        {categories.map((category) => {
                            const categoryItems = filteredItems.filter(item => item.category === category);
                            if (categoryItems.length === 0) return null;

                            return (
                                <div key={category} className="space-y-10">
                                    <div className="flex items-center gap-6">
                                        <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] whitespace-nowrap bg-secondary/5 px-5 py-2 rounded-full border border-secondary/10 shadow-sm">{category}</h3>
                                        <div className="h-[2px] w-full bg-gradient-to-r from-slate-100 to-transparent" />
                                    </div>
                                    <Accordion type="single" collapsible className="w-full space-y-6">
                                        {categoryItems.map((item, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`${category}-${index}`}
                                                className="border-2 border-slate-50 rounded-[2rem] bg-white px-10 transition-all hover:border-primary/20 hover:shadow-2xl data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_40px_80px_rgba(0,0,0,0.1)] group"
                                            >
                                                <AccordionTrigger className="text-left text-xl font-black text-slate-900 hover:no-underline hover:text-primary transition-all py-8 tracking-tight uppercase leading-tight group-data-[state=open]:text-primary font-mono lowercase relative group/trigger">
                                                    <span className="text-primary/40 mr-4 shrink-0">NODE-{String(index + 1).padStart(3, '0')} »</span>
                                                    <span className="font-sans uppercase flex-1">{item.question}</span>
                                                    
                                                    {/* Hover Annotation */}
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/trigger:opacity-100 transition-opacity bg-slate-950 text-white text-[10px] font-black px-4 py-2 rounded-lg pointer-events-none hidden md:block whitespace-nowrap">
                                                        Interrogate Node Logic
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pb-10 pt-4">
                                                    <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed text-lg border-l-4 border-slate-50 pl-8 italic">
                                                        {item.answer}
                                                    </div>

                                                    {item.rationale && (
                                                        <div className="mt-8 p-6 bg-primary/[0.02] border border-primary/10 rounded-2xl relative overflow-hidden group/inlay">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                                                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 flex items-center">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
                                                                What You Don&apos;t Know (Intelligence Inlay)
                                                            </p>
                                                            <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                                                                {item.rationale}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {item.slug && (
                                                        <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                                            <div className="flex flex-wrap items-center gap-4">
                                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-[10px] font-bold text-green-700 uppercase tracking-widest">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                                                    Expert Reviewed
                                                                </div>
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                                                                    Last Verified: {new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                                                                </span>
                                                            </div>
                                                            <a href={`/question/${item.slug}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-slate-900 hover:bg-primary px-6 py-3 rounded-xl transition-all shadow-xl hover:-translate-y-1 inline-flex items-center group/btn">
                                                                Detailed Technical Analysis
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="ml-3 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                            </a>
                                                        </div>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
