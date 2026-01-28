import { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/site";
import { Mail, MessageSquare, MapPin, Building2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `Contact | ${SITE.course.name || "Antigravity"}`,
  description: "Contact our intelligence desk for provider audits, student support, or general inquiries."
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            <MessageSquare className="w-4 h-4" />
            <span>Intelligence Desk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Submit an inquiry or request a specific provider audit.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info (Left Col) */}
            <div className="lg:col-span-1 space-y-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
                    <h3 className="font-bold text-slate-900 uppercase tracking-tight mb-8">Direct Channels</h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">General Inquiries</p>
                                <a href="mailto:hello@antigravity.au" className="font-medium text-slate-900 hover:text-primary transition-colors">hello@cpp41419.com.au</a>
                            </div>
                        </div>

                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Audit Requests</p>
                                <a href="mailto:audit@antigravity.au" className="font-medium text-slate-900 hover:text-primary transition-colors">audit@cpp41419.com.au</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Headquarters</p>
                                <p className="font-medium text-slate-900">Virtual Node: Sydney, NSW<br /><span className="text-slate-400 text-sm font-normal">Operated Distributively</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inquiry Form (Right Col) */}
            <div className="lg:col-span-2">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">Secure Transmission</h3>
                    
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                <input type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Jane Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input type="email" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="jane@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inquiry Type</label>
                            <select className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                                <option>General Inquiry</option>
                                <option>Request Provider Audit</option>
                                <option>Report Incorrect Data</option>
                                <option>Media / Press</option>
                            </select>
                        </div>

                         <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                            <textarea className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="How can we help?" />
                        </div>

                        <Button size="lg" className="w-full h-14 font-bold text-lg uppercase tracking-wide">
                            Send Transmission
                            <Send className="ml-2 w-5 h-5" />
                        </Button>
                        
                        <p className="text-center text-xs text-slate-400">
                            Your data is processed securely in accordance with our <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
                        </p>
                    </form>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
