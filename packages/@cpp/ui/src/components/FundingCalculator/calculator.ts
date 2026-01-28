import type {
    FundingCalculatorInput,
    FundingCalculatorResult,
    FundingProgram,
    EligibilityCriteria,
} from "./types";
import { getDefaultPrograms } from "./programs";

/**
 * Maps prior qualification to level for comparison
 */
function qualificationToLevel(
    qual?: FundingCalculatorInput["priorQualification"]
): number {
    switch (qual) {
        case "none":
            return 0;
        case "cert-i-ii":
            return 1;
        case "cert-iii":
            return 2;
        case "cert-iv":
            return 3;
        case "diploma":
            return 4;
        case "degree":
            return 5;
        default:
            return 0;
    }
}

/**
 * Maps eligibility requirement to qualification level threshold
 * Returns the minimum level that would disqualify someone
 * "none" means must have no prior qual, so anything >= 1 disqualifies
 * "below-cert-iv" means cert-iv (3) or higher disqualifies
 * "below-diploma" means diploma (4) or higher disqualifies
 */
function eligibilityLevelThreshold(
    level?: EligibilityCriteria["priorQualificationLevel"]
): number {
    switch (level) {
        case "none":
            return 1; // Must have level 0 (no qualification) - level 1+ disqualifies
        case "below-cert-iv":
            return 3; // cert-iv (3) or higher disqualifies
        case "below-diploma":
            return 4; // diploma (4) or higher disqualifies
        case "any":
            return 999; // any qualification level is ok
        default:
            return 999;
    }
}

/**
 * Check if a user meets the eligibility criteria for a funding program
 */
export function checkEligibility(
    program: FundingProgram,
    input: FundingCalculatorInput
): { eligible: boolean; reason?: string } {
    const { eligibility } = program;

    // Check citizenship
    if (eligibility.citizenshipRequired && !input.isCitizenOrPR) {
        return {
            eligible: false,
            reason: "Australian citizenship or permanent residency required",
        };
    }

    // Check age requirements
    if (input.age !== undefined) {
        if (eligibility.minAge !== undefined && input.age < eligibility.minAge) {
            return {
                eligible: false,
                reason: `Minimum age requirement is ${eligibility.minAge} years`,
            };
        }
        if (eligibility.maxAge !== undefined && input.age > eligibility.maxAge) {
            return {
                eligible: false,
                reason: `Maximum age requirement is ${eligibility.maxAge} years`,
            };
        }
    }

    // Check employment status
    if (
        eligibility.employmentStatus &&
        eligibility.employmentStatus.length > 0 &&
        input.employmentStatus
    ) {
        if (!eligibility.employmentStatus.includes(input.employmentStatus)) {
            return {
                eligible: false,
                reason: `Employment status must be one of: ${eligibility.employmentStatus.join(", ")}`,
            };
        }
    }

    // Check prior qualification level
    if (eligibility.priorQualificationLevel && input.priorQualification) {
        const userLevel = qualificationToLevel(input.priorQualification);
        const threshold = eligibilityLevelThreshold(
            eligibility.priorQualificationLevel
        );
        if (userLevel >= threshold) {
            return {
                eligible: false,
                reason: `Prior qualification level is too high for this program`,
            };
        }
    }

    return { eligible: true };
}

/**
 * Calculate funding eligibility for all programs matching user's state
 */
export function calculateFunding(
    input: FundingCalculatorInput,
    programs: FundingProgram[] = getDefaultPrograms()
): FundingCalculatorResult {
    const statePrograms = programs.filter((p) => p.state === input.state);

    const eligiblePrograms: FundingProgram[] = [];
    const ineligiblePrograms: Array<{
        program: FundingProgram;
        reason: string;
    }> = [];

    for (const program of statePrograms) {
        const result = checkEligibility(program, input);
        if (result.eligible) {
            eligiblePrograms.push(program);
        } else {
            ineligiblePrograms.push({
                program,
                reason: result.reason || "Not eligible",
            });
        }
    }

    // Calculate estimated costs based on eligible programs
    let estimatedCost: { min: number; max: number } | undefined;
    const fullFee = input.courseFee
        ? { min: input.courseFee, max: input.courseFee }
        : undefined;

    if (eligiblePrograms.length > 0) {
        // Find the best (lowest cost) program
        const bestProgram = eligiblePrograms.reduce((best, current) => {
            const bestMin = best.studentContribution?.min ?? Infinity;
            const currentMin = current.studentContribution?.min ?? Infinity;
            return currentMin < bestMin ? current : best;
        });

        if (bestProgram.studentContribution) {
            estimatedCost = {
                min: bestProgram.studentContribution.min,
                max: bestProgram.studentContribution.max,
            };
        }
    }

    return {
        state: input.state,
        eligiblePrograms,
        ineligiblePrograms,
        estimatedCost,
        fullFee,
    };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format a cost range for display
 */
export function formatCostRange(range: { min: number; max: number }): string {
    if (range.min === range.max) {
        if (range.min === 0) {
            return "Free";
        }
        return formatCurrency(range.min);
    }
    if (range.min === 0) {
        return `Free - ${formatCurrency(range.max)}`;
    }
    return `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`;
}
