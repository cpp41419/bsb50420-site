import type * as React from "react";

/**
 * Labor market data structure for industry demand metrics
 */
export interface LaborMarketData {
    /** Qualification code (e.g., "BSB50820") */
    qualificationCode: string;
    /** Last updated timestamp */
    lastUpdated: string;
    /** Search volume metrics */
    searchVolume: SearchVolumeData;
    /** Job market metrics */
    jobMarket: JobMarketData;
    /** Industry trends */
    trends: TrendData;
}

export interface SearchVolumeData {
    /** Monthly search volume for the qualification */
    monthlySearches: number;
    /** Percentage change from previous period */
    changePercent: number;
    /** Trend direction */
    trend: "up" | "down" | "stable";
    /** Related search terms */
    relatedTerms: string[];
}

export interface JobMarketData {
    /** Total job openings requiring this qualification */
    totalOpenings: number;
    /** Average salary range */
    salaryRange: {
        min: number;
        max: number;
        currency: string;
    };
    /** Top hiring industries */
    topIndustries: string[];
    /** Top hiring locations */
    topLocations: string[];
    /** Growth projection */
    growthOutlook: "strong" | "moderate" | "stable" | "declining";
}

export interface TrendData {
    /** 12-month trend data points */
    monthlyData: MonthlyDataPoint[];
    /** Overall trend summary */
    summary: string;
}

export interface MonthlyDataPoint {
    month: string;
    searchVolume: number;
    jobOpenings: number;
}

/**
 * Props for the IndustryDemandWidget component
 */
export interface IndustryDemandWidgetProps {
    /** Qualification code to fetch data for */
    qualificationCode: string;
    /** Qualification name for display */
    qualificationName: string;
    /** Optional API endpoint for fetching real data */
    apiEndpoint?: string;
    /** Use dummy data instead of API (default: true) */
    useDummyData?: boolean;
    /** Initial data to display (skips loading state) */
    initialData?: LaborMarketData;
    /** Callback when data is loaded */
    onDataLoaded?: (data: LaborMarketData) => void;
    /** Callback on error */
    onError?: (error: Error) => void;
    /** Additional CSS class */
    className?: string;
    /** Custom UI components for theming */
    components?: {
        Card?: React.ComponentType<{
            className?: string;
            children: React.ReactNode;
        }>;
    };
}

/**
 * Widget display states
 */
export type WidgetState = "loading" | "loaded" | "error";
