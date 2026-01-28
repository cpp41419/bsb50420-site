"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Trophy, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

// Generic Hairline Table
interface HairlineTableProps {
  headers: string[]
  rows: {
    metric: string
    values: (string | number | { value: string | number; status?: "good" | "bad" | "neutral" })[]
    riskWeight?: "high" | "medium" | "low"
  }[]
  className?: string
  highlightWinner?: boolean
}

export function HairlineTable({
  headers,
  rows,
  className,
  highlightWinner = true
}: HairlineTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className={cn(
                  "px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider",
                  idx === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/90 text-primary-foreground"
                )}
                style={{ borderRight: idx < headers.length - 1 ? "0.5px solid rgba(255,255,255,0.2)" : undefined }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn(
                "border-b border-border/50 hover:bg-muted/30 transition-colors",
                row.riskWeight === "high" && "bg-red-500/5"
              )}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">{row.metric}</span>
                  {row.riskWeight === "high" && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 uppercase">
                      High Risk
                    </span>
                  )}
                </div>
              </td>
              {row.values.map((cell, cellIdx) => {
                const cellValue = typeof cell === "object" ? cell.value : cell
                const cellStatus = typeof cell === "object" ? cell.status : undefined

                return (
                  <td
                    key={cellIdx}
                    className={cn(
                      "px-4 py-3 text-sm",
                      cellStatus === "good" && "bg-emerald-500/5 text-emerald-700 font-medium",
                      cellStatus === "bad" && "bg-red-500/5 text-red-700",
                      !cellStatus && "text-muted-foreground"
                    )}
                    style={{ borderLeft: "0.5px solid var(--border)" }}
                  >
                    <div className="flex items-center gap-2">
                      {cellStatus === "good" && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                      {cellStatus === "bad" && <XCircle className="w-3.5 h-3.5 text-red-500" />}
                      {cellValue}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Dynamic Comparison Table (Good RTO vs Bad RTO pattern from Dossier)
interface ComparisonRow {
  metric: string
  highQuality: string
  highRisk: string
  riskWeight?: "high" | "medium" | "low"
  intelligenceNote?: string
}

interface DynamicComparisonTableProps {
  title?: string
  rows: ComparisonRow[]
  className?: string
}

export function DynamicComparisonTable({
  title = "Regulatory Readiness Checklist",
  rows,
  className
}: DynamicComparisonTableProps) {
  return (
    <div className={cn("border border-border rounded-xl overflow-hidden", className)}>
      {title && (
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {title}
          </h3>
        </div>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider bg-primary text-primary-foreground w-1/4">
              Metric
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white w-1/4">
              <div className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5" />
                High Quality RTO
              </div>
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider bg-red-600 text-white w-1/4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                High Risk RTO
              </div>
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider bg-primary/80 text-primary-foreground w-1/4">
              Intelligence Note
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={cn(
                "border-b border-border/50 hover:bg-muted/30 transition-colors",
                row.riskWeight === "high" && "bg-red-500/5"
              )}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{row.metric}</span>
                  {row.riskWeight === "high" && (
                    <span className="text-[8px] font-black px-1 py-0.5 rounded bg-red-500/20 text-red-600 uppercase">
                      High Risk Weight
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 bg-emerald-500/5 border-l border-border/50">
                <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {row.highQuality}
                </div>
              </td>
              <td className="px-4 py-3 bg-red-500/5 border-l border-border/50">
                <div className="flex items-center gap-2 text-red-700 text-sm">
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  {row.highRisk}
                </div>
              </td>
              <td className="px-4 py-3 border-l border-border/50">
                <span className="text-xs text-muted-foreground italic">
                  {row.intelligenceNote || "—"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Provider Comparison Matrix (from Comparison Engine)
interface Provider {
  id: string
  name: string
  score: number
  metrics: Record<string, string | number>
}

interface ProviderComparisonMatrixProps {
  providers: Provider[]
  metrics: { key: string; label: string; category?: string }[]
  className?: string
  onEnquiry?: (provider: Provider) => void
}

export function ProviderComparisonMatrix({
  providers,
  metrics,
  className,
  onEnquiry
}: ProviderComparisonMatrixProps) {
  const getWinner = (metricKey: string): string | null => {
    if (providers.length === 0) return null
    const sorted = [...providers].sort((a, b) => {
      const aVal = Number(a.metrics[metricKey]) || 0
      const bVal = Number(b.metrics[metricKey]) || 0
      return bVal - aVal
    })
    return sorted[0]?.id || null
  }

  return (
    <div className={cn("overflow-x-auto border border-border rounded-xl", className)}>
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10">
          <tr>
            <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wider bg-primary text-primary-foreground min-w-[180px]">
              Feature Analysis
            </th>
            {providers.map((provider) => (
              <th
                key={provider.id}
                className="px-4 py-4 text-center bg-primary/90 text-primary-foreground min-w-[200px] border-l border-white/10"
              >
                <div className="space-y-2">
                  <div className="font-bold text-sm">{provider.name}</div>
                  <div className="inline-flex items-center gap-1 bg-secondary/90 text-secondary-foreground px-2 py-0.5 rounded text-[10px] font-bold">
                    MDPA: {provider.score}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, idx) => {
            const winnerId = getWinner(metric.key)
            return (
              <tr
                key={metric.key}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-sm text-muted-foreground">
                  {metric.label}
                </td>
                {providers.map((provider) => {
                  const isWinner = winnerId === provider.id
                  const value = provider.metrics[metric.key]
                  return (
                    <td
                      key={provider.id}
                      className={cn(
                        "px-4 py-3 text-center text-sm border-l border-border/50",
                        isWinner && "bg-secondary/10 font-bold text-primary"
                      )}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {isWinner && <Trophy className="w-3.5 h-3.5 text-secondary" />}
                        {value}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        {onEnquiry && (
          <tfoot>
            <tr className="bg-muted/30">
              <td className="px-4 py-3"></td>
              {providers.map((provider) => (
                <td key={provider.id} className="px-4 py-3 text-center border-l border-border/50">
                  <button
                    onClick={() => onEnquiry(provider)}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-xs uppercase px-4 py-2 rounded-lg transition-colors"
                  >
                    Enquire Now
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
