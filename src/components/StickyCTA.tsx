"use client";

import { ArrowRight, Download, X } from "lucide-react";
import { useState, useEffect } from "react";
import { SITE } from "@/site";
import { useAnalytics } from "@/lib/useAnalytics";

export function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const { track } = useAnalytics();

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

    if (isDismissed) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-4 shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}
        >
            <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Download className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-bold text-foreground leading-tight">
                            Get the 2026 {SITE.course.code} Course Guide
                        </p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                            Includes units, government funding, and fee lists.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => {
                            track('download_intent_click', { source: 'sticky_cta' });
                            console.log("Download Clicked - Event Tracked");
                        }}
                        className="flex-1 sm:flex-none h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        Download Now <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
