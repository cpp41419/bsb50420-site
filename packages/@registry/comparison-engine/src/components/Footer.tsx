import React from 'react';
import { LucideShieldCheck } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 mb-6 font-bold text-sm">
                            <LucideShieldCheck className="w-4 h-4 text-primary" />
                            Audit Protocol v2.3
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Methodology Disclosure</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm leading-relaxed">
                            This comparison index is generated using neutral, passage-level research from training.gov.au and primary RTO disclosures. Our analysts verify pricing and delivery modes every 72 hours to ensure accuracy. Registry scores are calculated based on historical completion rates and compliance audit history.
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-4">
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Registry Linkage</div>
                        <div className="flex gap-4">
                            <span className="text-xs font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer underline decoration-dotted">ASQA Standards</span>
                            <span className="text-xs font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer underline decoration-dotted">AQF Framework</span>
                            <span className="text-xs font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer underline decoration-dotted">Privacy Policy</span>
                        </div>
                        <p className="mt-8 text-xs text-slate-400 font-medium">
                            © 2026 VET Intelligence Registry Hub. All Rights Reserved. Neutral Authority v1.0
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
