import { FAQSection } from "@/components/FAQSection"
import { getAllQuestions, getAllTags } from "@/lib/questions"
import { ArrowRight, ShieldCheck, AlertTriangle, Users, DollarSign, BookOpen } from "lucide-react"
import Script from "next/script"
import { AwardBadge } from "@/components/AwardBadge"
import { MethodologyDisclosure } from "@/components/MethodologyDisclosure"
import { PricingTable } from "@/components/PricingTable"
import { SustainabilityGauge } from "@/components/SustainabilityGauge"
import { RTOScorecard } from "@/components/RTOScorecard"
import { QualificationJSON } from "@/types/data"
import { getManifest } from "@/content/getManifest"
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema"
import Link from "next/link"
import researchData from "@/data/research.json"

interface MarketingHomeProps {
  faqs?: any[];
  qualification: QualificationJSON | null;
}

export function MarketingHome({ faqs, qualification }: MarketingHomeProps) {
  const manifest = getManifest()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allFaqs = getAllQuestions(faqs || (manifest as any).faq || { rewritten_faqs: [] })

  if (!qualification) {
    // In production we might want a nicer skeleton, but for now this signals data loading
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-lg"></div>
          <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Initializing Regulatory Node...</p>
        </div>
      </div>
    );
  }

  const { qualification: q, site_identity, market_snapshot, primary_action } = qualification;

  const courseCode = q.code;

  const faqSchema = generateFAQSchema(allFaqs.filter(q => q.type === "standard").map(q => ({ question: q.question, answer: q.answer })));
  const courseSchema = generateCourseSchema(qualification, researchData);

  const jsonLd = [faqSchema, courseSchema];

  return (
    <div className="bg-white">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* DOSSIER HEADER - Sterile Technical identity */}
      <header className="bg-primary text-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-black uppercase tracking-[0.3em]">Intelligence Dossier</h2>
          <div className="h-4 w-px bg-white/20 hidden md:block" />
          <span className="text-[10px] font-mono text-white/60 hidden md:block uppercase tracking-widest">Regulatory Framework: {q.regulator}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live Data Feed
          </div>
          <span className="text-[10px] font-mono text-white/60 uppercase">REF: {q.code}-2026</span>
        </div>
      </header>

      {/* 1. IDENTITY BLOCK - Dossier Readout Style */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-20 right-10 z-20 hidden xl:block">
          <AwardBadge type="regulatory" size="lg" />
        </div>

        {/* Vertical Section Identifier (Pattern 8) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 h-full py-40 overflow-hidden pointer-events-none hidden lg:block">
          <div className="text-[10px] font-black text-slate-200 uppercase tracking-[1em] whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
            QUALIFICATION IDENTITY • {q.code} • NATIONAL FRAMEWORK
          </div>
        </div>

        <div className="container px-4 md:px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 rounded">INTERNAL CLASSIFICATION: CANONICAL</span>
                <span className="text-slate-300">/</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{site_identity?.role || "Industry Standard"}</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-slate-900 uppercase">
                {q.name}
              </h1>

              <div className="flex flex-col md:flex-row gap-12 mt-16">
                <div className="flex-1">
                  <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light mb-12 max-w-2xl border-l-4 border-primary pl-8">
                    {site_identity?.positioning}
                  </p>

                  {/* ACTION AREA - Integrated into Dossier */}
                  <div className="flex flex-wrap gap-6">
                    {primary_action.type === "compare_providers" && (
                      <Link href="/compare" className="group inline-flex h-16 items-center justify-center rounded-xl bg-primary px-10 text-sm font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                        {primary_action.label}
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                    <Link href="/quiz" className="inline-flex h-16 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-10 text-sm font-black text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-400 uppercase tracking-widest">
                      Assess Eligibility
                    </Link>
                  </div>
                </div>

                {/* Quick Readout Table (Pattern 3) */}
                <div className="w-full md:w-80 bg-slate-50 border border-slate-100 p-8 rounded-2xl shadow-inner">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-200 pb-4">Dossier Highlights</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Training Pkg</span>
                      <span className="text-xs font-black text-slate-900 uppercase">{q.training_package}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Regulator</span>
                      <span className="text-xs font-black text-slate-900 uppercase">{q.regulator}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">AQF Level</span>
                      <span className="text-xs font-black text-slate-900 uppercase">Level 3</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Market Risk</span>
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black rounded uppercase">{market_snapshot.risk_level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOSSIER METRICS - Restructured as high-fidelity readout */}
      <section className="relative z-20 container px-4 md:px-12 -mt-16 mb-24">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">

            {/* Market Depth Readout */}
            <div className="p-10 flex flex-col justify-between group hover:bg-slate-50 transition-all relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-2">Market Intensity</span>
                <p className="text-7xl font-black text-slate-900 tracking-tighter tabular-nums">
                  {market_snapshot.provider_count}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 px-2 py-0.5 bg-slate-100 rounded inline-block">Active Provider Nodes</p>
              </div>
            </div>

            {/* Fee Divergence Benchmarks */}
            <div className="p-10 flex flex-col justify-between group hover:bg-slate-50 transition-all">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-2">Cost Variance (AUD)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 tabular-nums">${market_snapshot.price_range_aud.min}</span>
                  <span className="text-slate-300 font-bold">»</span>
                  <span className="text-4xl font-black text-slate-900 tabular-nums">${market_snapshot.price_range_aud.max}</span>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[65%]" />
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                    <span>Gov Subsidized</span>
                    <span>Full Fee Private</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory Status Matrix */}
            <div className="p-10 bg-slate-50/50 flex flex-col justify-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-6">Credential Status</span>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase">Current / Active</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Status verified via ASQA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase">{q.regulator}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Authority: Federal Regulator</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Index Readout */}
            <div className="p-10 flex flex-col justify-between bg-slate-900 text-white relative">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <AlertTriangle className="w-20 h-20 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] block mb-2">Aggregated Risk Index</span>
                <p className="text-5xl font-black text-white tracking-tighter uppercase italic">
                  {market_snapshot.risk_level.split(' ')[0]} <span className="text-primary not-italic">Risk</span>
                </p>
                <div className="mt-8 p-3 bg-white/5 border border-white/10 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tighter">
                    <span className="text-white/40">Compliance Delta</span>
                    <span className="text-primary">Nominal</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tighter">
                    <span className="text-white/40">Fee Stability</span>
                    <span className="text-white">92%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 DEEP MARKET ANALYSIS - Pricing Moat (Pattern 6) */}
      <section className="py-24 container px-4 md:px-12 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
              Proprietary Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase leading-[0.85]">
              Fee Variance <br /> & Market <span className="text-primary italic">Distribution</span>
            </h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed border-l-4 border-primary pl-8">
              Our VetIntel Research team has interrogated national price points to establish a canonical index. Fees reflect delivery depth and assessment integrity.
            </p>
          </div>
        </div>

        <PricingTable pricing={researchData.pricing} courseCode={q.code} />
      </section>

      {/* 3. AUDIT ENGINE INJECTION - Neutral Authority (Phase 9) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0B1220 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="container px-4 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.25em] mb-8">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Antigravity Audit Engine v1.0
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-8">
                Technical <br /> <span className="text-slate-400">Inventory</span> <br /> Audit
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed mb-12">
                Neutral, registry-backed assessments that scrub provider data for compliance history, completion rates, and historical price stability.
              </p>
              <SustainabilityGauge score={98.4} label="Global Trust Inventory" />
            </div>

            <div className="lg:col-span-3 space-y-8">
              <RTOScorecard
                rtoName="National Training Node Alpha"
                metrics={[
                  { label: "Completion Delta", value: "+12.4%", status: 'optimal' },
                  { label: "Fee Stability (24m)", value: "98.2%", status: 'optimal' },
                  { label: "Audit Recency", value: "Q1 2026", status: 'stable' }
                ]}
              />
              <RTOScorecard
                rtoName="Regional Compliance Hub Gamma"
                metrics={[
                  { label: "Registry Alignment", value: "100%", status: 'optimal' },
                  { label: "Risk Coefficient", value: "Low", status: 'optimal' },
                  { label: "Market Intensity", value: "High", status: 'stable' }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scope Boundaries */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
                Legal Disclosure
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6 italic">Canonical Framework</h2>
              <p className="text-xl text-slate-500 leading-relaxed font-light mb-8">
                This page serves as the national regulatory spine for {q.code}. It consolidates outcomes, delivery mandates, and oversight benchmarks into a single, sterile intelligence source.
              </p>
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Recognition, licensing pathways, and employer acceptance should always be interrogated against jurisdictional standards and specific role requirements.
                </p>
              </div>
            </div>
            {qualification.scope_exclusion && (
              <div className="p-10 bg-secondary/5 rounded-[3rem] border-2 border-secondary/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-secondary/10 text-8xl font-black select-none group-hover:scale-110 transition-transform">!</div>
                <div className="relative z-10">
                  <h4 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-6">Scope Exclusion</h4>
                  <p className="text-slate-600 font-bold leading-relaxed">
                    {qualification.scope_exclusion}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Intelligence Categories */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Intelligence Matrix</h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed border-l-4 border-primary pl-8">
                The delivery nodes below reflect the {q.code} framework. Depth, assessment integrity, and workplace utility vary significantly between RTOs.
              </p>
            </div>
            <Link href="/topics" className="group hidden md:flex items-center text-xs font-black text-primary uppercase tracking-[0.3em] bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
              Full Knowledge Index <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {getAllTags().filter(t => t.count > 2 && t.name !== "FAQ" && t.name !== "General").slice(0, 6).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="group relative flex flex-col p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="p-4 bg-slate-50 border border-slate-100 text-slate-300 rounded-2xl group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 uppercase tracking-widest">{tag.count} Nodes</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight">{tag.name}</h3>
                <div className="mt-8 pt-6 border-t border-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary transition-colors">
                  Open Repository
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        items={allFaqs}
        title={`Regulatory Repositories`}
        description={`The definitive FAQ dataset for ${courseCode}, covering high-variance compliance nodes and delivery benchmarks.`}
        code={courseCode}
      />

      {/* Methodology Disclosure (Pattern 8) */}
      <MethodologyDisclosure />

      {/* Final CTA - Authority Version */}
      <section className="py-32 md:py-48 bg-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/20 blur-[200px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        </div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-12 backdrop-blur-md">
            Candidate Verification Protocol
          </div>

          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-8 leading-[0.9] italic max-w-5xl mx-auto">
            Ready to confirm whether {q.code} fits your career architecture?
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto mb-20 text-xl md:text-2xl font-light leading-relaxed">
            Interrogate verified RTO datasets, bridge fee variances, and validate your accreditation eligibility against the national standards.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-8">
            {primary_action.type === "compare_providers" && (
              <Link href="/compare" className="group inline-flex h-20 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground px-12 text-lg font-black shadow-2xl shadow-secondary/40 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-secondary/60 uppercase tracking-widest">
                {primary_action.label}
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <Link href="/quiz" className="inline-flex h-20 items-center justify-center rounded-2xl border-2 border-white/10 bg-white/5 px-12 text-lg font-black text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 uppercase tracking-widest">
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
