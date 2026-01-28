"use client";

import * as React from "react";
import type {
    IndustryDemandWidgetProps,
    LaborMarketData,
    WidgetState,
} from "./types";
import { generateDummyData, fetchLaborMarketData } from "./data";

/**
 * IndustryDemandWidget - Displays real-time labor market data for a qualification
 *
 * Features:
 * - Displays search volume, job openings, and salary data
 * - Supports both dummy and real API data
 * - Responsive design for mobile and desktop
 * - Error handling with retry capability
 */
export function IndustryDemandWidget({
    qualificationCode,
    qualificationName,
    apiEndpoint,
    useDummyData = true,
    initialData,
    onDataLoaded,
    onError,
    className = "",
    components,
}: IndustryDemandWidgetProps) {
    const [state, setState] = React.useState<WidgetState>(
        initialData ? "loaded" : "loading"
    );
    const [data, setData] = React.useState<LaborMarketData | null>(initialData ?? null);
    const [error, setError] = React.useState<Error | null>(null);

    const Card = components?.Card ?? DefaultCard;

    const loadData = React.useCallback(async () => {
        setState("loading");
        setError(null);

        try {
            let marketData: LaborMarketData;

            if (useDummyData || !apiEndpoint) {
                // Simulate API delay for realistic UX
                await new Promise((resolve) => setTimeout(resolve, 800));
                marketData = generateDummyData(qualificationCode);
            } else {
                marketData = await fetchLaborMarketData(qualificationCode, apiEndpoint);
            }

            setData(marketData);
            setState("loaded");
            onDataLoaded?.(marketData);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to load data");
            setError(error);
            setState("error");
            onError?.(error);
        }
    }, [qualificationCode, apiEndpoint, useDummyData, onDataLoaded, onError]);

    React.useEffect(() => {
        if (!initialData) {
            loadData();
        }
    }, [loadData, initialData]);

    // Loading state
    if (state === "loading") {
        return (
            <div className={`industry-demand-widget ${className}`}>
                <Card className="industry-demand-widget__container">
                    <div className="industry-demand-widget__loading">
                        <div className="industry-demand-widget__spinner" />
                        <p className="industry-demand-widget__loading-text">
                            Loading industry demand data...
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    // Error state
    if (state === "error" || !data) {
        return (
            <div className={`industry-demand-widget ${className}`}>
                <Card className="industry-demand-widget__container">
                    <div className="industry-demand-widget__error">
                        <div className="industry-demand-widget__error-icon">!</div>
                        <h4 className="industry-demand-widget__error-title">
                            Unable to Load Data
                        </h4>
                        <p className="industry-demand-widget__error-message">
                            {error?.message || "Failed to fetch labor market data."}
                        </p>
                        <button
                            onClick={loadData}
                            className="industry-demand-widget__retry-button"
                        >
                            Try Again
                        </button>
                    </div>
                </Card>
            </div>
        );
    }

    // Loaded state
    return (
        <div className={`industry-demand-widget ${className}`}>
            <Card className="industry-demand-widget__container">
                {/* Header */}
                <div className="industry-demand-widget__header">
                    <div className="industry-demand-widget__title-row">
                        <h3 className="industry-demand-widget__title">
                            Industry Demand
                        </h3>
                        <span className="industry-demand-widget__live-badge">
                            Live Data
                        </span>
                    </div>
                    <p className="industry-demand-widget__subtitle">
                        Labor market insights for {qualificationName}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="industry-demand-widget__stats-grid">
                    {/* Search Volume */}
                    <div className="industry-demand-widget__stat-card">
                        <div className="industry-demand-widget__stat-icon industry-demand-widget__stat-icon--search">
                            <SearchIcon />
                        </div>
                        <div className="industry-demand-widget__stat-content">
                            <span className="industry-demand-widget__stat-value">
                                {formatNumber(data.searchVolume.monthlySearches)}
                            </span>
                            <span className="industry-demand-widget__stat-label">
                                Monthly Searches
                            </span>
                            <span
                                className={`industry-demand-widget__stat-trend industry-demand-widget__stat-trend--${data.searchVolume.trend}`}
                            >
                                <TrendArrow direction={data.searchVolume.trend} />
                                {Math.abs(data.searchVolume.changePercent)}%
                            </span>
                        </div>
                    </div>

                    {/* Job Openings */}
                    <div className="industry-demand-widget__stat-card">
                        <div className="industry-demand-widget__stat-icon industry-demand-widget__stat-icon--jobs">
                            <BriefcaseIcon />
                        </div>
                        <div className="industry-demand-widget__stat-content">
                            <span className="industry-demand-widget__stat-value">
                                {formatNumber(data.jobMarket.totalOpenings)}
                            </span>
                            <span className="industry-demand-widget__stat-label">
                                Job Openings
                            </span>
                            <span
                                className={`industry-demand-widget__stat-outlook industry-demand-widget__stat-outlook--${data.jobMarket.growthOutlook}`}
                            >
                                {formatOutlook(data.jobMarket.growthOutlook)}
                            </span>
                        </div>
                    </div>

                    {/* Salary Range */}
                    <div className="industry-demand-widget__stat-card">
                        <div className="industry-demand-widget__stat-icon industry-demand-widget__stat-icon--salary">
                            <DollarIcon />
                        </div>
                        <div className="industry-demand-widget__stat-content">
                            <span className="industry-demand-widget__stat-value">
                                {formatSalary(data.jobMarket.salaryRange.min)}
                            </span>
                            <span className="industry-demand-widget__stat-label">
                                to {formatSalary(data.jobMarket.salaryRange.max)}
                            </span>
                            <span className="industry-demand-widget__stat-note">
                                Average Salary Range
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="industry-demand-widget__details">
                    {/* Top Industries */}
                    <div className="industry-demand-widget__detail-section">
                        <h4 className="industry-demand-widget__detail-title">
                            Top Hiring Industries
                        </h4>
                        <div className="industry-demand-widget__tags">
                            {data.jobMarket.topIndustries.slice(0, 4).map((industry, i) => (
                                <span key={i} className="industry-demand-widget__tag">
                                    {industry}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Top Locations */}
                    <div className="industry-demand-widget__detail-section">
                        <h4 className="industry-demand-widget__detail-title">
                            Top Hiring Locations
                        </h4>
                        <div className="industry-demand-widget__tags">
                            {data.jobMarket.topLocations.slice(0, 4).map((location, i) => (
                                <span key={i} className="industry-demand-widget__tag industry-demand-widget__tag--location">
                                    {location}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trend Summary */}
                <div className="industry-demand-widget__summary">
                    <p className="industry-demand-widget__summary-text">
                        {data.trends.summary}
                    </p>
                </div>

                {/* Footer */}
                <div className="industry-demand-widget__footer">
                    <span className="industry-demand-widget__updated">
                        Last updated: {formatDate(data.lastUpdated)}
                    </span>
                    <button
                        onClick={loadData}
                        className="industry-demand-widget__refresh-button"
                        title="Refresh data"
                    >
                        <RefreshIcon />
                    </button>
                </div>
            </Card>
        </div>
    );
}

// Default unstyled card component
function DefaultCard({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={className}
            style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "24px",
                backgroundColor: "#fff",
            }}
        >
            {children}
        </div>
    );
}

// Icon components
function SearchIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function BriefcaseIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    );
}

function DollarIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );
}

function RefreshIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
        </svg>
    );
}

function TrendArrow({ direction }: { direction: "up" | "down" | "stable" }) {
    if (direction === "up") {
        return (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 15l-6-6-6 6" />
            </svg>
        );
    }
    if (direction === "down") {
        return (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
            </svg>
        );
    }
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12h14" />
        </svg>
    );
}

// Utility functions
function formatNumber(num: number): string {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toLocaleString();
}

function formatSalary(amount: number): string {
    return `$${(amount / 1000).toFixed(0)}k`;
}

function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatOutlook(outlook: string): string {
    const labels: Record<string, string> = {
        strong: "Strong Growth",
        moderate: "Moderate Growth",
        stable: "Stable",
        declining: "Declining",
    };
    return labels[outlook] || outlook;
}

export default IndustryDemandWidget;
