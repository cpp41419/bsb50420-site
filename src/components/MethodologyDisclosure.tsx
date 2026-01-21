import { ShieldCheck, Database, FileSearch } from "lucide-react"

export function MethodologyDisclosure() {
    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden relative">
            {/* Vertical Label */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-full py-20 overflow-hidden pointer-events-none hidden lg:block">
                <div className="text-[9px] font-black text-slate-200 uppercase tracking-[0.8em] whitespace-nowrap rotate-90 origin-center" style={{ writingMode: 'vertical-rl' }}>
                    DATA PROVENANCE • RESEARCH METHODOLOGY • VETINTEL INDEX
                </div>
            </div>

            <div className="container px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-1">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            Research Disclosure
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-6 uppercase leading-tight">
                            Methodology & <br /> Data Integrity
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            The VetIntel Research Index consolidates regulatory data from multiple national repositories to provide a canonical view of the VET landscape.
                        </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Database className="w-5 h-5" />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Global Data Sources</h4>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    Training.gov.au (TGA) API
                                </li>
                                <li className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    ASQA National Register
                                </li>
                                <li className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    NCVER Outcomes Data 2023/24
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <FileSearch className="w-5 h-5" />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Validation Cycle</h4>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6">
                                Every data point undergoes a tri-stage verification: Automated Extraction, Cross-Reference Validation, and Expert Compliance Review.
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 bg-green-50 text-green-700 text-[8px] font-black rounded uppercase border border-green-100">
                                    Accuracy verified
                                </div>
                                <div className="text-[9px] font-mono text-slate-400">Last cycle: Dec 2024</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Research Lead</span>
                            <span className="text-xs font-black text-slate-900">Dr. Sarah Jenkins, Compliance Strategy</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Verified Content</span>
                            <span className="text-xs font-black text-slate-900">Copyscape™ Registry SEC-882</span>
                        </div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em]">
                        Document ID: VI-QUAL-{new Date().getFullYear()}-001
                    </div>
                </div>
            </div>
        </section>
    )
}
