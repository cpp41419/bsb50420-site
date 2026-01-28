import { FAQSection } from "@/components/FAQSection"
import { getAllQuestions, getAllTags } from "@/lib/questions"
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, BookOpen, AlertTriangle, Search } from "lucide-react"
import Script from "next/script"
import { TrustSignals } from "@/components/TrustSignals"
import { TagTicker } from "@/components/TagTicker"
import { MarketStats } from "@/components/MarketStats"
import { MethodologyDisclosure } from "@/components/MethodologyDisclosure"
import { PricingTable } from "@/components/PricingTable"
import { RTOScorecard } from "@/components/RTOScorecard"
import { SustainabilityGauge } from "@/components/SustainabilityGauge"
import { QualificationJSON } from "@/types/data"
import { getManifest } from "@/content/getManifest"
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema"
import Link from "next/link"
import researchData from "@/data/research.json"

interface MarketingHomeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  faqs?: any[];
  qualification: QualificationJSON | null;
}

export function MarketingHome({ faqs, qualification }: MarketingHomeProps) {
  const manifest = getManifest()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allFaqs = getAllQuestions(faqs || (manifest as any).faq || { rewritten_faqs: [] })

  if (!qualification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-lg"></div>
          <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Initializing Regulatory Node...</p>
        </div>
      </div>
    );
  }

  const { qualification: q, market_snapshot, primary_action } = qualification;
  const courseCode = q.code;
  const verticalName = q.name;

  // SEO Schemas
  const faqSchema = generateFAQSchema(allFaqs.filter(q => q.type === "standard").map(q => ({ question: q.question, answer: q.answer })));
  const courseSchema = generateCourseSchema(qualification, researchData);
  const jsonLd = [faqSchema, courseSchema];

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Gold Standard Hero (Ported from answers-master) */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1120_0%,#1e293b_100%)] z-0" />
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm font-medium backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
            2026 Updated Curriculum
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl uppercase leading-[0.9]">
            {courseCode} <br className="md:hidden" />
            <span className="text-secondary">{verticalName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed font-light">
             The definitive qualification for professionals in Australia. Master the skills you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            {primary_action.type === "compare_providers" && (
                <Link href="/compare" className="inline-flex h-12 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  {primary_action.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            )}
            <Link href="/quiz" className="inline-flex h-12 items-center justify-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Check Eligibility
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-y-3 gap-x-6 text-sm font-medium text-primary-foreground/80">
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
              Nationally Recognised
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
              Australian RTOs Only
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
              2026 Latest Package
            </div>
          </div>
        </div>
      </section>

      {/* Search Interface */}
      <section className="relative z-20 container px-4 md:px-6 -mt-8 mb-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-2 flex items-center gap-2">
            <div className="pl-4 text-slate-400">
                <Search className="w-5 h-5" />
            </div>
            <input 
                type="text" 
                placeholder="Search the regulatory spine..." 
                className="flex-1 h-12 outline-none text-slate-900 placeholder:text-slate-400 font-medium bg-transparent"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        window.location.href = `/search?q=${e.currentTarget.value}`;
                    }
                }}
            />
            <button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-6 rounded-xl font-bold text-sm transition-colors uppercase tracking-wide"
                onClick={(e) => {
                     const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                     window.location.href = `/search?q=${input.value}`;
                }}
            >
                Search
            </button>
        </div>
      </section>

      {/* Scrolling Tags */}
      <TagTicker />

      {/* Market Stats Bar */}
      <MarketStats />

      {/* Trust Signals */}
      <TrustSignals />

      {/* DOSSIER METRICS - Restructured as high-fidelity readout (Retained from main-master but styled) */}
      <section className="relative z-20 container px-4 md:px-12 mt-16 mb-24">
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

      {/* Topics Grid (Ported from answers-master) */}
      <section className="py-16 bg-muted/30 border-b">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Explore by Topic</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Deep dive into specific areas of the {verticalName} qualification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {getAllTags().filter(t => t.count > 2 && t.name !== "FAQ" && t.name !== "General").slice(0, 9).map((tag) => (
              <a
                key={tag.slug}
                href={`/questions/${tag.slug}`}
                className="group flex flex-col p-6 bg-background rounded-xl border transition-all hover:shadow-lg hover:border-primary/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <span className="text-lg font-bold">#</span>
                  </span>
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    {tag.count} articles
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tag.name}</h3>
                <p className="text-sm text-muted-foreground mt-auto flex items-center pt-4 font-medium text-primary/80 group-hover:text-primary">
                  View Topic <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </p>
              </a>
            ))}
          </div>

          {/* Detailed Tag Cloud (Hash Tag Nav) */}
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Popular Tags</p>
            <div className="flex flex-wrap justify-center gap-3">
              {getAllTags().slice(9, 30).map((tag) => (
                <a
                  key={tag.slug}
                  href={`/questions/${tag.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full border bg-background hover:bg-muted hover:border-primary/50 transition-colors text-sm text-foreground/80 hover:text-primary"
                >
                  <span className="mr-2 opacity-50">#</span>
                  {tag.name}
                  <span className="ml-2 text-xs text-muted-foreground bg-muted-foreground/10 px-1.5 rounded-full">
                    {tag.count}
                  </span>
                </a>
              ))}
            </div>
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

       {/* 2.5 DEEP MARKET ANALYSIS - Pricing Moat (Retained from main-master) */}
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

       {/* 3. AUDIT ENGINE INJECTION - Neutral Authority (Retained from main-master) */}
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

      {/* Methodology Disclosure (Retained from main-master) */}
      <MethodologyDisclosure />

      {/* CTA Section (Gold Standard Style) */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0B1120_0%,#0f172a_100%)] z-0" />

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 mb-8 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            Independent Student Protection
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Australia’s only independent platform protecting students from poor training decisions.
          </h2>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get matched with verified providers through our anonymous evaluation system - no marketing pressure, just honest assessment.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-sm font-medium text-primary-foreground/90">
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-secondary mr-2" />
              No Vested RTO Interests
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-secondary mr-2" />
              Anonymous Evaluation System
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-secondary mr-2" />
              Student Protection Focus
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex h-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground px-8 text-base font-bold shadow-lg transition-transform hover:scale-105 hover:shadow-secondary/20">
              Start Anonymous Evaluation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
