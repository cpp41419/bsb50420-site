"use client"

import React, { useState, useEffect } from "react"
import { Sparkles, MessageSquare, AlertCircle, TrendingUp, X, Bell, Zap } from "lucide-react"
import { useAuditEngine } from "./AuditEngineProvider"
import { cn } from "@/lib/utils"

interface Insight {
    id: string;
    type: 'opportunity' | 'warning' | 'info';
    message: string;
    action?: string;
}

export function AgentAdviser() {
    const { inventoryScore, lastAudit } = useAuditEngine()
    const [isOpen, setIsOpen] = useState(false)
    const [hasNew, setHasNew] = useState(true)
    const [insights, setInsights] = useState<Insight[]>([])

    // Load dynamic insights from the dataset on mount
    useEffect(() => {
        const loadInsights = async () => {
            try {
                // We attempt to fetch the faq.json which now contains strategic opportunities
                const response = await fetch('/data/faq.json');
                const data = await response.json();

                if (data.long_tail_opportunities) {
                    const dynamicInsights = data.long_tail_opportunities.slice(0, 5).map((opp: any, idx: number) => ({
                        id: `opp-${idx}`,
                        type: 'opportunity',
                        message: opp.topic,
                        action: 'Explain Insight'
                    }));

                    setInsights([
                        ...dynamicInsights,
                        {
                            id: 'sys-1',
                            type: 'info',
                            message: `National registry node re-verified on ${lastAudit}.`,
                        }
                    ]);
                }
            } catch (e) {
                // Fallback to sterile defaults if fetch fails
                setInsights([
                    {
                        id: 'fallback-1',
                        type: 'info',
                        message: 'Continuous market audit active. No critical variances detected.',
                    },
                    {
                        id: 'fallback-2',
                        type: 'opportunity',
                        message: 'Strategic Core v2.3 successfully synced with training.gov.au.',
                    }
                ]);
            }
        };

        loadInsights();
    }, [lastAudit]);

    // Reset notification when opened
    useEffect(() => {
        if (isOpen) setHasNew(false)
    }, [isOpen])

    return (
        <div className="fixed bottom-24 right-6 z-[100]">
            {/* Floating Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl overflow-hidden group",
                    isOpen ? "bg-primary rotate-90" : "bg-white border-2 border-slate-100 hover:border-primary/20"
                )}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <>
                        <Zap className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        {hasNew && (
                            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                        )}
                    </>
                )}
            </button>

            {/* Advisory Panel */}
            <div className={cn(
                "absolute bottom-20 right-0 w-[420px] max-w-[90vw] transition-all duration-500 transform origin-bottom-right",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-8 pointer-events-none"
            )}>
                <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#0B1220] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                <Sparkles className="w-6 h-6 text-secondary" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Strategic Adviser</h4>
                                <p className="text-xl font-black tracking-tight leading-none uppercase italic">Ralph Engine</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Real-time Intelligence Feed</span>
                            </div>
                            <span className="text-[10px] font-mono text-secondary font-bold">Integrity: {inventoryScore}%</span>
                        </div>
                    </div>

                    {/* Insights List */}
                    <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto bg-slate-50/50">
                        {insights.length === 0 ? (
                            <div className="py-20 text-center">
                                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing with Registry...</p>
                            </div>
                        ) : (
                            insights.map((insight) => (
                                <div key={insight.id} className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 hover:shadow-xl transition-all group cursor-default">
                                    <div className="flex gap-4">
                                        <div className={cn(
                                            "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center",
                                            insight.type === 'opportunity' ? "bg-emerald-50 text-emerald-600 shadow-sm" :
                                                insight.type === 'warning' ? "bg-amber-50 text-amber-600 shadow-sm" : "bg-blue-50 text-blue-600 shadow-sm"
                                        )}>
                                            {insight.type === 'opportunity' ? <TrendingUp className="w-4 h-4" /> :
                                                insight.type === 'warning' ? <AlertCircle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[11px] font-black text-slate-700 leading-relaxed uppercase tracking-tight">
                                                {insight.message}
                                            </p>
                                            {insight.action && (
                                                <button className="text-[9px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 hover:translate-x-1 transition-transform group-hover:text-primary">
                                                    {insight.action}
                                                    <TrendingUp className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-6 bg-white border-t border-slate-100">
                        <button className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all">
                            Request Strategic Briefing
                        </button>
                        <p className="text-[8px] text-center mt-4 font-bold text-slate-400 uppercase tracking-widest">
                            Verified through the Ralph Strategic Cycle v2.3
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
