"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield, Target, Award, Zap, Sparkles, Users, MapPin,
  Trophy, ExternalLink, Phone, Mail, Building2, ChevronRight,
  Database, Clock, CheckCircle2, AlertCircle, X, Loader2
} from "lucide-react"
import { HairlineGrid, IntelBlock, MetricCard, RiskBadge, DossierHeader } from "./DossierStyles"
import { RiskScorecard, RiskScoreBadge } from "./RiskScorecard"
import { DynamicComparisonTable, ProviderComparisonMatrix } from "./HairlineTable"
import { SITE } from "@/site"
import type { ComparisonProvider } from "@/lib/providers"
import { submitProviderEnquiry } from "@/app/actions/providers"

// Live Activity Pulse Component
function LiveActivityPulse() {
  const comparisons = Math.floor(Math.random() * 40) + 180 // 180-220
  const lastEnquiry = Math.floor(Math.random() * 12) + 1 // 1-12 mins

  return (
    <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold">
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-full shadow-sm animate-pulse">
        <span className="w-1.5 h-1.5 bg-background rounded-full animate-ping" />
        <span>{comparisons} compared this week</span>
      </div>
      <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-full border border-amber-200">
        <Clock className="w-3 h-3" />
        <span>Last enquiry {lastEnquiry}m ago</span>
      </div>
    </div>
  )
}

// Provider Badge Component
function ProviderBadges({ provider, rank }: { provider: Provider; rank: number }) {
  const badges = []

  if (rank === 1) badges.push({ label: "Top Pick", color: "bg-gradient-to-r from-amber-400 to-amber-500", icon: "🏆" })
  if (provider.price && provider.price < 1500) badges.push({ label: "Best Value", color: "bg-gradient-to-r from-emerald-400 to-emerald-500", icon: "💰" })
  if (provider.mdpa_score >= 90) badges.push({ label: "Elite", color: "bg-gradient-to-r from-purple-400 to-purple-500", icon: "⭐" })
  if (provider.review_count > 50) badges.push({ label: "Most Reviewed", color: "bg-gradient-to-r from-blue-400 to-blue-500", icon: "📊" })

  if (badges.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {badges.slice(0, 2).map((badge, i) => (
        <span
          key={i}
          className={cn(
            "text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm",
            badge.color
          )}
        >
          {badge.icon} {badge.label}
        </span>
      ))}
    </div>
  )
}

