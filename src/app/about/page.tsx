import { Metadata } from "next";
import { SITE } from "@/site";
import { ShieldCheck, Database, FileSearch, Scale, Building2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: `About & Methodology | ${SITE.course.name || "Antigravity"}`,
  description: "Our transparency methodology, data sources, and commitment to independent VET intelligence."
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#0B1220_100%)] z-10" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent z-0" />
        
        <div className="container relative z-20 px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                <FileSearch className="w-4 h-4" />
                Transparency Report
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6 max-w-4xl mx-auto">
              We Audit The <br /> <span className="text-primary">Establishment.</span>
            </h1>
            
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Our proprietary "Antigravity Audit Engine" scrubs national registries to provide the only independent, data-driven view of the VET sector.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl -mt-16 relative z-30 pb-24">
        
        {/* Methodology Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 mb-16">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Data Provenance</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                        <Database className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Registry Data</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        We pull raw compliance data directly from TGA (Training.gov.au) and ASQA registers. No manual entry, no bias.
                    </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                        <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Market Pricing</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Our Fee Index consolidates pricing from 50+ providers to establish a canonical "Fair Price" baseline.
                    </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Risk Scoring</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        We flag RTOs with adverse regulatory history or "Phoenix" activity patterns.
                    </p>
                </div>
            </div>
        </div>

        {/* Mission / Integrity */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    Mandate
                </div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-6">
                    Why we built <br /> this platform.
                </h2>
                <div className="prose prose-slate">
                    <p className="text-lg text-slate-600 leading-relaxed">
                        The Australian VET sector is opaque. Students are often sold into "Sign and Commit" debt traps by aggressive brokers.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We exist to provide a <strong>counter-narrative</strong>. We are not an RTO. We don't employ sales agents. We provide raw data and independent intelligence to help you make a safe decision.
                    </p>
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full transform rotate-3 scale-105" />
                <div className="bg-slate-900 text-white p-10 rounded-[2rem] relative z-10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <HelpCircle className="w-6 h-6 text-primary" />
                        Common Questions
                    </h3>
                    <ul className="space-y-4">
                        <li className="pb-4 border-b border-white/10">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Are you an RTO?</span>
                            <span className="font-medium">No. We are an independent intelligence node.</span>
                        </li>
                        <li className="pb-4 border-b border-white/10">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Do you allow ads?</span>
                            <span className="font-medium">No. We do not accept paid placements or removal requests.</span>
                        </li>
                        <li>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">How is this funded?</span>
                            <span className="font-medium">We operate on a "Performance Audit" model, charging institutions for deep-dive compliance reports.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        {/* Contact CTA */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <Building2 className="w-64 h-64" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 relative z-10">Need a Deep Dive?</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 relative z-10">
                Request a "Forensic Surface Scan" of a specific training provider or qualification.
            </p>
            <Button size="lg" variant="secondary" className="font-bold relative z-10" asChild>
                <Link href="/contact">Contact Intelligence Desk</Link>
            </Button>
        </div>

      </div>
    </div>
  );
}
