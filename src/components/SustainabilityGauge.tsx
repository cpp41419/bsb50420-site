"use client"

import { Gauge } from "lucide-react"

interface SustainabilityGaugeProps {
    score: number;
    label?: string;
}

export function SustainabilityGauge({ score, label = "Trust Inventory Score" }: SustainabilityGaugeProps) {
    const percentage = Math.min(Math.max(score, 0), 100)
    const rotation = (percentage / 100) * 180 - 90

    return (
        <div className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl group hover:border-primary/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <Gauge className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{label}</h4>
            </div>

            <div className="relative h-40 flex items-center justify-center overflow-hidden">
                {/* Semi-circle Gauge */}
                <div className="absolute bottom-0 w-64 h-32 border-t-[16px] border-x-[16px] border-slate-50 rounded-t-full" />
                <div
                    className="absolute bottom-0 w-64 h-32 border-t-[16px] border-x-[16px] border-primary rounded-t-full transition-all duration-1000 ease-out"
                    style={{
                        clipPath: `inset(0 ${100 - percentage}% 0 0)`,
                        filter: 'drop-shadow(0 0 8px rgba(11, 18, 32, 0.2))'
                    }}
                />

                {/* Needle */}
                <div
                    className="absolute bottom-0 w-1 h-32 bg-secondary origin-bottom transition-transform duration-1000 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    <div className="w-3 h-3 bg-secondary rounded-full -ml-1 mt-[-1.5px] shadow-lg" />
                </div>

                <div className="absolute bottom-4 flex flex-col items-center">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums">{score}%</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Registry Validated</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Audit Level</span>
                    <span className="text-[10px] font-black text-primary uppercase">Superior</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Proprietary scoring based on RTO regulatory history, completion rate variance, and fee transparency.
                </p>
            </div>
        </div>
    )
}
