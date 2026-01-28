
import { DataLoader } from "@/lib/DataLoader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layers, FileText, CheckSquare } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Units of Competency | Qualification Structure",
    description: "Detailed breakdown of core and elective units required for this qualification.",
    alternates: {
        canonical: "/units",
    },
};

export default function UnitsPage() {
    const data = DataLoader.loadQualification();
    const units = data?.units || [];
    const qual = data?.qualification;

    // Group units by type
    const coreUnits = units.filter(u => u.type === 'Core');
    const electiveUnits = units.filter(u => u.type === 'Elective');

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                        <Layers className="w-4 h-4" />
                        <span>Curriculum Structure</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                        Units of Competency
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive breakdown of the {units.length} units ({coreUnits.length} Core, {electiveUnits.length} Elective) comprising {qual?.code}.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">

                    {/* Core Units Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">C</span>
                            Core Units
                        </h2>
                        <div className="bg-muted/30 border border-border rounded-xl overflow-hidden shadow-sm">
                            <Accordion type="single" collapsible className="w-full">
                                {coreUnits.map((unit, i) => (
                                    <AccordionItem key={i} value={`core-${unit.code}`} className="px-6 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                                        <AccordionTrigger className="hover:no-underline py-5 text-left">
                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full pr-4">
                                                <span className="font-mono text-muted-foreground font-medium text-sm w-28 shrink-0">{unit.code}</span>
                                                <span className="font-bold text-foreground text-lg">{unit.title}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="grid md:grid-cols-2 gap-6 pl-0 md:pl-[8.5rem]">
                                                <div>
                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                                                        <FileText className="w-4 h-4 text-primary" />
                                                        What you'll do
                                                    </h4>
                                                    <p className="text-muted-foreground leading-relaxed text-sm">{unit.description}</p>
                                                </div>
                                                <div>
                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                                                        <CheckSquare className="w-4 h-4 text-secondary" />
                                                        Evidence Required
                                                    </h4>
                                                    <p className="text-muted-foreground leading-relaxed text-sm bg-background p-3 rounded-lg border border-border">
                                                        {unit.evidence}
                                                    </p>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/* Elective Units Section */}
                    {electiveUnits.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm">E</span>
                                Elective Units
                            </h2>
                            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                                <Accordion type="single" collapsible className="w-full">
                                    {electiveUnits.map((unit, i) => (
                                        <AccordionItem key={i} value={`elec-${unit.code}`} className="px-6 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                                            <AccordionTrigger className="hover:no-underline py-5 text-left">
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full pr-4">
                                                    <span className="font-mono text-muted-foreground font-medium text-sm w-28 shrink-0">{unit.code}</span>
                                                    <span className="font-bold text-foreground text-lg">{unit.title}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-6 pt-2">
                                                <div className="grid md:grid-cols-2 gap-6 pl-0 md:pl-[8.5rem]">
                                                    <div>
                                                        <h4 className="flex items-center gap-2 text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                                                            <FileText className="w-4 h-4 text-primary" />
                                                            What you'll do
                                                        </h4>
                                                        <p className="text-muted-foreground leading-relaxed text-sm">{unit.description}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="flex items-center gap-2 text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
                                                            <CheckSquare className="w-4 h-4 text-secondary" />
                                                            Evidence Required
                                                        </h4>
                                                        <p className="text-muted-foreground leading-relaxed text-sm bg-muted/30 p-3 rounded-lg border border-border">
                                                            {unit.evidence}
                                                        </p>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
