import { Metadata } from "next";
import { SITE } from "@/site";
import { Cookie, Info, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE.course.name || "Antigravity"}`,
  description: "Information about how we use cookies and tracking technologies."
};

export default function CookiePolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            <Cookie className="w-4 h-4" />
            <span>Privacy Compliance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparency about the data we collect to improve your experience.
          </p>
          <p className="text-sm text-muted-foreground mt-4 font-mono">
            Last Updated: {currentDate}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none dark:prose-invert">
          
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 mb-8">
            <h4 className="text-blue-900 dark:text-blue-400 font-bold m-0 flex items-center gap-2">
                <Info className="w-5 h-5" />
                What are cookies?
            </h4>
            <p className="text-blue-800/80 dark:text-blue-300/80 text-sm m-0 mt-2">
                Cookies are small text files placed on your device to help us identify you and improve our site performance. We use them strictly for analytics and functional purposes.
            </p>
          </div>

          <h2>1. Types of Cookies We Use</h2>
          
          <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h3 className="font-bold text-lg mb-2">Essential Cookies</h3>
                  <p className="text-sm text-muted-foreground">Necessary for the website to function. Without these, secure logins and navigation cannot work.</p>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h3 className="font-bold text-lg mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground">Help us understand visitor traffic and usage patterns (e.g., Google Analytics).</p>
              </div>
          </div>

          <h2>2. Your Choices</h2>
          <p>
            You can choose to disable cookies through your browser settings. However, doing so may limit your ability to use certain features of our website.
          </p>

          <h2>3. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
          </p>

          <div className="mt-12 p-8 bg-slate-100 dark:bg-slate-900 rounded-3xl text-center">
            <h3 className="text-xl font-bold mb-4">Questions about our data practices?</h3>
             <a href="/privacy" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold uppercase tracking-wide text-sm">
                View Privacy Policy <Shield className="w-4 h-4" />
             </a>
          </div>

        </div>
      </div>
    </div>
  );
}
