import { Metadata } from "next";
import { SITE } from "@/site";
import { FileText, AlertTriangle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE.course.name || "Antigravity"}`,
  description: "Terms and conditions governing your use of our website and services."
};

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            <Scale className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-muted-foreground mt-4 font-mono">
            Last Updated: {currentDate}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none dark:prose-invert">
          
          <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-100 dark:border-amber-900/30 mb-10 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-900 dark:text-amber-500 font-bold m-0 text-base">Important Notice</h4>
              <p className="text-amber-800/80 dark:text-amber-400/80 text-sm m-0 mt-1">
                By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
              </p>
            </div>
          </div>

          <h2>1. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on {SITE.org}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on {SITE.org}'s website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2>2. Disclaimer</h2>
          <p>
            The materials on {SITE.org}'s website are provided on an 'as is' basis. {SITE.org} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>3. Quality of Information</h2>
          <p>
             While we strive to provide accurate and up-to-date information regarding vocational education and training (VET) qualifications, regulatory standards and course details can change. We recommend verifying critical details with the relevant Registered Training Organisations (RTOs) or regulatory bodies.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall {SITE.org} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {SITE.org}'s website.
          </p>

          <h2>5. Links</h2>
          <p>
            {SITE.org} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {SITE.org} of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
          
        </div>
      </div>
    </div>
  );
}
