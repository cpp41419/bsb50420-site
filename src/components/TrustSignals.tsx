import { ShieldCheck, Award, BookOpen, Banknote, CheckCircle2 } from "lucide-react";

export function TrustSignals() {
    return (
        <section className="py-16 bg-white border-b border-slate-100">
            <div className="container px-4 md:px-6 mx-auto">

                {/* Logos Strip */}
                <div className="mb-12 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Accreditation Standards</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos using text for now, but formatted to look like a logo bar */}
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-800"><ShieldCheck className="w-6 h-6" /> AQF Level 4</div>
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-800"><Award className="w-6 h-6" /> Nationally Recognised</div>
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-800"><CheckCircle2 className="w-6 h-6" /> ASQA Regulated</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="group relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Government Accredited</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            All listed courses are Nationally Recognised Training (NRT) strictly regulated by ASQA.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-100 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-amber-900/20 group-hover:scale-110 transition-transform">
                            <Award className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Industry Preferred</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Curriculum aligned with current 2026 industry standards and top employer requirements.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Flexible Delivery</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Compare 100% online, face-to-face, and hybrid options to fit your lifestyle.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="group relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                            <Banknote className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Funding Eligible</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Check eligibility for state and federal funding subsidies (Certificate 3 Guarantee, etc).
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
