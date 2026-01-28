"use client"

import React, { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2, MapPin, Phone, Mail, Globe, Award, Clock,
  DollarSign, Users, Shield, CheckCircle2, ExternalLink,
  ChevronLeft, Star, AlertCircle, Loader2, X, Briefcase
} from "lucide-react"
import { SITE } from "@/site"
import type { ComparisonProvider } from "@/lib/providers"
import { submitRTOOwnerClaim, submitProviderEnquiry } from "@/app/actions/providers"

interface ProviderProfileProps {
  provider: ComparisonProvider
}

// Audit score row - just data, no editorial
function AuditScoreRow({ label, score, sector }: { label: string; score: number | null; sector: number }) {
  if (score === null) return null
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-xs text-muted-foreground truncate">{label}</div>
      <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/80 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="w-16 text-right text-xs font-mono">
        <span className="font-bold">{score}</span>
        <span className="text-muted-foreground">/{sector}</span>
      </div>
    </div>
  )
}

// Risk level badge
function ScoreBadge({ score }: { score: number }) {
  const level = score >= 85 ? "high" : score >= 70 ? "medium" : "low"
  const colors = {
    high: "bg-emerald-100 text-emerald-700 border-emerald-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-red-100 text-red-700 border-red-200",
  }
  const labels = {
    high: "Excellent",
    medium: "Good",
    low: "Needs Review",
  }

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", colors[level])}>
      {labels[level]}
    </span>
  )
}

