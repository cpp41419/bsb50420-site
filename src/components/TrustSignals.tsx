import { ShieldCheck, Award, BookOpen, Banknote, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustSignals() {
    return (
        <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative">
                {/* Logos Strip - Authority Style */}
                <div className="mb-24 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 shadow-inner inline-block px-8 py-2 bg-slate-50 border border-slate-100 rounded-full">Regulatory Recognition Framework</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-3 font-black text-sm text-slate-900 uppercase tracking-widest group cursor-default">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <ShieldCheck className="w-5 h-5 text-primary group-hover:text-white" />
                            </div>
                            AQF Level Node
                        </div>
                        <div className="flex items-center gap-3 font-black text-sm text-slate-900 uppercase tracking-widest group cursor-default">
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                <Award className="w-5 h-5 text-secondary group-hover:text-white" />
                            </div>
                            Nationally Recognised
                        </div>
                        <div className="flex items-center gap-3 font-black text-sm text-slate-900 uppercase tracking-widest group cursor-default">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-white" />
                            </div>
                            ASQA Regulated Node
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <ShieldCheck className="h-7 w-7" />, title: "National Accord", desc: "All delivery entities are strictly regulated under national VET standards.", color: "primary" },
                        { icon: <Award className="h-7 w-7" />, title: "Industry Index", desc: "Curriculum aligned with current 2026 workforce requirements.", color: "secondary" },
                        { icon: <BookOpen className="h-7 w-7" />, title: "Delivery Matrix", desc: "Compare verified online, face-to-face, and hybrid study nodes.", color: "primary" },
                        { icon: <Banknote className="h-7 w-7" />, title: "Funding Portal", desc: "Access state-subsidised pricing and federal eligibility nodes.", color: "secondary" }
                    ].map((card, i) => (
                        <div key={i} className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:border-primary/20 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                <CheckCircle2 className="w-6 h-6 text-primary/20" />
                            </div>
                            <div className={cn(
                                "h-16 w-16 rounded-2xl flex items-center justify-center mb-10 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                                card.color === "primary" ? "bg-primary/5 text-primary shadow-primary/5 border border-primary/10" : "bg-secondary/5 text-secondary shadow-secondary/5 border border-secondary/10"
                            )}>
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase leading-tight">{card.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                {card.desc}
                            </p>

                            <div className="mt-8 pt-8 border-t border-slate-50 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Verified Content Node</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
