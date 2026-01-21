import { ShieldCheck, Lock } from "lucide-react";
import { SITE } from "@/site";

export function AuthorityBar() {
    return (
        <div className="bg-slate-50 text-slate-500 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </div>
                    <span className="text-slate-900">National Dataset Node Active</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span>Verified Registry</span>
                    </span>
                    <span className="w-px h-3 bg-slate-200" />
                    <span className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{SITE.course.code} Standards Authority</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
