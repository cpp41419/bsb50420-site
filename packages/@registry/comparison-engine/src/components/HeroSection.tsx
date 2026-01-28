import React from 'react';

export const HeroSection = () => {
    return (
        <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all hover:bg-primary/15">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-bold tracking-wider uppercase text-primary">Registry Live Data Feed</span>
                    </div>

                    <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Provider <span className="text-primary italic">Comparison</span> Index
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl font-medium leading-relaxed">
                        Neutral, data-driven analysis of Registered Training Organisations (RTOs).
                        Compare pricing, delivery modes, and verified registry outcomes to make an informed decision.
                    </p>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>
    );
};
