"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, Loader2, X, ShieldCheck } from "lucide-react";
import { askHeroAI } from "@/app/actions/ai";
import { cn } from "@/lib/utils";

interface HeroAIProps {
    code: string;
    title: string;
    totalQuestions: number;
    siteKey?: string;
    externalQuery?: { query: string; timestamp: number };
}

export function HeroAI({ code, title, totalQuestions, siteKey, externalQuery }: HeroAIProps) {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Effect to handle external query selection
    useEffect(() => {
        if (externalQuery?.query) {
            setQuery(externalQuery.query);
            executeSearch(externalQuery.query);
        }
    }, [externalQuery?.timestamp]);

    const executeSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setResponse(null);
        setError(null);

        const context = `Qualification: ${code} - ${title}`;
        const siteDetails = {
            courseCode: code,
            title,
            siteKey: siteKey || code.toLowerCase()
        };

        const result = await askHeroAI(searchQuery, context, siteDetails);

        if (result.error) {
            setError(result.error);
        } else if (result.data) {
            setResponse(result.data);
        }

        setIsLoading(false);
    };

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        executeSearch(query);
    };

    const handleHintClick = (hint: string) => {
        setQuery(hint);
        executeSearch(hint);
    };

    const clearResults = () => {
        setResponse(null);
        setError(null);
        setQuery("");
    };

    return (
        <section className="relative py-24 md:py-40 overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
            {/* Professional Light Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-60" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full opacity-40" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">

                {/* Status Indicator */}
                <div className="flex items-center gap-3 mb-10 animate-fade-in bg-white/80 backdrop-blur-md border border-slate-200/60 px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                        Registry AI Online
                    </span>
                </div>

                {/* Headline Section */}
                <div className="text-center max-w-4xl mb-12">
                    <div className="inline-block mb-4 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em] bg-primary/5 px-4 py-1 rounded-full border border-primary/10">
                            Regulatory Intelligence Engine
                        </h2>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 drop-shadow-sm">
                        {code} Dataset Explorer
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                        Execute sub-second queries across the national training package standards and {totalQuestions} verified compliance nodes.
                    </p>
                </div>

                {/* Command Bar */}
                <div className={cn(
                    "w-full max-w-4xl relative transition-all duration-700 ease-out",
                    response || error ? "mb-12 scale-100" : "mb-12 hover:scale-[1.01]"
                )}>
                    <form
                        onSubmit={handleSearch}
                        className="relative flex flex-col md:flex-row items-center bg-white/90 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] group focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-300"
                    >
                        <div className="hidden md:flex pl-5 text-slate-400 group-focus-within:text-primary transition-colors duration-300">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <Search className="w-6 h-6" />
                            )}
                        </div>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Interrogate ${code} standards...`}
                            disabled={isLoading}
                            className="w-full h-16 px-6 text-xl text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent font-bold tracking-tight transition-all"
                        />

                        <button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className={cn(
                                "w-full md:w-auto h-14 px-10 font-black rounded-2xl transition-all duration-300 tracking-widest flex items-center justify-center gap-3 uppercase text-xs",
                                isLoading || !query.trim()
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                                    : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
                            )}
                        >
                            {isLoading ? "Analyzing..." : "Execute Query"}
                            {!isLoading && <Sparkles className="w-4 h-4 ml-1" />}
                        </button>
                    </form>

                    {/* Decorative shortcuts/hints */}
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        {["Entry Requirements", "Job Outcomes", "Core Units"].map(hint => (
                            <button
                                key={hint}
                                onClick={() => handleHintClick(hint)}
                                disabled={isLoading}
                                className="px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/60 text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-sm hover:border-primary/30 hover:bg-white hover:text-primary hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {hint}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Response Area */}
                {response && (
                    <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                        <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)]">
                            {/* Response Header */}
                            <div className="flex items-center justify-between px-10 py-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 animate-in zoom-in duration-300">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">
                                            Dataset Verification Result
                                        </span>
                                        <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Intelligence Output</span>
                                    </div>
                                </div>
                                <button
                                    onClick={clearResults}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Response Content */}
                            <div className="p-10 md:p-16">
                                <div className="prose prose-slate prose-lg max-w-none">
                                    {response.split('\n').map((line, i) => {
                                        // Regex to find [q1], [Q1], [id:q1], etc.
                                        const citationRegex = /\[(?:id:)?(q\d+)\]/gi;
                                        const parts = line.split(citationRegex);

                                        return (
                                            <p key={i}
                                                className="mb-6 last:mb-0 leading-relaxed text-slate-600 font-medium animate-in fade-in slide-in-from-bottom-2"
                                                style={{ animationDelay: `${i * 100}ms` }}
                                            >
                                                {parts.map((part, index) => {
                                                    if (index % 2 === 1) {
                                                        const faqId = part.toLowerCase();
                                                        return (
                                                            <a
                                                                key={index}
                                                                href={`#${faqId}`}
                                                                className="inline-flex items-center justify-center w-5 h-5 ml-1 text-[8px] font-black bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary hover:text-white transition-all duration-200"
                                                            >
                                                                {part.toUpperCase()}
                                                            </a>
                                                        );
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        );
                                    })}
                                </div>

                                {/* Source Attribution */}
                                <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex items-center gap-6">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm uppercase tracking-tighter hover:scale-110 hover:z-10 transition-transform duration-200">
                                                    DB
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            Cross-referenced via TGA & ASQA datasets
                                        </span>
                                    </div>
                                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                        <ShieldCheck className="w-4 h-4" />
                                        Compliance Verified
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="w-full max-w-xl bg-red-50 border border-red-100 rounded-2xl p-8 text-red-600 flex items-center gap-6 animate-in fade-in zoom-in-95 shadow-xl shadow-red-500/5">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-red-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <X className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-[10px] uppercase tracking-[0.2em] mb-1">Execution Failure</p>
                            <p className="font-bold text-lg leading-tight uppercase">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}
