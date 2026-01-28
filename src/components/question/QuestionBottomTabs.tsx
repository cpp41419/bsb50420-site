"use client";

import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FAQItem } from "@/lib/questions";

interface QuestionBottomTabsProps {
    prev: FAQItem | null;
    next: FAQItem | null;
}

export function QuestionBottomTabs({ prev, next }: QuestionBottomTabsProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after small scroll
            if (window.scrollY > 150) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-[120%]"
                }`}
        >
            <div className="container mx-auto max-w-4xl px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                    {/* Prev */}
                    <div className="flex-1 min-w-0">
                        {prev ? (
                            <Link
                                href={`/question/${prev.slug}`}
                                className="flex flex-col items-start group"
                            >
                                <div className="flex items-center text-xs text-muted-foreground font-medium mb-0.5 group-hover:text-primary transition-colors">
                                    <ArrowLeft className="w-3 h-3 mr-1" />
                                    Previous
                                </div>
                                <div className="text-sm font-semibold text-slate-700 truncate w-full group-hover:text-primary transition-colors">
                                    {prev.question}
                                </div>
                            </Link>
                        ) : (
                            <div className="opacity-0 pointer-events-none">
                                <span className="text-xs">Start</span>
                            </div>
                        )}
                    </div>

                    {/* Center CTA - Mobile: Icon, Desktop: Full */}
                    <div className="shrink-0 mx-2">
                        <Link
                            href="/"
                            className="flex items-center justify-center h-10 px-4 bg-primary text-primary-foreground rounded-full font-bold shadow-md hover:bg-primary/90 transition-all hover:scale-105"
                        >
                            <Download className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Guide</span>
                            <span className="md:hidden">Guide</span>
                        </Link>
                    </div>

                    {/* Next */}
                    <div className="flex-1 min-w-0 text-right">
                        {next ? (
                            <Link
                                href={`/question/${next.slug}`}
                                className="flex flex-col items-end group"
                            >
                                <div className="flex items-center text-xs text-muted-foreground font-medium mb-0.5 group-hover:text-primary transition-colors">
                                    Next
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                </div>
                                <div className="text-sm font-semibold text-slate-700 truncate w-full group-hover:text-primary transition-colors">
                                    {next.question}
                                </div>
                            </Link>
                        ) : (
                            <Link href="/" className="flex flex-col items-end group">
                                <span className="text-xs text-muted-foreground">Finished?</span>
                                <span className="text-sm font-semibold">View All Topics</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Safe area for iPhone home bar */}
            <div className="h-safe-bottom bg-white/95 backdrop-blur" />
        </div>
    );
}
