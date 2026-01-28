import React from "react"
import { HeroSection, CourseGrid, Footer } from "@registry/comparison-engine"
import { DataLoader } from "@/lib/DataLoader"

export default function ComparePage() {
    const providers = DataLoader.loadData<any[]>('providers.json');
    return (
        <main className="min-h-screen bg-slate-50">
            <HeroSection />
            <CourseGrid providers={providers} />
            <Footer />
        </main>
    )
}
