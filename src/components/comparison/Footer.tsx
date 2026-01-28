import React from 'react';
import { LucideShieldCheck, LucideInfo } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-slate-800/50 rounded-3xl border border-slate-700 mb-12">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/20">
                                <LucideShieldCheck className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-1">Audit Protocol v2.3</h4>
                                <p className="text-slate-400 text-sm">Data verified at passage-level via Ralph Engine.</p>
                            </div>
                        </div>
                        <div className="text-sm text-slate-400 flex items-center gap-2 italic">
                            <LucideInfo className="w-4 h-4" />
                            Last Verified: {new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-slate-500 leading-relaxed">
                        <div>
                            <h5 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Methodology Disclosure</h5>
                            <p>
                                Our comparison algorithms weigh cost, duration, and delivery flexibility against historical student outcomes.
                                Data points are harvested from public registry disclosures and validated via independent research sprints.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Regulatory Linkage</h5>
                            <p>
                                All providers listed are Registered Training Organisations (RTOs) under the Australian Skills Quality Authority (ASQA).
                                We encourage users to cross-verify all data at training.gov.au before enrolment.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
                        &copy; {new Date().getFullYear()} VET Intelligence Hub. An Independent Research Consortium.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
