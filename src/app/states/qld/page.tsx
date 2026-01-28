import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: `QLD Licensing Guide | ${SITE.course.code} Requirements & Application`,
  description: `Complete guide to obtaining licensing in Queensland for ${SITE.course.name}. Requirements, application process, fees, and CPD obligations.`
};

export default function QLDPage() {
  const requirements = [
    `${SITE.course.code} ${SITE.course.name} (or equivalent)`,
    "Age 18 or older",
    "Police check clearance",
    "Professional indemnity insurance",
    "Meet Office of Fair Trading requirements"
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Queensland Licensing Guide
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about obtaining licensing in Queensland for {SITE.course.name}
        </p>
      </div>

      <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-sm">
          <strong>Regulated by Office of Fair Trading (OFT)</strong>
        </p>
      </div>

      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              License Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Official Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" asChild>
              <a href="https://www.qld.gov.au/law/fair-trading" target="_blank" rel="noopener noreferrer">
                Queensland Fair Trading
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
