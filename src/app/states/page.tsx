import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: `State Licensing Guides | ${SITE.course.code} Requirements by State`,
  description: `Complete licensing requirements for ${SITE.course.name} professionals in NSW, VIC, QLD, WA, SA, TAS, NT, and ACT. State-specific regulations, application processes, and CPD requirements.`
};

const states = [
  {
    code: "nsw",
    name: "New South Wales",
    regulator: "NSW Fair Trading",
    highlight: "Largest market in Australia"
  },
  {
    code: "vic",
    name: "Victoria",
    regulator: "Consumer Affairs Victoria (CAV)",
    highlight: "Strong professional requirements"
  },
  {
    code: "qld",
    name: "Queensland",
    regulator: "Office of Fair Trading (OFT)",
    highlight: "Growing demand"
  },
  {
    code: "wa",
    name: "Western Australia",
    regulator: "Department of Commerce",
    highlight: "Resource sector opportunities"
  },
  {
    code: "sa",
    name: "South Australia",
    regulator: "Consumer & Business Services",
    highlight: "Steady market"
  },
  {
    code: "tas",
    name: "Tasmania",
    regulator: "Consumer, Building & Occupational Services",
    highlight: "Emerging market"
  },
  {
    code: "nt",
    name: "Northern Territory",
    regulator: "Consumer Affairs NT",
    highlight: "Remote area opportunities"
  },
  {
    code: "act",
    name: "Australian Capital Territory",
    regulator: "Access Canberra",
    highlight: "Government sector focus"
  }
];

export default function StatesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          State Licensing Guides
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Licensing requirements, regulations, and application processes for {SITE.course.name} professionals
          vary by state. Select your state for detailed guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {states.map((state) => (
          <Card key={state.code} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">{state.name}</CardTitle>
              <CardDescription>{state.highlight}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-muted-foreground mb-1">Regulator</div>
                <div className="text-sm">{state.regulator}</div>
              </div>
              <Button asChild className="w-full">
                <Link href={`/states/${state.code}`}>
                  View {state.code.toUpperCase()} Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Important Information</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            All {SITE.course.name} professionals in Australia must hold appropriate state-based licensing
            or registration to legally practice. While {SITE.course.code} is nationally recognized, each state has its own
            regulatory framework and ongoing compliance requirements.
          </p>
          <p>
            Most states require:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>{SITE.course.code} or equivalent qualification</li>
            <li>Professional indemnity insurance</li>
            <li>Background and probity checks</li>
            <li>Continuing Professional Development (CPD)</li>
            <li>Code of conduct adherence</li>
          </ul>
          <p className="mt-4">
            Select your state above for specific requirements, application forms, fees, and regulatory contacts.
          </p>
        </div>
      </div>
    </div>
  );
}
