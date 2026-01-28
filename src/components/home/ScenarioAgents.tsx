"use client";

import {
    ShieldCheck,
    BarChart3,
    Zap,
    GraduationCap,
    ArrowRight,
    Search,
    MessageSquare,
    Target,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface AgentScenario {
    id: string;
    agentName: string;
    agentRole: string;
    scenarioTitle: string;
    scenarioDescription: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    prompt: string;
    stats?: { label: string; value: string }[];
}

interface ScenarioAgentsProps {
    onQuerySelect?: (query: string) => void;
    code: string;
}

export function ScenarioAgents({ onQuerySelect, code }: ScenarioAgentsProps) {
    const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

    const scenarios: AgentScenario[] = [
        {
            id: "regulatory",
            agentName: "The Sentinel",
            agentRole: "Compliance Auditor",
            scenarioTitle: "Regulatory Verification",
            scenarioDescription: "Is your RTO delivery compliant? Verify training package rules and evidence requirements for ${code}.".replace("${code}", code),
            icon: <ShieldCheck className="w-6 h-6" />,
            color: "bg-primary text-primary-foreground",
            borderColor: "border-primary/20",
            prompt: `Check compliance rules for ${code}`,
            stats: [
                { label: "Audit Nodes", value: "240k+" },
                { label: "Latent Risk", value: "Low" }
            ]
        },
        {
            id: "market",
            agentName: "The Analyst",
            agentRole: "Market Strategist",
            scenarioTitle: "Competitive Intelligence",
            scenarioDescription: "Benchmark pricing, volume, and provider performance data to identify gaps in the ${code} market.".replace("${code}", code),
            icon: <BarChart3 className="w-6 h-6" />,
            color: "bg-secondary text-secondary-foreground",
            borderColor: "border-secondary/20",
            prompt: `Benchmark market pricing for ${code}`,
            stats: [
                { label: "Providers", value: "54 Verified" },
                { label: "Price Range", value: "$1.2k - $6.5k" }
            ]
        },
        {
            id: "pathway",
            agentName: "The Navigator",
            agentRole: "RPL Expert",
            scenarioTitle: "Skills Assessment",
            scenarioDescription: "Map existing experience against unit competencies. Find the fastest path to ${code} certification.".replace("${code}", code),
            icon: <Zap className="w-6 h-6" />,
            color: "bg-primary text-primary-foreground",
            borderColor: "border-primary/20",
            prompt: `How does RPL work for ${code}?`,
            stats: [
                { label: "Avg. Duration", value: "4 Weeks" },
                { label: "RPL Success", value: "92%" }
            ]
        },
        {
            id: "career",
            agentName: "The Architect",
            agentRole: "Career Mentor",
            scenarioTitle: "Outcome Projection",
            scenarioDescription: "Project your career trajectory and salary expectations after completing the ${code} qualification.".replace("${code}", code),
            icon: <Target className="w-6 h-6" />,
            color: "bg-secondary text-secondary-foreground",
            borderColor: "border-secondary/20",
            prompt: `Job outcomes for ${code}`,
            stats: [
                { label: "Avg Salary", value: "$85k+" },
                { label: "Job Growth", value: "High" }
            ]
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.01),transparent_40%)]" />

            <div className="container px-4 relative">
                <div className="max-w-4xl mb-20">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.34em] mb-10 animate-fade-in shadow-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Interactive Agent Scenarios</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 italic leading-[0.9]">
                        Select Your <br />
                        <span className="text-primary not-italic">Intelligence Path</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl leading-relaxed">
                        Deploy specialized agents to interrogate the national registry for your specific operational intent.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {scenarios.map((scenario) => (
                        <div
                            key={scenario.id}
                            className={cn(
                                "group relative flex flex-col h-full bg-white rounded-[2.5rem] border-2 p-10 transition-all duration-500 cursor-pointer overflow-hidden",
                                scenario.borderColor,
                                hoveredAgent === scenario.id ? "border-primary/40 shadow-2xl -translate-y-3" : "border-slate-50 shadow-lg"
                            )}
                            onMouseEnter={() => setHoveredAgent(scenario.id)}
                            onMouseLeave={() => setHoveredAgent(null)}
                            onClick={() => onQuerySelect?.(scenario.prompt)}
                        >
                            {/* Accent Glow */}
                            <div className={cn(
                                "absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-0 transition-opacity duration-700 pointer-events-none",
                                scenario.id === "market" || scenario.id === "career" ? "bg-secondary/10" : "bg-primary/10",
                                hoveredAgent === scenario.id && "opacity-100"
                            )} />

                            {/* Agent Header */}
                            <div className="flex items-center gap-4 mb-10">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500",
                                    scenario.color,
                                    hoveredAgent === scenario.id && "scale-110 rotate-6"
                                )}>
                                    {scenario.icon}
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{scenario.agentRole}</h4>
                                    <h3 className="text-lg font-black text-slate-900 leading-none">{scenario.agentName}</h3>
                                </div>
                            </div>

                            {/* Scenario Body */}
                            <div className="flex-grow">
                                <h5 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight uppercase italic underline decoration-primary/10 underline-offset-4">
                                    {scenario.scenarioTitle}
                                </h5>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-10">
                                    {scenario.scenarioDescription}
                                </p>
                            </div>

                            {/* Stats */}
                            {scenario.stats && (
                                <div className="grid grid-cols-2 gap-4 mb-10 pt-8 border-t border-slate-50">
                                    {scenario.stats.map((stat, i) => (
                                        <div key={i}>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                            <p className="text-sm font-black text-slate-900">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Action Button */}
                            <button className={cn(
                                "flex items-center justify-between w-full p-5 rounded-2xl transition-all duration-300 group/btn",
                                scenario.id === "market" || scenario.id === "career" ? "bg-secondary text-secondary-foreground" : "bg-primary text-white"
                            )}>
                                <span className="text-[10px] font-black uppercase tracking-widest">Deploy Agent</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Mobile Scroller Indicator */}
                <div className="md:hidden flex justify-center mt-10 gap-2">
                    {scenarios.map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-slate-200" />
                    ))}
                </div>
            </div>
        </section>
    );
}
