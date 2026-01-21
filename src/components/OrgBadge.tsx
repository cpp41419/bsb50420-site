import { ShieldCheck } from "lucide-react";
import { SITE } from "@/site";

export function OrgBadge() {
    const orgName = SITE.org;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="group flex cursor-pointer items-center gap-2 rounded-full border border-primary/10 bg-background/90 px-4 py-2.5 shadow-xl backdrop-blur-md transition-all hover:bg-background hover:shadow-2xl hover:scale-105 hover:ring-1 hover:ring-primary/20">
                <div className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75 duration-1000"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary"></span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-0.5">Verified by</span>
                    <span className="text-xs font-black tracking-tight text-primary leading-none flex items-center gap-1">
                        {orgName}
                        <ShieldCheck className="h-3 w-3 text-secondary" />
                    </span>
                </div>
            </div>
        </div>
    );
}
