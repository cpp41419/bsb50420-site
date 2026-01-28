import type { LaborMarketData, MonthlyDataPoint } from "./types";

/**
 * Generate dummy labor market data for a qualification
 * This simulates what would come from a real labor market API
 */
export function generateDummyData(qualificationCode: string): LaborMarketData {
    // Generate realistic-looking 12-month trend data
    const monthlyData = generateMonthlyData();

    // Calculate search volume based on qualification type
    const baseSearchVolume = getBaseSearchVolume(qualificationCode);
    const searchChange = Math.round((Math.random() * 20 - 5) * 10) / 10; // -5% to +15%

    // Calculate job openings based on qualification level
    const baseJobOpenings = getBaseJobOpenings(qualificationCode);

    return {
        qualificationCode,
        lastUpdated: new Date().toISOString(),
        searchVolume: {
            monthlySearches: baseSearchVolume + Math.floor(Math.random() * 500),
            changePercent: searchChange,
            trend: searchChange > 2 ? "up" : searchChange < -2 ? "down" : "stable",
            relatedTerms: getRelatedTerms(qualificationCode),
        },
        jobMarket: {
            totalOpenings: baseJobOpenings + Math.floor(Math.random() * 200),
            salaryRange: getSalaryRange(qualificationCode),
            topIndustries: getTopIndustries(qualificationCode),
            topLocations: ["Sydney", "Melbourne", "Brisbane", "Perth"],
            growthOutlook: getGrowthOutlook(searchChange),
        },
        trends: {
            monthlyData,
            summary: getSummary(searchChange, qualificationCode),
        },
    };
}

function generateMonthlyData(): MonthlyDataPoint[] {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const currentMonth = new Date().getMonth();

    return months.map((month, index) => {
        // Create a slight upward trend with some variance
        const baseSearch = 800 + index * 15;
        const baseJobs = 150 + index * 8;

        return {
            month,
            searchVolume: baseSearch + Math.floor(Math.random() * 200 - 100),
            jobOpenings: baseJobs + Math.floor(Math.random() * 50 - 25),
        };
    }).slice(0, currentMonth + 1);
}

function getBaseSearchVolume(code: string): number {
    // Higher-level qualifications tend to have more searches
    if (code.includes("50") || code.includes("51") || code.includes("52")) {
        return 2500; // Diploma level
    }
    if (code.includes("40") || code.includes("41") || code.includes("42")) {
        return 1800; // Certificate IV
    }
    if (code.includes("30") || code.includes("33")) {
        return 1200; // Certificate III
    }
    return 1500;
}

function getBaseJobOpenings(code: string): number {
    // Different sectors have different job market sizes
    if (code.startsWith("BSB")) return 450; // Business
    if (code.startsWith("CHC")) return 380; // Community Services
    if (code.startsWith("FNS")) return 520; // Finance
    if (code.startsWith("HLT")) return 620; // Health
    if (code.startsWith("CPP")) return 340; // Property Services
    if (code.startsWith("UEE")) return 290; // Electrotechnology
    return 350;
}

function getSalaryRange(code: string): { min: number; max: number; currency: string } {
    // Salary ranges based on qualification level and sector
    const level = parseInt(code.slice(3, 5)) || 40;
    const baseMin = 45000 + (level - 30) * 1500;
    const baseMax = 65000 + (level - 30) * 2500;

    return {
        min: baseMin,
        max: baseMax,
        currency: "AUD",
    };
}

function getTopIndustries(code: string): string[] {
    const industryMap: Record<string, string[]> = {
        BSB: ["Professional Services", "Government", "Finance & Insurance", "Healthcare Administration"],
        CHC: ["Community Services", "Aged Care", "Disability Support", "Youth Services"],
        FNS: ["Banking", "Financial Planning", "Insurance", "Mortgage Broking"],
        HLT: ["Healthcare", "Allied Health", "Aged Care", "Private Practice"],
        CPP: ["Real Estate", "Property Management", "Strata Management", "Asset Management"],
        UEE: ["Construction", "Mining", "Manufacturing", "Renewable Energy"],
    };

    const prefix = code.slice(0, 3);
    return industryMap[prefix] || ["General Business", "Government", "Private Sector"];
}

function getRelatedTerms(code: string): string[] {
    const termsMap: Record<string, string[]> = {
        BSB: ["business management courses", "diploma of business", "management training"],
        CHC: ["community services course", "aged care certificate", "disability support training"],
        FNS: ["finance courses", "mortgage broker training", "financial planning certification"],
        HLT: ["nursing courses", "healthcare training", "health services qualification"],
        CPP: ["real estate course", "property management training", "strata management"],
        UEE: ["electrician course", "electrical training", "trade qualification"],
    };

    const prefix = code.slice(0, 3);
    return termsMap[prefix] || ["vocational training", "TAFE courses", "RTO training"];
}

function getGrowthOutlook(changePercent: number): "strong" | "moderate" | "stable" | "declining" {
    if (changePercent > 10) return "strong";
    if (changePercent > 3) return "moderate";
    if (changePercent > -3) return "stable";
    return "declining";
}

function getSummary(changePercent: number, code: string): string {
    const sector = getSectorName(code);

    if (changePercent > 10) {
        return `Strong demand growth in ${sector}. Job openings have increased significantly, with employers actively seeking qualified candidates.`;
    }
    if (changePercent > 3) {
        return `Moderate growth in ${sector} sector demand. Steady increase in job opportunities with positive employment outlook.`;
    }
    if (changePercent > -3) {
        return `Stable demand in ${sector}. Consistent job market with reliable employment opportunities for qualified graduates.`;
    }
    return `${sector} sector experiencing adjustment period. Consider specialization or additional certifications to enhance employability.`;
}

function getSectorName(code: string): string {
    const sectorMap: Record<string, string> = {
        BSB: "Business & Management",
        CHC: "Community Services",
        FNS: "Finance & Accounting",
        HLT: "Health & Allied Health",
        CPP: "Property Services",
        UEE: "Electrotechnology",
    };

    const prefix = code.slice(0, 3);
    return sectorMap[prefix] || "this qualification's";
}

/**
 * Fetch labor market data from API
 */
export async function fetchLaborMarketData(
    qualificationCode: string,
    apiEndpoint: string
): Promise<LaborMarketData> {
    const response = await fetch(`${apiEndpoint}?code=${qualificationCode}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch labor market data: ${response.statusText}`);
    }

    return response.json();
}
