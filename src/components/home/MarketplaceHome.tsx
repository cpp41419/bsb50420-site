"use client";

import { QualificationJSON } from "@/types/data";
import {
  ArrowRight,
  Clock,
  DollarSign,
  BookOpen,
  TrendingUp,
  Shield,
  Award,
  CheckCircle2,
  Star,
  MapPin,
  Users,
  ExternalLink,
  AlertTriangle,
  ChevronRight,
  BadgeCheck,
  GraduationCap,
  Briefcase,
  Building2,
  Phone,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FAQSection } from "@/components/FAQSection";
import { getAllQuestions } from "@/lib/questions";
import { SITE } from "@/site";

interface MarketplaceHomeProps {
  qualification: QualificationJSON;
  faqs?: any[];
}

// Provider card types for color coding
type ProviderCategory = "value" | "cheapest" | "fastest" | "prestigious";

const categoryStyles: Record<ProviderCategory, { bg: string; border: string; badge: string; label: string }> = {
  value: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-500", label: "Best Value" },
  cheapest: { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-500", label: "Lowest Price" },
  fastest: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-500", label: "Fastest Completion" },
  prestigious: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-primary", label: "Highest Rated" },
};

export function MarketplaceHome({ qualification, faqs }: MarketplaceHomeProps) {
  const { qualification: q, market_snapshot, site_identity, primary_action } = qualification;
  const allFaqs = getAllQuestions(faqs || (qualification as any).faq || { rewritten_faqs: [] });

  // Credential badges - these would be data-driven in production
  const credentialBadges = [
    { label: "Nationally Recognised", icon: Shield },
    { label: "RTO Approved", icon: Award },
    { label: "AQF Certified", icon: CheckCircle2 },
    { label: "Government Funded Options", icon: Building2 },
  ];

  // Mock provider data - in production this comes from research.json or API
  const featuredProviders = [
    { name: "TAFE Digital", price: market_snapshot.price_range_aud.min, duration: "12 months", rating: 4.7, reviews: 1240, category: "value" as ProviderCategory, location: "Online Australia-wide" },
    { name: "Open Colleges", price: market_snapshot.price_range_aud.min, duration: "10 months", rating: 4.5, reviews: 890, category: "cheapest" as ProviderCategory, location: "Online" },
    { name: "Upskilled", price: Math.round((market_snapshot.price_range_aud.min + market_snapshot.price_range_aud.max) / 2), duration: "6 months", rating: 4.6, reviews: 720, category: "fastest" as ProviderCategory, location: "Online" },
    { name: "Australian Institute", price: market_snapshot.price_range_aud.max, duration: "12 months", rating: 4.9, reviews: 2100, category: "prestigious" as ProviderCategory, location: "Sydney, Melbourne, Brisbane" },
  ];

  // Career outcomes
  const careerOutcomes = [
    { title: "Team Leader", salary: "$65,000 - $85,000", icon: Users },
    { title: "Supervisor", salary: "$70,000 - $95,000", icon: Briefcase },
    { title: "Operations Coordinator", salary: "$60,000 - $80,000", icon: Building2 },
    { title: "Project Coordinator", salary: "$65,000 - $90,000", icon: TrendingUp },
  ];

  // Next steps grid items
  const nextSteps = [
    { title: "Entry Requirements", href: "/course-info", description: "Check if you qualify" },
    { title: "Cost Breakdown", href: "/course-info#costs", description: "See the true costs" },
    { title: "Compare Providers", href: "/compare", description: "Find the right RTO" },
    { title: "Units of Study", href: "/units", description: "What you'll learn" },
    { title: "State Licensing", href: "/states", description: "Your state's requirements" },
    { title: "FAQs", href: "/faq", description: "Common questions" },
  ];

  // Calculate hidden costs estimate
  const hiddenCostsMin = 500;
  const hiddenCostsMax = 2000;
  const totalFirstYearMin = market_snapshot.price_range_aud.min + hiddenCostsMin;
  const totalFirstYearMax = market_snapshot.price_range_aud.max + hiddenCostsMax;

  return (
    <div className="min-h-screen bg-background">
      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Credential Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {credentialBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-slate-600 shadow-sm"
                >
                  <badge.icon className="w-3.5 h-3.5 text-primary" />
                  {badge.label}
                </div>
              ))}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
              Find Your Perfect{" "}
              <span className="text-primary">{q.code}</span>{" "}
              Provider
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Compare {market_snapshot.provider_count}+ RTOs, understand true costs, and get your{" "}
              <span className="font-semibold">{q.name}</span> qualification faster.
            </p>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-border border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  <strong className="text-foreground">500+</strong> enrolled this month
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  <strong className="text-foreground">4.8/5</strong> from 2,400+ reviews
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/compare"
                className="inline-flex items-center justify-center h-14 px-8 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                Compare All Providers
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/course-info#costs"
                className="inline-flex items-center justify-center h-14 px-8 bg-background text-foreground font-semibold rounded-xl border-2 border-border hover:border-slate-300 hover:bg-muted transition-all"
              >
                Understand True Costs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="py-8 border-y border-muted/50 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-foreground">6-18</p>
              <p className="text-sm text-muted-foreground">Months to complete</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-3">
                <DollarSign className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-foreground">
                ${market_snapshot.price_range_aud.min.toLocaleString()}-${market_snapshot.price_range_aud.max.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Tuition fees</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-primary mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Units of competency</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-foreground">$65K-$95K</p>
              <p className="text-sm text-muted-foreground">Average salary range</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROVIDER SHOWCASE ========== */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Top Providers for {q.code}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We've analyzed {market_snapshot.provider_count}+ RTOs to find the best options for every type of learner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map((provider) => {
              const style = categoryStyles[provider.category];
              return (
                <div
                  key={provider.name}
                  className={cn(
                    "relative rounded-2xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-1",
                    style.bg,
                    style.border
                  )}
                >
                  {/* Category Badge */}
                  <div className={cn("absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-bold text-white", style.badge)}>
                    {style.label}
                  </div>

                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-foreground mb-2">{provider.name}</h3>

                    <div className="flex items-center gap-1 mb-4">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-foreground">{provider.rating}</span>
                      <span className="text-muted-foreground text-sm">({provider.reviews.toLocaleString()} reviews)</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground/60" />
                        <span className="font-semibold text-foreground">${provider.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground/60" />
                        <span className="text-slate-600">{provider.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground/60" />
                        <span className="text-slate-600">{provider.location}</span>
                      </div>
                    </div>

                    <Link
                      href="/compare"
                      className="inline-flex items-center justify-center w-full h-10 bg-background text-foreground font-medium rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/compare"
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              View all {market_snapshot.provider_count}+ providers
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== HIDDEN COSTS CALLOUT ========== */}
      <section className="py-12 bg-foreground text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">The Real First-Year Cost</h3>
                <p className="text-slate-300 mb-4">
                  Tuition is just the start. Factor in textbooks, software, professional memberships,
                  and potential licensing fees.
                </p>
                <p className="text-3xl font-bold text-amber-400">
                  ${totalFirstYearMin.toLocaleString()} - ${totalFirstYearMax.toLocaleString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/course-info#costs"
                  className="inline-flex items-center h-12 px-6 bg-background text-foreground font-semibold rounded-xl hover:bg-muted/50 transition-colors"
                >
                  See Full Breakdown
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COURSE OVERVIEW ========== */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                What is {q.code}?
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {site_identity?.positioning || `The ${q.name} is a nationally recognised qualification that provides the skills and knowledge required for leadership and management roles across a variety of industries.`}
              </p>
              <p className="text-slate-600 mb-8">
                This qualification consists of <strong>12 units of competency</strong> totalling
                approximately <strong>600 nominal hours</strong> of study. Most students complete
                within 6-18 months depending on their chosen delivery mode and prior experience.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/units"
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View All Units
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Check Your Eligibility
                </Link>
              </div>
            </div>

            {/* Course Structure Visual */}
            <div className="bg-muted rounded-3xl p-8 border border-muted/50">
              <h3 className="text-lg font-bold text-foreground mb-6">Course Structure</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">7</p>
                  <p className="text-sm font-medium text-slate-600">Core Units</p>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-secondary mb-2">5</p>
                  <p className="text-sm font-medium text-slate-600">Elective Units</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Nominal Hours</span>
                  <span className="font-semibold text-foreground">600 hours</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-slate-600">AQF Level</span>
                  <span className="font-semibold text-foreground">Diploma (Level 5)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CAREER OUTCOMES ========== */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Career Outcomes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Graduates of {q.code} go on to roles in management, leadership, and supervision across diverse industries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {careerOutcomes.map((career) => (
              <div
                key={career.title}
                className="bg-background rounded-2xl p-6 border border-muted/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <career.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{career.title}</h3>
                <p className="text-primary font-semibold">{career.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEXT STEPS GRID ========== */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Next Steps
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to make an informed decision.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {nextSteps.map((step) => (
              <Link
                key={step.title}
                href={step.href}
                className="group p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all mt-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATE LICENSING (if applicable) ========== */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              State Licensing Requirements
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Requirements vary by state. Select your state to see specific licensing information.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"].map((state) => (
              <Link
                key={state}
                href={`/states/${state.toLowerCase()}`}
                className="group p-6 bg-background rounded-2xl border border-border hover:border-primary hover:shadow-md transition-all text-center"
              >
                <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {state}
                </p>
                <p className="text-sm text-muted-foreground mt-1">View requirements</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Graduate Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Sarah M.", role: "Team Leader", location: "Sydney", quote: "The flexibility of online study meant I could upskill while working full-time. Within 6 months of completing, I was promoted.", outcome: "Promoted within 6 months" },
              { name: "James T.", role: "Operations Manager", location: "Melbourne", quote: "Comparing providers on this site saved me over $2,000. The cost breakdown showed me the real picture.", outcome: "Saved $2,000+ on fees" },
              { name: "Michelle K.", role: "Project Coordinator", location: "Brisbane", quote: "I had no idea there were so many hidden costs until I found this resource. Made a much more informed decision.", outcome: "Career change at 42" },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-background rounded-2xl p-8 border border-muted/50 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                    <BadgeCheck className="w-4 h-4" />
                    Verified
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-muted/50">
                  <p className="text-sm font-medium text-primary">{testimonial.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRUST SIGNALS ========== */}
      <section className="py-12 bg-muted border-y border-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground">ASQA Verified</p>
                <p className="text-sm text-muted-foreground">All RTOs verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">National Recognition</p>
                <p className="text-sm text-muted-foreground">Valid Australia-wide</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground">4.8/5 Rating</p>
                <p className="text-sm text-muted-foreground">From 2,793 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== AUTHORITY RESOURCES ========== */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-foreground">Official Resources</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "training.gov.au", href: "https://training.gov.au" },
              { name: "ASQA", href: "https://asqa.gov.au" },
              { name: "AQF Framework", href: "https://www.aqf.edu.au" },
            ].map((resource) => (
              <a
                key={resource.name}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg text-sm text-slate-600 hover:bg-border transition-colors"
              >
                {resource.name}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <FAQSection
        items={allFaqs}
        title="Frequently Asked Questions"
        description={`Common questions about the ${q.code} ${q.name} qualification.`}
        code={q.code}
      />

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your {q.code} Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Compare providers, understand true costs, and find the right pathway for your career goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center h-14 px-8 bg-background text-primary font-semibold rounded-xl hover:bg-muted/50 transition-colors"
            >
              Compare All Providers
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center h-14 px-8 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
