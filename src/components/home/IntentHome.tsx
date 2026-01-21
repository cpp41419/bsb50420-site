"use client";

import { QualificationJSON } from "@/types/data";
import {
    Search,
    Target,
    Zap,
    BarChart3,
    ArrowRight,
    GraduationCap,
    ShieldCheck,
    CheckCircle2,
    HelpCircle,
    Users
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HeroAI } from "./HeroAI";
import { ScenarioAgents } from "./ScenarioAgents";
import { FAQSection } from "@/components/FAQSection";
import { getAllQuestions } from "@/lib/questions";

interface IntentHomeProps {
    qualification: QualificationJSON;
    faqs?: any[];
}

export function IntentHome({ qualification, faqs }: IntentHomeProps) {
    const [activeIntent, setActiveIntent] = useState<string | null>(null);
    const [aiQuery, setAiQuery] = useState<{ query: string; timestamp: number } | undefined>(undefined);

    const { qualification: q, market_snapshot } = qualification;

    const handleScenarioSelect = (query: string) => {
        setAiQuery({ query, timestamp: Date.now() });
        // Smooth scroll to AI section
        document.getElementById('ai-search')?.scrollIntoView({ behavior: 'smooth' });
    };
    const allFaqs = getAllQuestions(faqs || (qualification as any).faq || { rewritten_faqs: [] });
    const totalQuestions = allFaqs.length;

    const intents = [
        {
            id: "rpl",
            title: "Assessment Pathway",
            subtitle: "Recognition of Prior Learning (RPL)",
            description: "Evidence-based assessment of your existing skills against the national training package requirements.",
            icon: <Target className="w-6 h-6" />,
            action: "Verify Eligibility",
            link: "/quiz",
            color: "bg-secondary/10 text-secondary-foreground",
            border: "border-secondary/20 hover:border-secondary/40",
            btn: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
            tag: "Fast Track"
        },
        {
            id: "compare",
            title: "Provider Index",
            subtitle: "Registered Training Organisations",
            description: "Independent audit of RTOs delivering this qualification, including fee benchmarks and delivery modes.",
            icon: <Users className="w-6 h-6" />,
            action: "View Provider Atlas",
            link: "/compare",
            color: "bg-primary/10 text-primary",
            border: "border-primary/20 hover:border-primary/40",
            btn: "bg-primary text-primary-foreground hover:bg-primary/90",
            tag: "Buyer's Guide"
        },
        {
            id: "market",
            title: "Market Data",
            subtitle: "National Pricing & Risk",
            description: "Access live pricing variance, volume data, and regulatory risk assessments for the {code} qualification.".replace("{code}", q.code),
            icon: <BarChart3 className="w-6 h-6" />,
            action: "Analyze Market Data",
            link: "#market-intelligence",
            color: "bg-secondary/10 text-secondary-foreground",
            border: "border-secondary/20 hover:border-secondary/40",
            btn: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
            tag: "Insights",
            lastVerified: qualification.metadata?.lastHealed || new Date().toISOString()
        },
        {
            id: "ask",
            title: "Regulatory Search",
            subtitle: "Standards & Compliance AI",
            description: "Interrogate the Training Package rules, unit requirements, and assessment guidelines.",
            icon: <HelpCircle className="w-6 h-6" />,
            action: "Query Standards",
            link: "#ai-search",
            color: "bg-primary/10 text-primary",
            border: "border-primary/20 hover:border-primary/40",
            btn: "bg-primary text-primary-foreground hover:bg-primary/90",
            tag: "AI Powered"
        }
    ];

    return (
        <div className="min-h-screen bg-white relative">
            {/* Background Pattern - Light Professional Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d4af3708,transparent)] pointer-events-none" />

            {/* 1. PREMIUM HERO / INTENT SELECTOR */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-32 border-b border-slate-100 overflow-hidden">
                <div className="container px-4 relative">
                    <div className="max-w-5xl mx-auto text-center mb-24">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10 animate-fade-in shadow-sm">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            <span>Official National Registry Node</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10 animate-fade-in-up leading-[0.9] italic">
                            National Compliance <br />
                            <span className="text-primary not-italic">Index on {q.code}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-light max-w-4xl mx-auto animate-fade-in-up stagger-1 leading-relaxed">
                            Interrogate national standards, benchmark market pricing, and map provider performance for the <span className="font-black text-slate-900 underline decoration-primary/20 decoration-8 underline-offset-4">{q.name}</span> qualification.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {intents.map((intent) => (
                            <div
                                key={intent.id}
                                className={cn(
                                    "group relative p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer flex flex-col h-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden",
                                    intent.border,
                                    activeIntent === intent.id ? "border-primary/30 shadow-[0_30px_60px_rgba(0,0,0,0.1)] -translate-y-3" : "border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1.5"
                                )}
                                onMouseEnter={() => setActiveIntent(intent.id)}
                                onMouseLeave={() => setActiveIntent(null)}
                            >
                                {/* Decorative background glow on hover */}
                                <div className={cn(
                                    "absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 transition-opacity duration-700 pointer-events-none",
                                    intent.id === "rpl" || intent.id === "market" ? "bg-secondary/10" : "bg-primary/10",
                                    activeIntent === intent.id && "opacity-100"
                                )} />

                                {/* Intent Tag */}
                                <div className={cn(
                                    "absolute top-8 right-8 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-sm",
                                    intent.id === "rpl" || intent.id === "market" ? "bg-secondary/5 text-secondary-foreground border-secondary/10" : "bg-primary/5 text-primary border-primary/10"
                                )}>
                                    {intent.tag}
                                </div>

                                <div className={cn(
                                    "w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-10 transition-all duration-500 border border-transparent shadow-sm",
                                    intent.id === "rpl" || intent.id === "market" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary",
                                    activeIntent === intent.id && "scale-110 rotate-3 border-current/20 shadow-lg"
                                )}>
                                    {intent.icon}
                                </div>

                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 group-hover:text-primary transition-colors">
                                    {intent.title}
                                </h3>
                                <h4 className="text-2xl font-black text-slate-900 mb-5 leading-tight tracking-tight">
                                    {intent.subtitle}
                                </h4>
                                <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed font-medium">
                                    {intent.description}
                                </p>

                                {(intent as any).lastVerified && (
                                    <div className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100/50 w-fit">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">
                                            Verified: {new Date((intent as any).lastVerified).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                <Link
                                    href={intent.link}
                                    className={cn(
                                        "inline-flex items-center justify-center w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white transition-all duration-300 shadow-xl",
                                        intent.id === "rpl" || intent.id === "market" ? "bg-secondary hover:bg-secondary/90 shadow-secondary/20" : "bg-primary hover:bg-primary/90 shadow-primary/20",
                                        activeIntent === intent.id && "scale-[1.03]"
                                    )}
                                >
                                    {intent.action}
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. SCENARIO AGENTS SECTION */}
            <ScenarioAgents code={q.code} onQuerySelect={handleScenarioSelect} />

            {/* 3. DYNAMIC CONTENT SECTIONS BASED ON INTENT */}

            {/* AI Search Section (Intent: ask) */}
            <div id="ai-search" className="scroll-mt-20">
                <HeroAI
                    code={q.code}
                    title={q.name}
                    totalQuestions={totalQuestions}
                    siteKey={q.code.toLowerCase()}
                    externalQuery={aiQuery}
                />
            </div>

            {/* Market Intelligence Section (Intent: market) */}
            <section id="market-intelligence" className="py-32 bg-slate-50 relative overflow-hidden scroll-mt-20 border-b border-slate-200">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="container px-4 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                            <div className="animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-primary text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm">
                                    <BarChart3 className="w-3.5 h-3.5" />
                                    <span>Market Audit Protocol</span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-10 leading-[0.9] tracking-tighter italic">
                                    Independent <br />
                                    <span className="text-primary not-italic">Intelligence Map</span>
                                </h2>
                                <p className="text-xl text-slate-500 mb-16 leading-relaxed font-light border-l-8 border-primary/10 pl-10">
                                    Our engine continuously monitors <span className="font-black text-slate-900"> {market_snapshot.provider_count} verified entities</span> to ensure regulatory transparency and pricing integrity for the {q.code} dataset.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { icon: <Zap className="w-6 h-6" />, title: "Industry Recognition", desc: "AQF compliance alignment with national skills requirements.", color: "primary" },
                                        { icon: <GraduationCap className="w-6 h-6" />, title: "Pathway Validation", desc: "Verified outcomes into senior technical and leadership roles.", color: "secondary" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-8 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-primary/20 group">
                                            <div className={cn(
                                                "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110",
                                                item.color === "primary" ? "bg-primary/5 text-primary" : "bg-secondary/5 text-secondary"
                                            )}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-xl text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                                                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-10 bg-gradient-to-tr from-primary/5 to-secondary/5 blur-[100px] rounded-[5rem] animate-pulse" />
                                <div className="relative grid grid-cols-2 gap-8">
                                    <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 flex flex-col justify-between shadow-2xl min-h-[280px] transition-all hover:-translate-y-2 group">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Market Depth</span>
                                            <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform"><Users className="w-5 h-5" /></div>
                                        </div>
                                        <div>
                                            <span className="text-7xl font-black tabular-nums text-slate-900 tracking-tighter">{market_snapshot.provider_count}</span>
                                            <p className="text-[10px] text-slate-400 mt-4 font-black uppercase tracking-[0.2em]">Verified RTO Nodes</p>
                                        </div>
                                    </div>
                                    <div className="p-12 rounded-[3.5rem] bg-slate-900 text-white flex flex-col justify-between shadow-2xl min-h-[280px] transition-all hover:-translate-y-2 group">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Registry Fee</span>
                                            <div className="w-10 h-10 rounded-2xl bg-white/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform"><Target className="w-5 h-5" /></div>
                                        </div>
                                        <div>
                                            <span className="text-6xl font-black tabular-nums text-white tracking-tighter">${market_snapshot.price_range_aud.min.toLocaleString()}</span>
                                            <p className="text-[10px] text-white/40 mt-4 font-black uppercase tracking-[0.2em]">Baseline Entry</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 p-12 rounded-[3.5rem] bg-white border-2 border-slate-50 flex flex-col justify-between shadow-xl transition-all hover:border-primary/10">
                                        <div className="flex justify-between items-start mb-12">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Audit Profile</span>
                                            <span className={cn(
                                                "px-5 py-2 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm",
                                                market_snapshot.risk_level.toLowerCase() === 'low' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-primary/5 text-primary border border-primary/10"
                                            )}>
                                                {market_snapshot.risk_level} Risk Category
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-6 top-0 bottom-0 w-2 bg-primary/20 rounded-full" />
                                            <p className="text-2xl text-slate-700 leading-tight font-light italic pl-10">
                                                "Qualification maintains a <span className="font-black text-slate-900 not-italic uppercase tracking-tighter text-3xl">{market_snapshot.risk_level}</span> regulatory risk profile based on national audit frequency."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TOPIC CARDS */}
            <section className="py-32 bg-white border-b border-slate-100">
                <div className="container px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
                            <div className="max-w-3xl">
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Intelligence Repository</h2>
                                <p className="text-xl text-slate-500 leading-relaxed font-light border-l-4 border-slate-200 pl-8 italic">
                                    Deep dive into the specific compliance markers and delivery nodes for {q.name}.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[
                                { name: "Course Overview", slug: "course-overview", icon: <GraduationCap className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white" },
                                { name: "Costs", slug: "costs", icon: <BarChart3 className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-secondary group-hover:text-white" },
                                { name: "Study Options", slug: "study-options", icon: <Search className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white" },
                                { name: "Career Outcomes", slug: "career-outcomes", icon: <Target className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-secondary group-hover:text-white" },
                                { name: "Team Leadership", slug: "team-leadership", icon: <Users className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white" },
                                { name: "Supervisor Skills", slug: "supervisor-skills", icon: <ShieldCheck className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-secondary group-hover:text-white" },
                                { name: "Pathway to Diploma", slug: "pathway-to-diploma", icon: <Zap className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white" },
                                { name: "Funding Options", slug: "funding-options", icon: <CheckCircle2 className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-secondary group-hover:text-white" },
                                { name: "Assessments", slug: "assessments", icon: <HelpCircle className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white" },
                                { name: "Provider Selection", slug: "provider-selection", icon: <Users className="w-6 h-6" />, color: "bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white" },
                            ].map((topic) => (
                                <Link
                                    key={topic.slug}
                                    href={`/tag/${topic.slug}`}
                                    className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all text-center flex flex-col items-center"
                                >
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                                        topic.color
                                    )}>
                                        {topic.icon}
                                    </div>
                                    <h3 className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight uppercase leading-tight">{topic.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FAQ SECTION */}
            <div className="bg-white">
                <FAQSection
                    items={allFaqs}
                    title={`Regulatory Knowledge Base`}
                    description={`The definitive repository of compliance requirements, study modes, and assessment pathways for ${q.code}.`}
                    code={q.code}
                />
            </div>

            {/* 6. FINAL ACTION */}
            <section className="py-32 md:py-48 bg-slate-50 relative overflow-hidden border-t border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_40%)]" />
                <div className="container px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm">
                        Verification Protocol Online
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter text-slate-900 italic leading-[0.9]">
                        Ready to begin your <br />
                        <span className="text-primary not-italic">Official Candidature?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-8 mt-16">
                        <Link href="/quiz" className="px-14 py-6 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-2xl shadow-primary/30 uppercase tracking-widest">
                            Assess Eligibility
                        </Link>
                        <Link href="/compare" className="px-14 py-6 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-lg transition-all hover:border-primary/20 shadow-xl uppercase tracking-widest text-center">
                            RTO Research Index
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
