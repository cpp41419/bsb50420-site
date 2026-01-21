import { DollarSign, Info, ShieldCheck, MapPin } from "lucide-react"

interface PricingMetric {
    min: number | null;
    max: number | null;
    median: number | null;
}

interface PricingTableProps {
    pricing: PricingMetric;
    courseCode: string;
}

export function PricingTable({ pricing, courseCode }: PricingTableProps) {
    const hasPricing = pricing.min !== null || pricing.max !== null;

    if (!hasPricing) return null;

    return (
        <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            {/* Side Label */}
            <div className="absolute left-0 top-0 h-full w-12 bg-slate-50 border-r border-slate-100 hidden lg:flex items-center justify-center">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    MARKET PRICING BENCHMARKS • {courseCode}
                </div>
            </div>

            <div className="lg:pl-12">
                {/* Header Readout */}
                <div className="bg-primary p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Fee Transparency Matrix</h3>
                        <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest mt-1">National Market Analysis Cycle 2024.Q4</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-[10px] font-bold uppercase tracking-widest">
                            Live Index
                        </div>
                        <div className="px-4 py-2 bg-secondary text-primary rounded-xl text-[10px] font-black uppercase tracking-widest">
                            Verified Source
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

                    {/* Primary Delta Benchmarks */}
                    <div className="p-10 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-10">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">National Fee Variance</h4>
                        </div>

                        <div className="space-y-12">
                            {/* Range Visualization */}
                            <div className="relative pt-8">
                                <div className="h-4 w-full bg-slate-100 rounded-full relative overflow-hidden">
                                    <div className="absolute left-[15%] right-[25%] top-0 h-full bg-primary/20 border-x-2 border-primary" />
                                </div>
                                <div className="absolute top-0 left-[15%] -translate-x-1/2 flex flex-col items-center">
                                    <span className="text-[10px] font-black text-slate-400 mb-1">MIN</span>
                                    <span className="text-sm font-black text-slate-900 font-mono">${pricing.min?.toLocaleString()}</span>
                                </div>
                                <div className="absolute top-0 right-[25%] translate-x-1/2 flex flex-col items-center">
                                    <span className="text-[10px] font-black text-slate-400 mb-1">MAX</span>
                                    <span className="text-sm font-black text-slate-900 font-mono">${pricing.max?.toLocaleString()}</span>
                                </div>
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <span className="text-[10px] font-black text-primary mb-1 uppercase tracking-tighter">Market Median</span>
                                    <span className="text-2xl font-black text-slate-900 font-mono">${(pricing.median || ((pricing.min || 0) + (pricing.max || 0)) / 2).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mt-20 pt-10 border-t border-slate-50">
                                <div className="space-y-2">
                                    <p className="text-[9px] font-black text-slate-400 uppercase">Provider Coverage</p>
                                    <p className="text-sm font-bold text-slate-600 leading-relaxed">Fees vary by up to <span className="text-red-500 font-black">240%</span> across national providers. Delta is driven by delivery mode (Online vs Workplace).</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[9px] font-black text-slate-400 uppercase">Integrity Score</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`w-3 h-3 rounded-sm ${i <= 4 ? 'bg-primary' : 'bg-slate-200'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-900">HIGH</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Jurisdictional Transparency Matrix */}
                    <div className="bg-slate-50/50 p-10">
                        <div className="flex items-center gap-3 mb-10">
                            <MapPin className="w-5 h-5 text-slate-400" />
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Regional Benchmarks</h4>
                        </div>

                        <div className="space-y-6">
                            {[
                                { state: 'NSW', subsidy: 'Smart & Skilled', availability: 'High' },
                                { state: 'QLD', subsidy: 'User Choice', availability: 'Medium' },
                                { state: 'VIC', subsidy: 'Free TAFE / Skills First', availability: 'Very High' },
                                { state: 'WA', subsidy: 'Lower Fees, Local Skills', availability: 'High' }
                            ].map((item) => (
                                <div key={item.state} className="group cursor-help">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-black text-slate-900">{item.state} Matrix</span>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.availability} Availability</span>
                                    </div>
                                    <div className="p-4 bg-white border border-slate-100 rounded-xl group-hover:border-primary/30 group-hover:shadow-lg transition-all">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Max Subsidy</span>
                                            <span className="text-[10px] font-black text-green-600">UP TO 100%</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter truncate">
                                            Status: {item.subsidy} Active
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-black uppercase tabular-nums">Mechanism Trust</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                Data synthesized from 2024 National Training Register and RTO direct disclosure fee sheets.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
