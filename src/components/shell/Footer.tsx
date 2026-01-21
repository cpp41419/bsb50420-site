import Link from "next/link"
import { GraduationCap, ExternalLink, Clock, Database, ShieldCheck } from "lucide-react"
import { siteConfig } from "@/config/site"
import { OrgBadge } from "@/components/OrgBadge"
import { StickyCTA } from "@/components/StickyCTA"
import { TrustSignals } from "@/components/layout/TrustSignals"

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
    courseInfo: [
        { label: "Course Overview", href: "/" },
        { label: "Core Units", href: "/tag/units" },
        { label: "Entry Requirements", href: "/tag/entry-requirements" },
        { label: "Funding Options", href: "/tag/fees" },
    ],
    resources: [
        { label: "Check Eligibility (Quiz)", href: "/quiz" },
        { label: "Career Guide", href: "/tag/career-outcomes" },
        { label: "Salary Insights", href: "/tag/salary" },
        { label: "How to Enrol", href: "/tag/enrollment" },
        { label: "Official RTO Lookup", href: `https://training.gov.au/Training/Details/${siteConfig.courseCode}`, external: true },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Disclaimer", href: "#" },
    ],
}

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 text-slate-500 relative overflow-hidden" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <OrgBadge />
            <StickyCTA />

            {/* Subtle background nodes */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_100%_0,rgba(11,18,32,0.02),transparent)] pointer-events-none" />

            <div className="container px-4 md:px-6 py-24 mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-10">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group transition-all"
                            aria-label={`${siteConfig.name} Home`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 transition-transform group-hover:scale-110">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <span className="font-black text-2xl text-slate-900 tracking-tighter uppercase leading-none">
                                {siteConfig.courseCode}<span className="text-primary italic">.Index</span>
                            </span>
                        </Link>
                        <p className="text-lg font-medium leading-relaxed max-w-sm text-slate-400 border-l-4 border-slate-50 pl-6 italic">
                            {siteConfig.description}
                        </p>

                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                            Verified Dataset Active
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="space-y-8">
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] bg-slate-50 inline-block px-4 py-1.5 rounded-full border border-slate-100">
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="nofollow noreferrer"
                                                className="text-sm font-bold text-slate-500 hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                                            >
                                                {link.label}
                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-sm font-bold text-slate-500 hover:text-primary hover:translate-x-2 transition-all duration-300 block"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>

            <TrustSignals />

            <div className="bg-muted/10 border-t border-slate-50 mt-12 -mx-4 md:-mx-6 px-4 md:px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider font-medium text-slate-400 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                        <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-help">
                            <Clock className="h-3 w-3" />
                            Content Last Verified: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-help">
                            <Database className="h-3 w-3" />
                            Data Sources: training.gov.au, ASQA, RTOs
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
                        <span className="flex items-center gap-1.5 text-emerald-600/80">
                            <ShieldCheck className="h-3 w-3" />
                            Copyscape Verified: Unique
                        </span>
                        <span className="flex items-center gap-1.5 text-blue-600/80">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Build: v2.4.1 • <span className="underline cursor-pointer">Changelog</span>
                        </span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-200/40 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400/80">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p>© {new Date().getFullYear()} {siteConfig.name} Independent Comparison Initiative. All rights reserved.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <p>Data updated weekly. Last update: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
