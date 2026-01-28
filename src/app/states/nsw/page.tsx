import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, Clock, ShieldCheck, ExternalLink, ArrowRight, MapPin, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: `NSW Licensing Guide | ${SITE.course.code} Requirements & Application`,
  description: `Complete guide to obtaining licensing in NSW for ${SITE.course.name}. Requirements, application process, fees, and CPD obligations.`
};

export default function NSWPage() {
  const requirements = [
    `${SITE.course.code} ${SITE.course.name} (or equivalent)`,
    "Age 18 or older",
    "Fit and proper person (police check, financial probity)",
    "Professional indemnity insurance",
    "Public liability insurance (where applicable)",
    "Meet state-specific additional requirements"
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Complete Qualification",
      description: `Obtain ${SITE.course.code} from a registered RTO`,
      duration: "12-24 Months"
    },
    {
      step: 2,
      title: "Gather Documentation",
      description: "Police check, proof of qualifications, insurance certificates, identity documents",
      duration: "1-2 Weeks"
    },
    {
      step: 3,
      title: "Complete Application",
      description: "Submit online application via NSW Fair Trading portal",
      duration: "1 Hour"
    },
    {
      step: 4,
      title: "Assessment",
      description: "Fair Trading reviews application",
      duration: "4-6 Weeks"
    },
    {
      step: 5,
      title: "Receive License",
      description: "License issued electronically",
      duration: "Instant"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-[#0B1220] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#0B1220_100%)] z-10" />
        <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] z-0" />
        
        <div className="container relative z-20 px-4 md:px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                <MapPin className="w-3 h-3" />
                State Intelligence Node: NSW
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6 max-w-4xl">
              New South Wales <br /> <span className="text-secondary">Licensing Protocol</span>
            </h1>
            
            <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed mb-8">
              The definitive regulatory guide for {SITE.course.name} professionals operating in NSW.
            </p>

            <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Building2 className="w-3 h-3 text-secondary" />
                    Regulator: {SITE.regulators?.nsw || "NSW Fair Trading"}
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Clock className="w-3 h-3 text-secondary" />
                    Processing: 4-6 Weeks
                </div>
                 <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <ShieldCheck className="w-3 h-3 text-secondary" />
                    Mandatory Licensing
                </div>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Key Info */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Requirements Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Core Requirements</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        {requirements.map((req, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm font-medium text-slate-700">{req}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Application Process Timeline */}
                 <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-secondary" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Application Timeline</h2>
                    </div>

                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:h-[calc(100%-24px)] before:w-0.5 before:bg-slate-100">
                        {applicationSteps.map((item, idx) => (
                            <div key={item.step} className="relative flex gap-6">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center z-10 shadow-sm">
                                    <span className="text-sm font-black text-slate-400">{item.step}</span>
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                        <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">{item.duration}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

            </div>

            {/* Right Column: Regulator & CPD */}
            <div className="space-y-6">
                
                {/* Regulator Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                     {/* Decorative bg */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/30 transition-all" />
                     
                     <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block">Authority Node</span>
                                <h3 className="text-lg font-black uppercase tracking-tight">NSW Fair Trading</h3>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                             <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-1">Status</div>
                                <div className="text-sm font-bold text-green-400 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Active Regulatory Body
                                </div>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-1">Enforcement</div>
                                <div className="text-sm font-bold text-white">Strict Compliance</div>
                            </div>
                        </div>
                        
                        <Button variant="secondary" className="w-full font-bold uppercase tracking-wider text-xs h-12" asChild>
                            <a href="https://www.fairtrading.nsw.gov.au" target="_blank" rel="noopener noreferrer">
                                Access Portal <ExternalLink className="ml-2 w-3 h-3" />
                            </a>
                        </Button>
                     </div>
                </div>

                {/* CPD Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        CPD Obligations
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        NSW professionals must maintain currency through Continuing Professional Development.
                    </p>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-xs font-bold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            Check specific points cap
                        </li>
                        <li className="flex items-start gap-2 text-xs font-bold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            Maintain audit records (5 yrs)
                        </li>
                        <li className="flex items-start gap-2 text-xs font-bold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            Relevance to practice area
                        </li>
                    </ul>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-[10px] font-bold text-amber-800 uppercase tracking-wide text-center">
                        Audit Frequency: High
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
