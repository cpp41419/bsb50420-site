import { FAQSection } from "@/components/FAQSection"
import { HeroAI } from "@/components/home/HeroAI"
import { getAllQuestions, getAllTags } from "@/lib/questions"
import { ArrowRight, ArrowUpRight, Search, CheckCircle2 } from "lucide-react"
import Script from "next/script"
import { TrustSignals } from "@/components/TrustSignals"
import { MethodologyDisclosure } from "@/components/MethodologyDisclosure"
import { TagTicker } from "@/components/TagTicker"
import { MarketStats } from "@/components/MarketStats"
import { SITE } from "@/site"

import { getManifest } from "@/content/getManifest"
import { generateCourseSchema, generateFAQSchema } from "@/lib/schema"

interface RegistryHomeProps {
  faqs?: any[];
  units?: any[];
}

export function RegistryHome({ faqs, units }: RegistryHomeProps) {
  const manifest = getManifest()
  const allFaqs = getAllQuestions(faqs || (manifest as any).faq || { rewritten_faqs: [] })

  const verticalName = SITE.course.name;

  // Split vertical name for styling if possible (e.g. "CODE - Title")
  const [code, ...titleParts] = verticalName.split(" - ")
  const title = titleParts.join(" - ") || verticalName

  const faqSchema = generateFAQSchema(allFaqs.map(q => ({ question: q.question, answer: q.answer })));
  const courseSchema = generateCourseSchema({
    name: title,
    code: code,
    description: `Everything you need to know about ${verticalName}, including units, fees, and career outcomes.`
  });

  const jsonLd = [faqSchema, courseSchema];

  return (
    <div className="bg-white relative">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroAI
        code={code}
        title={title}
        totalQuestions={allFaqs.length}
        siteKey={SITE.siteKey}
      />

      {/* Scrolling Tags & Stats - Refined Light */}
      <div className="relative z-20">
        <TagTicker />
        <MarketStats />
      </div>

      {/* Trust Signals */}
      <TrustSignals />

      {/* Methodology Disclosure (Pattern 8) */}
      <MethodologyDisclosure />

      {/* Topics Grid */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container px-4 md:px-6 relative">
          {/* Vertical Section Identifier */}
          <div className="absolute -left-12 top-0 h-full py-20 overflow-hidden pointer-events-none hidden xl:block">
            <div className="text-[10px] font-black text-slate-200 uppercase tracking-[0.8em] whitespace-nowrap -rotate-90 origin-center" style={{ writingMode: 'vertical-rl' }}>
              TAXONOMY INDEX • {code} • REPOSITORY ALPHA
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm">
                <Search className="w-4 h-4" />
                <span>Regulatory Indexing Node</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9] italic">
                Explore the <br />
                <span className="text-primary not-italic">{code} Dataset</span>
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed border-l-8 border-primary/10 pl-10">
                Deep dive into specific compliance areas, assessment rules, and industry outcomes for this qualification node.
              </p>
            </div>
          </div>

          {/* Student Support Banner - Refined Light */}
          <div className="mb-20 p-12 bg-white rounded-[3rem] border border-slate-100 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.05)] group transition-all hover:border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              <div className="flex items-start gap-10">
                <div className="w-20 h-20 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20 transition-transform group-hover:scale-105">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Technical Research Atlas</h3>
                  <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                    Access verified unit guides, regulatory case studies, and assessment pathways for national candidates.
                  </p>
                </div>
              </div>
              <a
                href={`https://${SITE.answersDomain}`}
                className="whitespace-nowrap inline-flex h-16 items-center justify-center rounded-2xl bg-slate-900 px-12 text-[12px] font-black text-white uppercase tracking-widest shadow-2xl shadow-slate-900/20 transition-all hover:bg-primary hover:-translate-y-1"
              >
                Launch Atlas Platform
                <ArrowUpRight className="ml-3 w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
            {getAllTags().filter(t => t.count > 2 && t.name !== "FAQ" && t.name !== "General").slice(0, 9).map((tag, idx) => (
              <a
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="group relative flex flex-col p-12 bg-white rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:border-primary/30 hover:-translate-y-3 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500 font-black text-2xl">
                    #
                  </div>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary/20 transition-all duration-500 uppercase tracking-widest shadow-sm">
                    {tag.count} Nodes
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-5 group-hover:text-primary transition-colors tracking-tight uppercase leading-tight">{tag.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 group-hover:text-slate-600 transition-colors">
                  Analyze regulatory standards and verified insights regarding {tag.name.toLowerCase()}.
                </p>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary flex items-center transition-colors">
                  View Repository <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>

          {/* Detailed Tag Cloud - Refined Light */}
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-16 h-1 bg-primary/10 mx-auto mb-12 rounded-full" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-16 shadow-inner py-2 bg-white inline-block px-6 rounded-full border border-slate-100">Universal Keyword Index</p>
            <div className="flex flex-wrap justify-center gap-4">
              {getAllTags().slice(9, 35).map((tag) => (
                <a
                  key={tag.slug}
                  href={`/tag/${tag.slug}`}
                  className="inline-flex items-center px-8 py-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-primary/30 transition-all text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary shadow-sm hover:shadow-xl"
                >
                  <span className="text-primary/10 mr-4 group-hover:text-primary/30 transition-colors">#</span>
                  {tag.name}
                  <span className="ml-4 text-[9px] font-black text-slate-300 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                    {tag.count}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Course Structure (Units) */}
      {units && units.length > 0 && (
        <section className="py-24 md:py-48 bg-white relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-24 gap-12">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/10 text-secondary-foreground text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  Curriculum Architecture
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 italic leading-[0.9]">
                  Course <br />
                  <span className="text-primary not-italic">Structure Nodes</span>
                </h2>
                <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
                  Composed of <span className="font-black text-slate-900 underline decoration-secondary decoration-[12px] underline-offset-8">{units.length} technical units</span>. Each node represents a core competency required under national standards.
                </p>
              </div>
              <div className="flex items-center gap-10 p-10 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-inner">
                <div className="text-center px-10 border-r border-slate-200">
                  <span className="block text-6xl font-black text-slate-900 tracking-tighter mb-2 tabular-nums">{units.length}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dataset Nodes</span>
                </div>
                <div className="text-center px-10">
                  <span className="block text-5xl font-black text-secondary tracking-tighter mb-2">AQF-VI</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alignment</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {units.map((unit) => (
                <a
                  key={unit.code}
                  href={`/unit/${unit.code.toLowerCase()}`}
                  className="group relative flex items-start gap-8 p-10 bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-slate-100 group-hover:bg-primary transition-colors" />
                  <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/10 transition-all duration-300 shadow-inner uppercase tracking-widest">
                    {unit.code.substring(0, 4)}
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-[1.2] mb-3 uppercase tracking-tight">
                      {unit.title}
                    </h3>
                    <div className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 group-hover:text-primary group-hover:border-primary/30 transition-colors shadow-sm">
                      {unit.code}
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-200 group-hover:text-primary group-hover:translate-x-2 transition-all mt-4" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <div className="bg-white">
        <FAQSection
          items={allFaqs}
          title={`Regulatory Knowledge Base`}
          description={`The definitive repository of compliance requirements, study modes, and assessment pathways for the ${code} qualification.`}
          code={code}
        />
      </div>

      {/* CTA Section - Refined Light */}
      <section className="py-32 md:py-48 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
        {/* Advanced Background Decoration */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-16 backdrop-blur-md shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-4 animate-pulse"></span>
              Independent Oversight Council
            </div>

            <h2 className="text-6xl md:text-9xl font-black mb-12 leading-[0.85] tracking-tighter text-slate-900 italic">
              {SITE.marketingCopy?.ctaHeadline || "Interrogate the Provider Index."}
            </h2>

            <p className="text-xl md:text-3xl text-slate-500 font-light max-w-4xl mx-auto mb-20 leading-relaxed italic border-l-4 border-slate-200 pl-10 text-left">
              {SITE.marketingCopy?.ctaSubtitle || "Inspect real-time provider delivery modes, verify state funding contracts, and benchmark national pricing variations."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                { label: "Vested Interest Filter", desc: "No RTO ownership or hidden referral fees" },
                { label: "Direct Audit Node", desc: "Verifying real-time national compliance data" },
                { label: "Candidate Shield", desc: "Engineering to protect individual student interests" }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl text-left group hover:border-primary transition-all hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase leading-tight">{item.label}</h4>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-10">
              <button className="inline-flex h-24 items-center justify-center rounded-[2rem] bg-primary text-white px-16 text-[14px] font-black shadow-2xl shadow-primary/40 transition-all hover:scale-105 hover:-translate-y-2 hover:bg-slate-900 uppercase tracking-widest">
                Initiate Market Analysis
                <ArrowRight className="ml-4 h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
