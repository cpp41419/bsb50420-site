"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, Shield, TrendingUp, TrendingDown } from "lucide-react"

interface RiskFactor {
  label: string
  value: number
  max?: number
}

interface RiskScorecardProps {
  score: number
  maxScore?: number
  title?: string
  riskLevel: "low" | "medium" | "high" | "critical"
  factors?: RiskFactor[]
  insight?: string
  className?: string
}

export function RiskScorecard({
  score,
  maxScore = 100,
  title = "SYSTEMIC RISK SCORE",
  riskLevel,
  factors = [],
  insight,
  className
}: RiskScorecardProps) {
  const percentage = (score / maxScore) * 100

  const levelConfig = {
    low: {
      color: "text-emerald-600",
      bg: "bg-emerald-500",
      bgLight: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      label: "LOW RISK",
      icon: Shield
    },
    medium: {
      color: "text-amber-600",
      bg: "bg-amber-500",
      bgLight: "bg-amber-500/10",
      border: "border-amber-500/30",
      label: "MEDIUM",
      icon: TrendingUp
    },
    high: {
      color: "text-orange-600",
      bg: "bg-orange-500",
      bgLight: "bg-orange-500/10",
      border: "border-orange-500/30",
      label: "HIGH RISK",
      icon: AlertTriangle
    },
    critical: {
      color: "text-red-600",
      bg: "bg-red-500",
      bgLight: "bg-red-500/10",
      border: "border-red-500/30",
      label: "CRITICAL",
      icon: AlertTriangle
    }
  }[riskLevel]

  const Icon = levelConfig.icon

  return (
    <div className={cn(
      "bg-card border rounded-xl overflow-hidden",
      levelConfig.border,
      className
    )}>
      {/* Header */}
      <div className={cn("px-6 py-4 border-b", levelConfig.bgLight, levelConfig.border)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={cn("w-5 h-5", levelConfig.color)} />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {title}
            </span>
          </div>
          <span className={cn(
            "text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded",
            levelConfig.bgLight, levelConfig.color
          )}>
            {levelConfig.label}
          </span>
        </div>
      </div>

      {/* Score Display */}
      <div className="px-6 py-6">
        <div className="flex items-end gap-4 mb-4">
          <div className={cn("text-5xl font-black tabular-nums", levelConfig.color)}>
            {score.toFixed(1)}
          </div>
          <div className="text-lg text-muted-foreground font-medium mb-1">
            / {maxScore}
          </div>
        </div>

        {/* Risk Meter */}
        <div className="h-3 bg-muted rounded-full overflow-hidden mb-6">
          <div
            className={cn("h-full rounded-full transition-all duration-500", levelConfig.bg)}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {/* Factor Breakdown */}
        {factors.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {factors.map((factor, idx) => (
              <div
                key={idx}
                className="bg-muted/50 rounded-lg p-3 text-center"
              >
                <div className={cn(
                  "text-lg font-black",
                  factor.value > 0 ? "text-red-600" : factor.value < 0 ? "text-emerald-600" : "text-muted-foreground"
                )}>
                  {factor.value > 0 ? "+" : ""}{factor.value}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1">
                  {factor.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Insight */}
        {insight && (
          <div className="border-l-2 border-primary/30 pl-4 py-2">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              {insight}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Compact variant for inline use
export function RiskScoreBadge({
  score,
  maxScore = 100,
  riskLevel,
  className
}: {
  score: number
  maxScore?: number
  riskLevel: "low" | "medium" | "high" | "critical"
  className?: string
}) {
  const config = {
    low: { bg: "bg-emerald-500/10", text: "text-emerald-600", fill: "bg-emerald-500" },
    medium: { bg: "bg-amber-500/10", text: "text-amber-600", fill: "bg-amber-500" },
    high: { bg: "bg-orange-500/10", text: "text-orange-600", fill: "bg-orange-500" },
    critical: { bg: "bg-red-500/10", text: "text-red-600", fill: "bg-red-500" }
  }[riskLevel]

  const percentage = (score / maxScore) * 100

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", config.fill)}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span className={cn("text-xs font-bold tabular-nums", config.text)}>
        {score.toFixed(0)}
      </span>
    </div>
  )
}
