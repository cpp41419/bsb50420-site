import React from "react"
import { ShieldCheck, CheckCircle, Database, Lock, Search, Code, FileCheck, Star } from "lucide-react"

export function TrustSignals() {
    const row1 = [
        { icon: ShieldCheck, label: "W3C Valid", color: "text-blue-600", bg: "bg-blue-50/50", border: "border-blue-200/60" },
        { icon: CheckCircle, label: "WCAG 2.1 AA", color: "text-green-600", bg: "bg-green-50/50", border: "border-green-200/60" },
        { icon: Database, label: "Schema.org", color: "text-blue-600", bg: "bg-blue-50/50", border: "border-blue-200/60" },
        { icon: Star, label: "AU Gov Standard", color: "text-amber-600", bg: "bg-amber-50/50", border: "border-amber-200/60" },
        { icon: Lock, label: "SSL Secure", color: "text-emerald-600", bg: "bg-emerald-50/50", border: "border-emerald-200/60" },
    ]

    const row2 = [
        { label: "Google Indexed", icon: Search, color: "text-blue-600", bg: "bg-blue-50/50", border: "border-blue-200/60", customIcon: "G" },
        { label: "Bing Indexed", icon: Search, color: "text-teal-600", bg: "bg-teal-50/50", border: "border-teal-200/60", customIcon: "b" },
        { label: "Google Dev", icon: Code, color: "text-blue-600", bg: "bg-blue-50/50", border: "border-blue-200/60", customIcon: "G" },
        { label: "Performance", score: "90+", color: "text-green-600", bg: "bg-green-50/50", border: "border-green-200/60" },
        { label: "Accessibility", score: "95+", color: "text-blue-600", bg: "bg-blue-50/50", border: "border-blue-200/60" },
        { label: "Best Practices", score: "90+", color: "text-amber-600", bg: "bg-amber-50/50", border: "border-amber-200/60" },
        { label: "SEO", score: "100", color: "text-green-600", bg: "bg-green-50/50", border: "border-green-200/60" },
        { label: "100% Original", icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50/50", border: "border-purple-200/60" },
        { label: "Dev Log", icon: Code, color: "text-indigo-600", bg: "bg-indigo-50/50", border: "border-indigo-200/60" },
    ]

    return (
        <div className="w-full py-6 space-y-4 border-t border-border/40 bg-slate-50/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-4">
                    {/* Row 1: Standards */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {row1.map((signal, i) => (
                            <div key={i} className={`flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border ${signal.border} shadow-sm select-none`}>
                                <signal.icon className={`h-3.5 w-3.5 ${signal.color}`} />
                                <span className={`text-[10px] font-semibold tracking-tight ${signal.color} whitespace-nowrap`}>{signal.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Performance & Metrics */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {row2.map((item, i) => (
                            <div key={i} className={`flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border ${item.border} shadow-sm select-none`}>
                                {item.score ? (
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full border border-current ${item.color} opacity-80`}>
                                        <span className="text-[8px] font-bold">{item.score.replace('+', '')}</span>
                                    </div>
                                ) : item.customIcon ? (
                                    <span className={`font-bold text-xs ${item.color} font-serif`}>{item.customIcon}</span>
                                ) : item.icon ? (
                                    <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                                ) : null}
                                <span className={`text-[10px] font-semibold tracking-tight ${item.color} whitespace-nowrap`}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
