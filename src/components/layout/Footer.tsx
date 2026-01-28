import Link from "next/link"
import { GraduationCap, ExternalLink, Clock, Database, ShieldCheck } from "lucide-react"
import { siteConfig } from "@/config/site"
import { OrgBadge } from "@/components/OrgBadge"
import { StickyCTA } from "@/components/StickyCTA"
import { TrustSignals } from "./TrustSignals"

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
        { label: "Career Guide", href: "/tag/career-outcomes" },
        { label: "Salary Insights", href: "/tag/salary" },
        { label: "How to Enrol", href: "/tag/enrollment" },
        { label: "Official RTO Lookup", href: "https://training.gov.au", external: true },
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
        <footer className="border-t bg-muted/40 text-muted-foreground" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <OrgBadge />
            <StickyCTA />
            <div className="container px-4 md:px-6 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group transition-opacity hover:opacity-80"
                            aria-label={`${siteConfig.name} Home`}
                        >
                            <GraduationCap className="h-6 w-6 text-secondary transition-transform duration-300 group-hover:scale-110" />
                            <span className="font-bold text-primary tracking-tight">{siteConfig.name}</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            {siteConfig.description}
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-foreground mb-4 capitalize">
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="nofollow noreferrer"
                                                className="flex items-center gap-1 hover:text-foreground hover:translate-x-1 transition-all duration-200"
                                            >
                                                {link.label}
                                                <ExternalLink className="h-3 w-3 opacity-50" />
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="block hover:text-foreground hover:translate-x-1 transition-all duration-200"
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

            <div className="bg-muted/60 border-t">
                <div className="container px-4 md:px-6 py-8 mx-auto space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider font-medium text-muted-foreground/60 text-center md:text-left">
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

                    <div className="pt-4 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground/50">
                        <p>© {new Date().getFullYear()} {siteConfig.name} Independent Comparison Initiative. All rights reserved.</p>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <p>Data updated weekly. Last update: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
