import { Metadata } from "next";
import { SITE } from "@/site";
import { Map, ArrowRight, FileText, Database, Shield } from "lucide-react";
import Link from "next/link";
import { DataLoader } from "@/lib/DataLoader";

export const metadata: Metadata = {
  title: `Sitemap | ${SITE.course.name || "Antigravity"}`,
  description: "Complete index of all resources and guides available on our platform."
};

export default function SitemapPage() {
  const cities = DataLoader.getAllCities();
  // We would also fetch posts here if we had a direct list helper, but for now we'll link to main sections

  const sections = [
    {
      title: "Core Resources",
      icon: Database,
      links: [
        { label: "Homepage", url: "/" },
        { label: "Compare Providers", url: "/compare" },
        { label: "Units of Competency", url: "/units" },
        { label: "Search Registry", url: "/search" },
      ]
    },
    {
      title: "State Licensing Guides",
      icon: Map,
      links: [
        { label: "NSW Licensing Guide", url: "/states/nsw" },
        { label: "VIC Licensing Guide", url: "/states/vic" },
        { label: "QLD Licensing Guide", url: "/states/qld" },
        { label: "WA Licensing Guide", url: "/states/wa" },
      ]
    },
    {
      title: "Legal & Transparency",
      icon: Shield,
      links: [
        { label: "About / Methodology", url: "/about" },
        { label: "Contact Intelligence Desk", url: "/contact" },
        { label: "Privacy Policy", url: "/privacy" },
        { label: "Terms of Service", url: "/terms" },
        { label: "Cookie Policy", url: "/cookies" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            <Map className="w-4 h-4" />
            <span>Site Index</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 uppercase">
            Sitemap
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl">
            Complete navigational index of the {SITE.course.code} Intelligence Platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <section.icon className="w-5 h-5" />
                        </div>
                        <h2 className="font-bold text-slate-900 uppercase tracking-tight">{section.title}</h2>
                    </div>
                    
                    <ul className="space-y-4">
                        {section.links.map((link, lIdx) => (
                            <li key={lIdx}>
                                <Link href={link.url} className="group flex items-center justify-between text-slate-600 hover:text-primary transition-colors py-2 border-b border-slate-50 last:border-0 hover:pl-2">
                                    <span className="font-medium text-sm">{link.label}</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        
        {/* Locations Grid */}
        <div className="mt-12 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Map className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-slate-900 uppercase tracking-tight">Regional Coverage</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cities.length > 0 ? cities.map((city, idx) => (
                    <Link key={idx} href={`/${city.slug}`} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                        {city.name}
                    </Link>
                )) : (
                    <p className="text-sm text-slate-400 italic col-span-4">No regional nodes indexed yet.</p>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}
