import React, { useState } from 'react';
import { LucideShieldCheck, LucideAward, LucideBanknote, LucideClock, LucideExternalLink, LucideSearch } from 'lucide-react';
import { DataLoader } from '@/lib/DataLoader';

const CourseGrid = () => {
    const [search, setSearch] = useState("");

    // Load real data if available, fallback to high-fidelity mock
    const realProviders = DataLoader.loadData<any[]>('providers.json');

    const providers = (realProviders && realProviders.length > 0) ? realProviders : [
        {
            name: "Leadership First Academy",
            rto: "RTO #45001",
            rating: 4.8,
            price: "$1,850",
            duration: "6-12 Months",
            delivery: "Online / Self-Paced",
            features: ["Expert Mentoring", "Digital Badge", "Lifetime Access"],
            badges: ["Gold Standard", "Value King"]
        },
        {
            name: "Strategic Management Institute",
            rto: "RTO #32111",
            rating: 4.9,
            price: "$2,400",
            duration: "9 Months",
            delivery: "Blended Learning",
            features: ["Workshop Access", "Fast-track Option", "Industry Network"],
            badges: ["Premium Choice", "Top Outcomes"]
        },
        {
            name: "National Career College",
            rto: "RTO #90082",
            rating: 4.6,
            price: "$1,200",
            duration: "12 Months",
            delivery: "Online Only",
            features: ["Affordable", "Mobile App", "Basic Support"],
            badges: ["Budget Friendly"]
        }
    ];

    const filtered = providers.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()) || p.rto.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="container px-4 mx-auto pb-24">
            {/* Search Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="relative w-full md:w-96">
                    <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search providers..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="whitespace-nowrap flex items-center gap-2 text-sm text-slate-500 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg">
                        <LucideShieldCheck className="w-4 h-4 text-green-500" />
                        Registry Verified
                    </div>
                    <div className="whitespace-nowrap flex items-center gap-2 text-sm text-slate-500 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg">
                        <LucideAward className="w-4 h-4 text-yellow-500" />
                        Quality Audited
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map((provider: any, i: number) => (
                    <div key={i} className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col">

                        {/* Top Bar (Badges) */}
                        <div className="p-6 pb-0 flex gap-2">
                            {provider.badges.map((badge: string, bi: number) => (
                                <span key={bi} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-primary/5 text-primary rounded-md border border-primary/10">
                                    {badge}
                                </span>
                            ))}
                        </div>

                        <div className="p-8 flex-grow">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                                {provider.name}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 uppercase tracking-tight">
                                {provider.rto}
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <LucideBanknote className="w-5 h-5 text-green-500" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Fee (Approx.)</span>
                                    </div>
                                    <span className="text-lg font-black text-slate-900 dark:text-white">{provider.price}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <LucideClock className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Duration</span>
                                    </div>
                                    <span className="text-lg font-black text-slate-900 dark:text-white">{provider.duration}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4">Core Benefits</h4>
                                <ul className="grid grid-cols-1 gap-3">
                                    {provider.features.map((feature: string, fi: number) => (
                                        <li key={fi} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700">
                            <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn">
                                Request Info Pack
                                <LucideExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseGrid;
