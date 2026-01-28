"use client"

/**
 * Dossier Design System - Hybrid with Comparison Engine
 * Aligned to cpp41419.com.au IA
 *
 * Design Ideology:
 * - Authority/Intelligence aesthetic
 * - Hairline grid backgrounds
 * - Risk visualization
 * - Dynamic comparison matrix
 */

import { cn } from "@/lib/utils"

// Design tokens aligned with VETIntel Dossier
export const DOSSIER_TOKENS = {
  colors: {
    primary: "#1A2DB0",        // Authority Blue
    secondary: "#3076FC",      // Action Blue
    riskLow: "#10B981",        // Emerald
    riskMed: "#F59E0B",        // Amber
    riskHigh: "#F97316",       // Orange
    riskCritical: "#EF4444",   // Red
    surface: "#FAFAFA",
    border: "#E5E7EB",
  },
  spacing: {
    sidebar: "60px",
    container: "max-w-7xl",
  }
}

// Hairline Grid Background
export function HairlineGrid({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Authority Sidebar (vertical text branding)
export function AuthoritySidebar({ text = "VETINTEL AUTHORITY STANDARD" }: { text?: string }) {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-[60px] bg-background border-r border-border z-40 hidden lg:flex items-center justify-center">
      <span
        className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase whitespace-nowrap"
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      >
        {text}
      </span>
    </div>
  )
}

// Intel Block (left-bordered content section)
export function IntelBlock({
  label,
  children,
  variant = "primary",
  className
}: {
  label?: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "risk"
  className?: string
}) {
  const borderColor = {
    primary: "border-l-primary",
    secondary: "border-l-secondary",
    risk: "border-l-orange-500"
  }[variant]

  return (
    <div className={cn("border-l-2 pl-4 py-2", borderColor, className)}>
      {label && (
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
          {label}
          <div className="flex-1 h-px bg-border" />
        </div>
      )}
      {children}
    </div>
  )
}

// Risk Badge
export function RiskBadge({
  level,
  label
}: {
  level: "low" | "medium" | "high" | "critical"
  label?: string
}) {
  const config = {
    low: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", default: "LOW RISK" },
    medium: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", default: "MEDIUM" },
    high: { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500/20", default: "HIGH RISK" },
    critical: { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500/20", default: "CRITICAL" }
  }[level]

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border",
      config.bg, config.text, config.border
    )}>
      {label || config.default}
    </span>
  )
}

// Metric Card (Dossier style)
export function MetricCard({
  value,
  label,
  trend,
  className
}: {
  value: string | number
  label: string
  trend?: "up" | "down" | "neutral"
  className?: string
}) {
  return (
    <div className={cn(
      "bg-card border border-border rounded-lg p-4 text-center",
      className
    )}>
      <div className="text-3xl font-black text-primary">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
        {label}
      </div>
      {trend && (
        <div className={cn(
          "text-[9px] mt-1",
          trend === "up" && "text-emerald-600",
          trend === "down" && "text-red-600",
          trend === "neutral" && "text-muted-foreground"
        )}>
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {trend === "neutral" && "—"}
        </div>
      )}
    </div>
  )
}

// Dossier Header
export function DossierHeader({
  courseCode,
  courseName,
  edition = new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
}: {
  courseCode: string
  courseName: string
  edition?: string
}) {
  return (
    <div className="border-b border-border pb-6 mb-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
            Intelligence Dossier
          </div>
          <h1 className="text-4xl font-black text-primary tracking-tight">
            {courseCode}
          </h1>
          <p className="text-lg text-muted-foreground mt-1">{courseName}</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-muted-foreground uppercase">{edition} Edition</div>
          <div className="text-[9px] text-muted-foreground mt-1">Verified Registry Data</div>
        </div>
      </div>
    </div>
  )
}