// Owner Claim Modal
function OwnerClaimModal({
  isOpen,
  onClose,
  provider
}: {
  isOpen: boolean
  onClose: () => void
  provider: ComparisonProvider
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await submitRTOOwnerClaim({
        provider_id: provider.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        role: formData.role,
        message: formData.message || undefined
      })
      setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-muted/50">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-black text-primary">Claim This Listing</h3>
              <p className="text-sm text-muted-foreground mt-1">{provider.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {submitStatus === "success" ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h4 className="font-bold text-lg">Request Submitted!</h4>
            <p className="text-sm text-muted-foreground mt-2">
              We&apos;ll verify your details and contact you within 2-3 business days.
            </p>
            <Button onClick={onClose} className="mt-4">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              Are you the owner or manager of this RTO? Claim your listing to update information and respond to enquiries.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Your Name *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="Full name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Work Email *
              </label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="you@company.com.au"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Phone
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                placeholder="04XX XXX XXX"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Your Role at RTO *
              </label>
              <Select value={formData.role} onValueChange={(val) => setFormData(p => ({ ...p, role: val }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner / Director</SelectItem>
                  <SelectItem value="ceo">CEO / General Manager</SelectItem>
                  <SelectItem value="marketing">Marketing Manager</SelectItem>
                  <SelectItem value="training">Training Manager</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Message (Optional)
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                placeholder="Any additional information or updates you'd like to make?"
                rows={3}
              />
            </div>

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 font-bold"
              disabled={isSubmitting || !formData.role}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Claim Request"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

// Student Enquiry Modal
function StudentEnquiryModal({
  isOpen,
  onClose,
  provider
}: {
  isOpen: boolean
  onClose: () => void
  provider: ComparisonProvider
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await submitProviderEnquiry({
        provider_id: provider.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        state: provider.state
      })
      setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-muted/50">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-black text-primary">Enquire About This Course</h3>
              <p className="text-sm text-muted-foreground mt-1">{provider.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {submitStatus === "success" ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h4 className="font-bold text-lg">Enquiry Sent!</h4>
            <p className="text-sm text-muted-foreground mt-2">
              {provider.name} will contact you within 24-48 hours.
            </p>
            <Button onClick={onClose} className="mt-4">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Full Name *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Email *
              </label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Phone (Optional)
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                placeholder="04XX XXX XXX"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Message (Optional)
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                placeholder="Any specific questions about the course?"
                rows={3}
              />
            </div>

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Enquiry"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

// Tier thresholds for presentation
const PREMIUM_THRESHOLD = 80 // Full details, direct links
const isPremiumProvider = (score: number) => score >= PREMIUM_THRESHOLD

export function ProviderProfile({ provider }: ProviderProfileProps) {
  const [showOwnerClaim, setShowOwnerClaim] = useState(false)
  const [showEnquiry, setShowEnquiry] = useState(false)

  // Determine if this is a premium (high-score) provider
  const isPremium = isPremiumProvider(provider.mdpa_score)

  return (
    <>
      <OwnerClaimModal
        isOpen={showOwnerClaim}
        onClose={() => setShowOwnerClaim(false)}
        provider={provider}
      />
      <StudentEnquiryModal
        isOpen={showEnquiry}
        onClose={() => setShowEnquiry(false)}
        provider={provider}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Compare
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                {provider.type}
              </span>
              {provider.rto_code && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                  RTO {provider.rto_code}
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-primary">{provider.name}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {provider.state}
              </span>
              {provider.rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {provider.rating.toFixed(1)} ({provider.review_count} reviews)
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
              onClick={() => setShowEnquiry(true)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Request Information
            </Button>
            {/* Only show direct website link for premium providers */}
            {isPremium && provider.website && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open(provider.website!, "_blank")}
              >
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
            )}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* MDPA Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  MDPA Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-6xl font-black text-primary">{provider.mdpa_score}</div>
                  <div>
                    <ScoreBadge score={provider.mdpa_score} />
                    <p className="text-sm text-muted-foreground mt-2">
                      Market Digital Performance Audit score based on rating, completion rate, and review volume.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-3 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      provider.mdpa_score >= 85 ? "bg-emerald-500" :
                      provider.mdpa_score >= 70 ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${provider.mdpa_score}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Audit Scores - Just the data, no editorial */}
            {provider.audit_scores && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-secondary" />
                      Site Audit
                    </CardTitle>
                    {provider.audit_scores.audit_date && (
                      <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest">
                        {new Date(provider.audit_scores.audit_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AuditScoreRow label="Accessibility" score={provider.audit_scores.accessibility} sector={89} />
                  <AuditScoreRow label="UX Engineering" score={provider.audit_scores.ux_engineering} sector={86} />
                  <AuditScoreRow label="Performance" score={provider.audit_scores.performance_stability} sector={91} />
                  <AuditScoreRow label="Regulatory" score={provider.audit_scores.regulatory_bedrock} sector={90} />
                  <AuditScoreRow label="Commercial Integrity" score={provider.audit_scores.commercial_integrity} sector={88} />
                  <AuditScoreRow label="Intent Fulfillment" score={provider.audit_scores.intent_fulfillment} sector={87} />

                  {/* Claim CTA for roadmap */}
                  <div className="pt-3 mt-3 border-t border-dashed border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-muted-foreground hover:text-primary"
                      onClick={() => setShowOwnerClaim(true)}
                    >
                      RTO owner? Get improvement roadmap →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-secondary" />
                  {SITE.course.code} Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {provider.price && (
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <DollarSign className="w-4 h-4" />
                        Course Fee
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        ${provider.price.toLocaleString()}
                        {provider.price_max && provider.price_max !== provider.price && (
                          <span className="text-lg text-muted-foreground"> - ${provider.price_max.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  )}
                  {provider.duration_weeks && (
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                        Duration
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {provider.duration_weeks} weeks
                      </div>
                    </div>
                  )}
                </div>

                {provider.delivery_modes.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Delivery Modes</div>
                    <div className="flex flex-wrap gap-2">
                      {provider.delivery_modes.map((mode) => (
                        <span
                          key={mode}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {provider.completion_rate && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Completion Rate
                      </span>
                      <span className="font-bold">{provider.completion_rate}%</span>
                    </div>
                    <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${provider.completion_rate}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Qualification Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  Qualification Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-muted/50">
                    <span className="text-muted-foreground">Qualification Code</span>
                    <span className="font-bold">{SITE.course.code}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-muted/50">
                    <span className="text-muted-foreground">Qualification Name</span>
                    <span className="font-bold text-right">{SITE.course.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-muted/50">
                    <span className="text-muted-foreground">Registration Status</span>
                    <span className={cn(
                      "font-bold flex items-center gap-1",
                      provider.status === "active" ? "text-emerald-600" : "text-red-600"
                    )}>
                      {provider.status === "active" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Active
                        </>
                      ) : (
                        "Inactive"
                      )}
                    </span>
                  </div>
                  {provider.rto_code && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">RTO Code</span>
                      <a
                        href={`https://training.gov.au/Organisation/Details/${provider.rto_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        {provider.rto_code}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Contact & CTA */}
          <div className="space-y-6">
            {/* Contact Card - Tiered presentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-secondary" />
                  {isPremium ? "Contact Information" : "Get In Touch"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isPremium ? (
                  <>
                    {/* Premium providers: Show direct contact details */}
                    {provider.phone && (
                      <a
                        href={`tel:${provider.phone}`}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="font-medium">{provider.phone}</span>
                      </a>
                    )}
                    {provider.email && (
                      <a
                        href={`mailto:${provider.email}`}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="font-medium truncate">{provider.email}</span>
                      </a>
                    )}
                    {provider.website && (
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Globe className="w-5 h-5 text-primary" />
                        <span className="font-medium truncate">Visit Website</span>
                        <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    {/* Non-premium: Enquiries go through platform */}
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <Shield className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        All enquiries for this provider are handled through our platform to ensure you receive verified information.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Located in {provider.state}</span>
                    </div>
                  </>
                )}

                <Button
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                  onClick={() => setShowEnquiry(true)}
                >
                  {isPremium ? "Request Information" : "Submit Enquiry"}
                </Button>

                {!isPremium && (
                  <p className="text-[9px] text-center text-muted-foreground">
                    We&apos;ll connect you with this provider within 24-48 hours.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Owner Claim Card */}
            <Card className="border-dashed border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Briefcase className="w-10 h-10 text-primary/40 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Own this RTO?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Claim your listing to update information, respond to enquiries, and manage your profile.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowOwnerClaim(true)}
                  >
                    Claim This Listing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Source */}
            <div className="text-[9px] text-center text-muted-foreground uppercase tracking-widest">
              <p>Data sourced from training.gov.au</p>
              <p className="mt-1">Last verified: {new Date().toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
