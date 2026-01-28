import { Metadata } from "next";
import { SITE } from "@/site";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE.course.name || "Antigravity"}`,
  description: "Our commitment to protecting your personal information and data privacy."
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            <Shield className="w-4 h-4" />
            <span>Data Protection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We value your trust and are committed to protecting your personal data.
          </p>
          <p className="text-sm text-muted-foreground mt-4 font-mono">
            Last Updated: {currentDate}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 mb-12">
            <h3 className="flex items-center gap-2 text-lg font-bold mt-0">
              <Lock className="w-5 h-5 text-primary" />
              Key Privacy Principles
            </h3>
            <ul className="grid md:grid-cols-2 gap-4 mt-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Transparency:</strong> We are clear about what data we collect and why.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Security:</strong> We use industry-standard measures to protect your data.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Control:</strong> You have rights over your personal information.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Minimization:</strong> We only collect what is necessary.</span>
              </li>
            </ul>
          </div>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or otherwise communicate with us. This may include:
          </p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Demographic information</li>
            <li>Educational and professional background (for qualification inquiries)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to operate, maintain, and improve our services, such as:
          </p>
          <ul>
            <li>To provide and deliver the products and services you request.</li>
            <li>To send you technical notices, updates, security alerts, and administrative messages.</li>
            <li>To respond to your comments, questions, and customer service requests.</li>
            <li>To monitor and analyze trends, usage, and activities in connection with our services.</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do not share your personal information with third parties except as described in this policy, such as with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict the use of your data.
          </p>
          
          <div className="not-prose mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-muted-foreground text-sm">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
