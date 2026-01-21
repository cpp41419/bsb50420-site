"use client"

import Link from "next/link"
import { Menu, X, GraduationCap, ExternalLink } from "lucide-react"
import { useState } from "react"

import { SITE } from "@/site"
import { cn } from "@/lib/utils"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { name: "Course Info", href: "/#course-info" },
        { name: "Units", href: "/#units" },
        { name: "Career Outcomes", href: "/#careers" },
        { name: "FAQ", href: "/#faq" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-2xl transition-all duration-500">
            <div className="container flex h-20 items-center px-4 md:px-6 mx-auto relative">
                <Link href="/" className="flex items-center space-x-3 mr-4 lg:mr-12 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg shadow-slate-900/10">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="hidden font-black sm:inline-block text-xl tracking-tighter text-slate-900 uppercase">
                        {SITE.course.code}<span className="text-primary italic">.Index</span>
                    </span>
                </Link>

                {/* Desktop Nav - Changed to lg:flex to prevent overlap on tablets */}
                <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="transition-all hover:text-primary hover:-translate-y-0.5"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="h-4 w-px bg-slate-100" />
                    <a
                        href={`https://${SITE.answersDomain}`}
                        className="transition-all text-slate-900 hover:text-primary flex items-center gap-2 group/access"
                    >
                        Student Access Node
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/access:opacity-100 transition-opacity" />
                    </a>
                </nav>

                <div className="flex flex-1 items-center justify-end space-x-6">
                    <nav className="flex items-center space-x-4">
                        <Link
                            href="#compare"
                            className={cn(
                                "hidden lg:inline-flex",
                                "h-12 items-center justify-center rounded-xl bg-primary px-8 text-[11px] font-black text-white uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:bg-slate-900 hover:-translate-y-1 active:scale-95"
                            )}
                        >
                            Initiate Dataset Analysis
                        </Link>

                        {/* Mobile Menu Toggle - Visible up to lg */}
                        <button
                            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl border border-slate-100 text-slate-900 hover:bg-slate-50 transition-colors z-50"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 p-6 animate-in slide-in-from-top-4 duration-300 z-40 overflow-y-auto">
                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between text-sm font-black uppercase tracking-[0.2em] text-slate-500 py-4 border-b border-slate-50 hover:text-primary hover:bg-slate-50/50 px-2 rounded-lg transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <a
                            href={`https://${SITE.answersDomain}`}
                            className="flex items-center justify-between text-sm font-black uppercase tracking-[0.2em] text-slate-900 py-4 border-b border-slate-50 hover:text-primary hover:bg-slate-50/50 px-2 rounded-lg transition-all"
                        >
                            Student Access Platform
                            <ExternalLink className="w-4 h-4 opacity-50" />
                        </a>
                        <div className="pt-6">
                            <Link
                                href="#compare"
                                className="flex items-center justify-center rounded-xl bg-slate-900 px-6 py-4 text-xs font-black text-white uppercase tracking-widest shadow-xl hover:bg-primary transition-all w-full active:scale-95"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Course Research Node
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
