import { ShieldCheck, Target, TrendingUp, AlertCircle } from "lucide-react"

interface ScorecardMetric {
    label: string;
    value: string | number;
    status: 'optimal' | 'stable' | 'alert';
}

interface RTOScorecardProps {
    rtoName: string;
    metrics: ScorecardMetric[];
}

export function RTOScorecard({ rtoName, metrics }: RTOScorecardProps) {
    return (
        <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Credential Analysis Matrix</span>
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter uppercase">{rtoName}</h3>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-white/40 uppercase">Audit ID: 8821-X</span>
                        <div className="mt-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black text-primary uppercase">Alpha Access</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 transition-all group/metric">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 group-hover/metric:text-white/60 transition-colors">{metric.label}</p>
                            <div className="flex items-end justify-between">
                                <span className="text-2xl font-black tabular-nums">{metric.value}</span>
                                <div className={`w-2 h-2 rounded-full mb-2 ${metric.status === 'optimal' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                        metric.status === 'stable' ? 'bg-blue-500' : 'bg-secondary'
                                    }`} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Cross-referenced against 3 national registries</span>
                    </div>
                    <button className="px-6 py-3 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-xl">
                        Generate Detailed Report
                    </button>
                </div>
            </div>
        </div>
    )
}