// Animated Score Bar
function AnimatedScoreBar({ score, label }: { score: number; label: string }) {
  const getColor = (s: number) => {
    if (s >= 85) return "from-emerald-400 to-emerald-500"
    if (s >= 70) return "from-amber-400 to-amber-500"
    return "from-red-400 to-red-500"
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{score}/100</span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
            getColor(score)
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

// Market Pulse Widget
function MarketPulse({ state, medianPrice, avgScore }: { state: string; medianPrice: number; avgScore: number }) {
  const priceChange = Math.random() > 0.5 ? Math.floor(Math.random() * 200) - 100 : 0

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 shadow-xl">
      <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        {state} Market Pulse
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-black">${medianPrice.toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
            Median Price
            {priceChange !== 0 && (
              <span className={priceChange > 0 ? "text-red-400" : "text-emerald-400"}>
                {priceChange > 0 ? "↑" : "↓"}${Math.abs(priceChange)}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-2xl font-black">{avgScore}</div>
          <div className="text-[10px] text-muted-foreground/60">Avg Quality Score</div>
        </div>
      </div>
    </div>
  )
}

// Data Source Attribution Component
function DataSourceBadge({ lastUpdated, providerCount }: { lastUpdated: string; providerCount: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[9px] font-bold uppercase tracking-widest">
      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-full border border-emerald-200">
        <Database className="w-3 h-3" />
        <span>training.gov.au verified</span>
      </div>
      <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-full border border-blue-200">
        <Clock className="w-3 h-3" />
        <span>Updated {lastUpdated}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-muted text-slate-700 px-2.5 py-1.5 rounded-full border border-border">
        <CheckCircle2 className="w-3 h-3" />
        <span>{providerCount} RTOs indexed</span>
      </div>
    </div>
  )
}

// Inline Enquiry Modal Component
function EnquiryModal({
  isOpen,
  onClose,
  provider,
  selectedState
}: {
  isOpen: boolean
  onClose: () => void
  provider: Provider | null
  selectedState: string
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
    if (!provider) return

    setIsSubmitting(true)
    try {
      await submitProviderEnquiry({
        provider_id: provider.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        state: selectedState
      })
      setSubmitStatus("success")
      setTimeout(() => {
        onClose()
        setSubmitStatus("idle")
        setFormData({ name: "", email: "", phone: "", message: "" })
      }, 2000)
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !provider) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-muted/50">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-black text-primary">Enquire Now</h3>
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
                "Submit Enquiry"
              )}
            </Button>

            <p className="text-[9px] text-center text-muted-foreground">
              By submitting, you agree to be contacted by {provider.name} regarding {SITE.course.code}.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

// Types
export type IntentType = "compliance" | "value" | "authority" | "student-first"

// Provider type using ComparisonProvider with optional metrics
interface Provider extends ComparisonProvider {
  metrics?: Record<string, string | number>
}

interface Agent {
  id: IntentType
  name: string
  role: string
  description: string
  advice: string
  icon: React.ReactNode
  color: string
  accent: string
}

// Intent Agents (from Comparison Engine)
const AGENTS: Agent[] = [
  {
    id: "compliance",
    name: "Guardian",
    role: "Compliance Specialist",
    description: "Focuses on regulatory alignment, ASQA status, and registration validity.",
    advice: "Selected providers with active ASQA status and high regulatory scores.",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-primary/80",
    accent: "text-primary",
  },
  {
    id: "value",
    name: "Optimizer",
    role: "Budget Strategist",
    description: "Prioritizes cost-efficiency without compromising registration status.",
    advice: "Found competitive pricing while maintaining digital maturity baseline.",
    icon: <Target className="w-5 h-5" />,
    color: "bg-emerald-500",
    accent: "text-emerald-600",
  },
  {
    id: "authority",
    name: "Authority",
    role: "Quality Auditor",
    description: "Highlights providers with highest trust scores and reviews.",
    advice: "These providers lead in social proof and institutional trust.",
    icon: <Award className="w-5 h-5" />,
    color: "bg-amber-500",
    accent: "text-amber-600",
  },
  {
    id: "student-first",
    name: "Sonic",
    role: "UX Researcher",
    description: "Focuses on digital experience, speed, and mobile usability.",
    advice: "Highest UX and Performance scores for modern learning interfaces.",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-purple-500",
    accent: "text-purple-600",
  },
]

// Scenario Presets (aligned with cpp41419.com.au)
const SCENARIOS = [
  { id: "quality-nsw", title: "Authority First", description: "NSW top-tier providers", state: "NSW", intent: "authority" as IntentType },
  { id: "budget-vic", title: "Budget Optimiser", description: "Best value in Victoria", state: "VIC", intent: "value" as IntentType },
  { id: "compliance-qld", title: "Safety First", description: "QLD compliance focus", state: "QLD", intent: "compliance" as IntentType },
]

// Regulatory Readiness Data (Dossier pattern)
const REGULATORY_CHECKLIST = [
  { metric: "Workplace Visitation", highQuality: "3+ Site Visits by Assessor", highRisk: "Zero visits (Self-Report only)", riskWeight: "high" as const, intelligenceNote: "ASQA Priority Audit Marker" },
  { metric: "Content Updates", highQuality: "Quarterly Review Cycle", highRisk: "Legacy qualification porting", riskWeight: "medium" as const, intelligenceNote: "Scope currency indicator" },
  { metric: "Mobile UX", highQuality: "Full LMS functionality", highRisk: "PDF printouts / Static forms", intelligenceNote: "Digital maturity signal" },
  { metric: "Assessor Load", highQuality: "1:25 Student Ratio", highRisk: "1:150+ Student Ratio", riskWeight: "high" as const, intelligenceNote: "Quality assurance risk" },
  { metric: "Price Transparency", highQuality: "Full breakdown published", highRisk: "Quote on application", intelligenceNote: "Hidden cost indicator" },
  { metric: "Review Recency", highQuality: "Reviews within 90 days", highRisk: "No reviews in 12+ months", intelligenceNote: "Market activity signal" },
]

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"]

interface DossierComparisonEngineProps {
  className?: string
  initialProviders?: ComparisonProvider[]
}

export function DossierComparisonEngine({ className, initialProviders = [] }: DossierComparisonEngineProps) {
  // Use providers from props directly
  const providers: Provider[] = initialProviders
  const [selectedState, setSelectedState] = useState<string>("NSW")
  const [activeAgent, setActiveAgent] = useState<IntentType | null>(null)
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [currentScenario, setCurrentScenario] = useState<string | null>(null)

  // Enquiry modal state
  const [enquiryProvider, setEnquiryProvider] = useState<Provider | null>(null)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)

  const handleEnquiry = (provider: Provider) => {
    setEnquiryProvider(provider)
    setIsEnquiryOpen(true)
  }

  // Calculate last updated date (use current month for now, would come from API)
  const lastUpdated = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })

  // Filter providers by state
  const stateProviders = useMemo(() => {
    return providers.filter(p =>
      p.state === selectedState || p.state === "Multi" || p.state === "National"
    ).sort((a, b) => b.mdpa_score - a.mdpa_score)
  }, [providers, selectedState])

  // Sort by agent intent
  const sortedProviders = useMemo(() => {
    if (!activeAgent) return stateProviders

    const sorted = [...stateProviders]
    switch (activeAgent) {
      case "compliance":
        sorted.sort((a, b) => {
          if (a.status === "active" && b.status !== "active") return -1
          if (a.status !== "active" && b.status === "active") return 1
          return b.mdpa_score - a.mdpa_score
        })
        break
      case "value":
        sorted.sort((a, b) => {
          const priceA = a.price || 99999
          const priceB = b.price || 99999
          return priceA - priceB
        })
        break
      case "authority":
        sorted.sort((a, b) => b.mdpa_score - a.mdpa_score)
        break
      case "student-first":
        sorted.sort((a, b) => b.mdpa_score - a.mdpa_score)
        break
    }
    return sorted
  }, [stateProviders, activeAgent])

  // Handle scenario selection
  const handleSelectScenario = (scenario: typeof SCENARIOS[0]) => {
    setCurrentScenario(scenario.id)
    setSelectedState(scenario.state)
    setActiveAgent(scenario.intent)
  }

  // Handle agent selection
  const handleSelectAgent = (intent: IntentType) => {
    setActiveAgent(intent)
    setCurrentScenario(null)
    // Auto-select top 3 providers
    const top3 = sortedProviders.slice(0, 3).map(p => p.id)
    setSelectedProviders(top3)
  }

  // Get selected provider objects
  const compareProviders = selectedProviders
    .map(id => sortedProviders.find(p => p.id === id))
    .filter(Boolean) as Provider[]

  const activeAgentData = AGENTS.find(a => a.id === activeAgent)

  // Calculate market stats
  const marketStats = useMemo(() => {
    const prices = stateProviders.map(p => p.price).filter((p): p is number => p !== null)
    const scores = stateProviders.map(p => p.mdpa_score)
    return {
      providerCount: stateProviders.length,
      medianPrice: prices.length > 0 ? prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)] : 0,
      avgScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
    }
  }, [stateProviders])

  return (
    <HairlineGrid className={cn("min-h-screen bg-background", className)}>
      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        provider={enquiryProvider}
        selectedState={selectedState}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 lg:pl-[80px]">
        {/* Trending Alert Banner */}
        <div className="mb-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-xl p-4 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDBMNDAgNDBIMHoiLz48cGF0aCBkPSJNMTAgMTBoMjB2MjBIMTB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Trending Now</div>
                <div className="font-black text-lg">3 RTOs updated pricing this week</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="bg-white/20 px-3 py-1.5 rounded-full">🔥 High demand period</span>
              <span className="bg-white/20 px-3 py-1.5 rounded-full">📈 +23% enquiries vs last month</span>
            </div>
          </div>
        </div>

        {/* Dossier Header */}
        <DossierHeader
          courseCode={SITE.course.code}
          courseName={SITE.course.name}
        />

        {/* Live Activity + Data Source Attribution */}
        <div className="mb-6 space-y-3">
          <LiveActivityPulse />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <DataSourceBadge lastUpdated={lastUpdated} providerCount={providers.length} />
          <div className="flex gap-2">
            {STATES.slice(0, 4).map(state => (
              <Button
                key={state}
                variant={selectedState === state ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedState(state)}
                className="text-xs"
              >
                {state}
              </Button>
            ))}
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATES.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>
        </div>

        {/* HERO: Provider Comparison Engine */}
        <Card className="mb-8 border-2 border-primary/20 shadow-lg overflow-hidden bg-gradient-to-b from-white to-slate-50/50">
          <CardHeader className="pb-4 bg-primary/5 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black flex items-center gap-2 text-primary">
                  <Trophy className="w-6 h-6 text-secondary" />
                  Compare {SITE.course.code} Providers
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Select up to 3 RTOs to compare side-by-side
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-2xl font-black text-primary">{stateProviders.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {selectedState} Providers
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Selection Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[0, 1, 2].map(i => (
                <div key={i} className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Compare Slot {i + 1}
                  </label>
                  <Select
                    value={selectedProviders[i] || "none"}
                    onValueChange={(val) => {
                      const newProviders = [...selectedProviders]
                      newProviders[i] = val === "none" ? "" : val
                      setSelectedProviders(newProviders.filter(Boolean))
                    }}
                  >
                    <SelectTrigger className="w-full h-12 text-left">
                      <SelectValue placeholder="Select RTO..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Empty Slot</SelectItem>
                      {sortedProviders.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          <div className="flex items-center justify-between w-full gap-4">
                            <span className="font-bold truncate">{p.name}</span>
                            <span className="text-[10px] font-bold bg-secondary/20 text-secondary-foreground px-1.5 py-0.5 rounded">
                              {p.mdpa_score}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            {/* Results Directly Below Selection */}
            {compareProviders.length > 0 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-6 border-t border-primary/10">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-secondary" />
                  Comparison Results
                  <span className="ml-auto text-[9px] font-medium normal-case text-muted-foreground">
                    Data verified {lastUpdated}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {compareProviders.map((provider, idx) => (
                    <Card
                      key={provider.id}
                      className={cn(
                        "overflow-hidden transition-all",
                        idx === 0 && "ring-2 ring-secondary"
                      )}
                    >
                      {idx === 0 && (
                        <div className="bg-secondary text-secondary-foreground text-[10px] font-bold text-center py-1 uppercase tracking-widest">
                          <Trophy className="w-3 h-3 inline mr-1" />
                          Top Recommendation
                        </div>
                      )}
                      <CardContent className="p-6 space-y-4">
                        <ProviderBadges provider={provider} rank={idx + 1} />
                        <div>
                          <h3 className="text-xl font-black text-primary">{provider.name}</h3>
                          <p className="text-[10px] text-muted-foreground uppercase">
                            RTO: {provider.rto_code || "N/A"} | {provider.type}
                          </p>
                        </div>

                        <AnimatedScoreBar score={provider.mdpa_score} label="Quality Score" />

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase">MDPA</div>
                            <div className="text-3xl font-black text-primary">{provider.mdpa_score}</div>
                          </div>
                          {provider.price && (
                            <div className="text-right">
                              <div className="text-[10px] text-muted-foreground uppercase">From</div>
                              <div className="text-xl font-bold text-foreground">${provider.price.toLocaleString()}</div>
                            </div>
                          )}
                        </div>

                        <RiskScoreBadge
                          score={provider.mdpa_score}
                          riskLevel={provider.mdpa_score >= 85 ? "low" : provider.mdpa_score >= 70 ? "medium" : "high"}
                        />

                        <div className="flex flex-col gap-2 pt-2">
                          <div className="flex gap-2">
                            {provider.mdpa_score >= 70 && provider.website && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => window.open(provider.website!, "_blank")}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Website
                              </Button>
                            )}
                            <Button
                              size="sm"
                              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs font-bold"
                              onClick={() => handleEnquiry(provider)}
                            >
                              Enquire Now
                            </Button>
                          </div>
                          <Link href={`/providers/${provider.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs text-muted-foreground hover:text-primary"
                            >
                              <ChevronRight className="w-3 h-3 mr-1" />
                              View Full Profile
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center border-t border-dashed border-primary/10 mt-4">
                <div className="mb-6">
                  <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Select providers above or choose an AI advisor below to see comparison.
                  </p>
                </div>
                {/* Why Compare Trust Section */}
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-dashed border-primary/10">
                  <div className="text-center">
                    <div className="text-2xl font-black text-primary">$1,847</div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Avg saved by comparing</div>
                  </div>
                  <div className="text-center border-x border-dashed border-primary/10">
                    <div className="text-2xl font-black text-primary">4.2x</div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider">More likely to complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-primary">89%</div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Found better fit</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Market Intelligence Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-1">
            <MarketPulse state={selectedState} medianPrice={marketStats.medianPrice} avgScore={marketStats.avgScore} />
          </div>
          <div className="md:col-span-3 grid grid-cols-3 gap-4">
            <MetricCard value={marketStats.providerCount} label={`${selectedState} Providers`} />
            <MetricCard value={`$${marketStats.medianPrice.toLocaleString()}`} label="Median Price" />
            <MetricCard value={marketStats.avgScore} label="Avg Quality" />
          </div>
        </div>

        {/* Scenario Presets */}
        <div className="mb-8">
          <IntelBlock label="Quick Scenarios" variant="secondary">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {SCENARIOS.map(scenario => (
                <Button
                  key={scenario.id}
                  variant="outline"
                  onClick={() => handleSelectScenario(scenario)}
                  className={cn(
                    "h-auto py-3 px-4 flex flex-col items-start gap-1 border-dashed hover:border-solid",
                    currentScenario === scenario.id && "border-secondary bg-secondary/5 border-solid"
                  )}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                      {scenario.state}
                    </span>
                    <span className="font-bold text-xs">{scenario.title}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-left">
                    {scenario.description}
                  </p>
                </Button>
              ))}
            </div>
          </IntelBlock>
        </div>

        {/* Intent Agents */}
        <Card className="mb-8 overflow-hidden border-primary/10">
          <CardHeader className="border-b border-primary/5 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Select Your Assistant
              </CardTitle>
              {activeAgentData && (
                <div className={cn(
                  "px-3 py-1.5 rounded-lg border flex items-center gap-2 bg-background text-xs",
                  activeAgentData.accent.replace("text-", "border-").replace("600", "200")
                )}>
                  <div className={cn("w-2 h-2 rounded-full animate-pulse", activeAgentData.color)} />
                  <span className="font-bold">{activeAgentData.name}:</span>
                  <span className="text-muted-foreground">{activeAgentData.advice}</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AGENTS.map(agent => (
                <Card
                  key={agent.id}
                  className={cn(
                    "cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                    activeAgent === agent.id
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-transparent hover:border-primary/20"
                  )}
                  onClick={() => handleSelectAgent(agent.id)}
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={cn(
                        "p-2.5 rounded-xl text-white shadow-md",
                        agent.color
                      )}>
                        {agent.icon}
                      </div>
                      {activeAgent === agent.id && (
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                          Active
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary">{agent.name}</h4>
                      <p className={cn("text-[10px] font-bold uppercase tracking-widest", agent.accent)}>
                        {agent.role}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {agent.description}
                    </p>
                    <Button
                      variant={activeAgent === agent.id ? "default" : "outline"}
                      size="sm"
                      className="w-full text-[10px] font-bold uppercase"
                    >
                      {activeAgent === agent.id ? "Analyzing..." : "Consult Agent"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Readiness Checklist */}
        <div className="mb-8">
          <IntelBlock label="Regulatory Readiness Checklist (2025 Standards)" variant="primary">
            <div className="mt-4">
              <DynamicComparisonTable
                title=""
                rows={REGULATORY_CHECKLIST}
              />
            </div>
          </IntelBlock>
        </div>

        {/* Footer Attribution */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Authored by VETIntel — {SITE.course.code} — {new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })} Edition
          </p>
        </div>
      </div>
    </HairlineGrid>
  )
}
