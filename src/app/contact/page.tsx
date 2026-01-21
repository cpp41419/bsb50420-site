import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE.course.code} Training Information`,
  description: `Get in touch with ${SITE.domain} for questions about training providers, course comparisons, or licensing requirements.`
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about {SITE.course.code} training providers or need help choosing the right RTO?
          We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <Mail className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Email Us</CardTitle>
            <CardDescription>Send us your questions</CardDescription>
          </CardHeader>
          <CardContent>
            <a href={`mailto:info@${SITE.domain}`} className="text-primary hover:underline">
              info@{SITE.domain}
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              We typically respond within 1-2 business days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MapPin className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Service Area</CardTitle>
            <CardDescription>Australia-wide coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We provide RTO comparison information for all Australian states and territories:
              NSW, VIC, QLD, WA, SA, TAS, NT, and ACT
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Business Hours</CardTitle>
            <CardDescription>When we're available</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monday - Friday<br />
              9:00 AM - 5:00 PM AEST<br />
              <span className="text-xs">(Closed weekends and public holidays)</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">{SITE.domain} is an independent comparison platform.</strong>
            {" "}We are not a Registered Training Organisation (RTO) and do not provide training or issue qualifications.
          </p>
          <p>
            <strong className="text-foreground">For course enrollment or specific course content questions</strong>,
            please contact RTOs directly using the contact information provided in our comparison tables.
          </p>
          <p>
            <strong className="text-foreground">For licensing questions</strong>, please contact your state or
            territory regulator (Fair Trading, Consumer Affairs, etc.) as listed in our state guides.
          </p>
          <p>
            We provide:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Unbiased RTO comparison information</li>
            <li>State licensing requirement guidance</li>
            <li>Industry and career pathway information</li>
            <li>General {SITE.course.code} qualification information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
