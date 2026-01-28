import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative pt-20 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-900">
            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
                        Dossier Authority Engine
                    </span>
                    <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                        Provider <span className="text-primary italic">Comparison</span> Index
                    </h1>
                    <p className="mb-10 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Independent audit of certified Registered Training Organisations (RTOs).
                        Data-driven evaluation of delivery models, pricing structures, and regulatory compliance.
                    </p>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>
        </section>
    );
};

export default HeroSection;
