"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { ShieldCheck, Gauge, ExternalLink } from "lucide-react"
import { AgentAdviser } from "./AgentAdviser"

interface AuditEngineContextType {
    inventoryScore: number;
    lastAudit: string;
}

const AuditEngineContext = createContext<AuditEngineContextType | undefined>(undefined)

export function useAuditEngine() {
    const context = useContext(AuditEngineContext)
    if (!context) {
        throw new Error("useAuditEngine must be used within an AuditEngineProvider")
    }
    return context
}

interface AuditEngineProviderProps {
    children: ReactNode;
    initialData?: Partial<AuditEngineContextType>;
}

export function AuditEngineProvider({ children, initialData }: AuditEngineProviderProps) {
    const value = {
        inventoryScore: initialData?.inventoryScore ?? 98.4,
        lastAudit: initialData?.lastAudit ?? new Date().toISOString().split('T')[0],
    }

    return (
        <AuditEngineContext.Provider value={value}>
            <div className="relative min-h-screen">
                {/* Global Injection Layer (Non-Destructive) */}
                <div className="fixed bottom-6 right-6 z-[100] group pointer-events-auto">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <button className="relative flex items-center gap-3 bg-[#0B1220] border border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl transition-all hover:scale-105 active:scale-95 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-secondary">
                            <ShieldCheck className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="text-left hidden group-hover:block animate-in fade-in slide-in-from-right-4 duration-300">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Audit Engine Alpha</p>
                            <div className="flex flex-col gap-1">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                                    Integrity: {value.inventoryScore}%
                                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                    Verified: {value.lastAudit}
                                </p>
                                <a
                                    href="/llms.txt"
                                    target="_blank"
                                    className="text-[8px] font-black text-primary hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-1"
                                >
                                    AI Ingestion Map <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            </div>
                        </div>
                    </button>
                </div>
                <AgentAdviser />
                {children}
            </div>
        </AuditEngineContext.Provider>
    )
}
