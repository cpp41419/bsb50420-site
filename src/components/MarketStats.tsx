import { Users, FileCheck, Building2 } from "lucide-react";

export function MarketStats() {
    const date = new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

    return (
        <section className="bg-primary text-primary-foreground border-y border-primary-foreground/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-3 divide-x divide-primary-foreground/20 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left px-2">
                        <Users className="h-5 w-5 text-secondary shrink-0" />
                        <div>
                            <div className="text-xl md:text-2xl font-bold leading-none">12+</div>
                            <div className="text-[10px] md:text-xs text-primary-foreground/70 uppercase tracking-widest mt-1">Core Units</div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left px-2">
                        <FileCheck className="h-5 w-5 text-secondary shrink-0" />
                        <div>
                            <div className="text-xl md:text-2xl font-bold leading-none">Accredited</div>
                            <div className="text-[10px] md:text-xs text-primary-foreground/70 uppercase tracking-widest mt-1">Nationally Recognised</div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left px-2">
                        <Building2 className="h-5 w-5 text-secondary shrink-0" />
                        <div>
                            <div className="text-xl md:text-2xl font-bold leading-none">Updated</div>
                            <div className="text-[10px] md:text-xs text-primary-foreground/70 uppercase tracking-widest mt-1">{date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
