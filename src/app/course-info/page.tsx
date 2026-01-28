import { DataLoader } from "@/lib/DataLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, DollarSign, GraduationCap, Users, BookOpen, AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import { SiteFundingCalculator } from "@/components/funding";
import { CourseGuideDownload } from "@/components/CourseGuideDownload";

export const metadata: Metadata = {
    title: "Course Information | Authority Guide",
    description: "Comprehensive breakdown of the qualification, including entry requirements, costs, and career outcomes.",
    alternates: {
        canonical: "/course-info",
    },
};

export default function CourseInfoPage() {
    const data = DataLoader.loadQualification();
    const info = data?.courseInfo;
    const qual = data?.qualification;

    if (!info || !qual) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold text-foreground">Course Information Unavailable</h1>
                <p className="text-muted-foreground mt-4">Detailed course information is currently being updated for this qualification.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>Qualification Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                        {qual.name} <span className="text-muted-foreground/40">({qual.code})</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
                        {info.overview}
                    </p>
                    <CourseGuideDownload courseCode={qual.code} courseName={qual.name} />
                </div>

                {/* Personas Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {info.personas.map((persona, index) => (
                        <Card key={index} className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                                    <Users className="w-5 h-5 text-primary" />
                                    {persona.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{persona.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Key Details Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Entry Requirements */}
                    <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-secondary" />
                            Entry Requirements
                        </h3>
                        <ul className="space-y-4">
                            {info.entryRequirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2.5" />
                                    <span className="text-muted-foreground">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-foreground">
                                    <h4 className="font-bold mb-1">Duration & Study Mode</h4>
                                    <p className="text-muted-foreground">{info.duration}</p>
                                    <p className="text-muted-foreground/60 text-sm mt-1">{info.studyModes}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="p-3 bg-secondary/10 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-secondary" />
                                </div>
                                <div className="text-foreground">
                                    <h4 className="font-bold mb-1">Cost Estimates</h4>
                                    <p className="font-medium text-foreground">{info.costs.average} <span className="text-muted-foreground font-normal">(Average)</span></p>
                                    <p className="text-muted-foreground text-sm mt-1">Range: {info.costs.range}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {info.costs.funding.map((fund, i) => (
                                            <span key={i} className="inline-block px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs font-semibold rounded">
                                                {fund}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Funding Calculator */}
                <div className="mb-16">
                    <SiteFundingCalculator
                        course={{
                            code: qual.code,
                            name: qual.name,
                            feeRange: {
                                min: data?.market_snapshot?.price_range_aud?.min ?? 1500,
                                max: data?.market_snapshot?.price_range_aud?.max ?? 4500,
                            },
                        }}
                        defaultState="nsw"
                    />
                </div>

                {/* Risk Radar */}
                {info.riskRadar && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                            {info.riskRadar.title}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {info.riskRadar.items.map((item, i) => (
                                <div key={i} className={`p-6 rounded-lg border-l-4 ${item.riskLevel === 'high' ? 'bg-destructive/10 border-destructive' : 'bg-secondary/10 border-secondary'}`}>
                                    <h4 className={`font-bold mb-2 ${item.riskLevel === 'high' ? 'text-destructive-foreground underline decoration-destructive/30' : 'text-secondary-foreground'}`}>{item.title}</h4>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Outcomes & Checklist */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <GraduationCap className="w-6 h-6 text-primary" />
                            Career Outcomes
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {info.outcomes.map((outcome, i) => (
                                <div key={i} className="px-4 py-2 bg-card border border-border rounded-lg text-foreground font-medium shadow-sm">
                                    {outcome}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary text-primary-foreground p-8 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-secondary">Provider Selection Checklist</h3>
                        <ul className="space-y-3">
                            {info.checklist.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                    <span className="text-primary-foreground/80 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
