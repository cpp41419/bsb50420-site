import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Clock, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: `NSW Licensing Guide | ${SITE.course.code} Requirements & Application`,
  description: `Complete guide to obtaining licensing in NSW for ${SITE.course.name}. Requirements, application process, fees, and CPD obligations.`
};

export default function NSWPage() {
  const requirements = [
    `${SITE.course.code} ${SITE.course.name} (or equivalent)`,
    "Age 18 or older",
    "Fit and proper person (police check, financial probity)",
    "Professional indemnity insurance",
    "Public liability insurance (where applicable)",
    "Meet state-specific additional requirements"
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Complete Qualification",
      description: `Obtain ${SITE.course.code} from a registered RTO`
    },
    {
      step: 2,
      title: "Gather Documentation",
      description: "Police check, proof of qualifications, insurance certificates, identity documents"
    },
    {
      step: 3,
      title: "Complete Application",
      description: "Submit online application via NSW Fair Trading portal"
    },
    {
      step: 4,
      title: "Pay Fees",
      description: "Application and license fees (check current rates)"
    },
    {
      step: 5,
      title: "Assessment",
      description: "Fair Trading reviews application (4-6 weeks typical)"
    },
    {
      step: 6,
      title: "Receive License",
      description: "License issued electronically"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          NSW Licensing Guide
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about obtaining licensing in New South Wales for {SITE.course.name}
        </p>
      </div>

      <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-sm">
          <strong>Regulated by {SITE.regulators?.nsw || "NSW Fair Trading"}</strong> - Operating without appropriate
          licensing may carry significant penalties.
        </p>
      </div>

      {/* Requirements */}
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

      {/* Application Process */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Application Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {applicationSteps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CPD Requirements */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Continuing Professional Development (CPD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              NSW professionals must complete CPD requirements to maintain their license. Requirements vary by profession.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Check specific CPD point requirements for your license type</li>
              <li>Topics must be relevant to your professional practice</li>
              <li>Industry conferences, seminars, and workshops may count</li>
              <li>Record-keeping required for audit purposes</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Official Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" asChild>
              <a href="https://www.fairtrading.nsw.gov.au" target="_blank" rel="noopener noreferrer">
                NSW Fair Trading
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <a href="https://www.service.nsw.gov.au" target="_blank" rel="noopener noreferrer">
                Service NSW
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
