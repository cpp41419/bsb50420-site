"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Flag } from "lucide-react";
import { SITE } from "@/site";

export function MasterDomainBanner() {
    const [isVisible, setIsVisible] = useState(false);

    const masterUrl = `https://www.${SITE.domain}`;

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top-6 duration-700 fade-in">
            <a
                href={masterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-6 py-3 bg-slate-900/90 backdrop-blur-2xl text-white rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 hover:border-secondary/50 transition-all duration-300 hover:shadow-secondary/20"
            >
                <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <Flag className="w-4 h-4 fill-current" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/80 group-hover:text-secondary transition-colors">Official Registry</span>
                    <span className="text-sm font-black tracking-tight">
                        Navigate to {SITE.course.code}
                    </span>
                </div>
                <ArrowUpRight className="ml-2 w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
        </div>
    );
}
