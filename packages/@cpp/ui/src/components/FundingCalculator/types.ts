import type { StateCode } from "@cpp/config";

/**
 * Eligibility criteria for a state funding program
 */
export interface EligibilityCriteria {
    /** Age requirement (if any) */
    minAge?: number;
    maxAge?: number;
    /** Residency requirement */
    residencyRequired: boolean;
    /** Employment status eligibility */
    employmentStatus?: ("employed" | "unemployed" | "seeking")[];
    /** Prior qualification restrictions */
    priorQualificationLevel?: "none" | "below-cert-iv" | "below-diploma" | "any";
    /** Australian citizen/PR requirement */
    citizenshipRequired: boolean;
    /** Additional requirements as text */
    additionalRequirements?: string[];
}

/**
 * State-specific funding program configuration
 */
export interface FundingProgram {
    /** Unique identifier for the program */
    id: string;
    /** Display name */
    name: string;
    /** State this program applies to */
    state: StateCode;
    /** Brief description */
    description: string;
    /** Maximum subsidy amount (if fixed) */
    maxSubsidy?: number;
    /** Percentage of fee covered (if percentage-based) */
    subsidyPercentage?: number;
    /** Student contribution amount */
    studentContribution?: {
        min: number;
        max: number;
    };
    /** Eligibility criteria */
    eligibility: EligibilityCriteria;
    /** Link to official program information */
    infoUrl?: string;
    /** Whether this is the primary/main funding option */
    isPrimary?: boolean;
}

/**
 * User input for calculating funding eligibility
 */
export interface FundingCalculatorInput {
    /** Selected state */
    state: StateCode;
    /** User's age */
    age?: number;
    /** Employment status */
    employmentStatus?: "employed" | "unemployed" | "seeking";
    /** Is Australian citizen or permanent resident */
    isCitizenOrPR: boolean;
    /** Highest prior qualification */
    priorQualification?: "none" | "cert-i-ii" | "cert-iii" | "cert-iv" | "diploma" | "degree";
    /** Course base fee (if known) */
    courseFee?: number;
}

/**
 * Result of funding eligibility calculation
 */
export interface FundingCalculatorResult {
    /** State the calculation was for */
    state: StateCode;
    /** Eligible funding programs */
    eligiblePrograms: FundingProgram[];
    /** Programs user is not eligible for */
    ineligiblePrograms: Array<{
        program: FundingProgram;
        reason: string;
    }>;
    /** Estimated out-of-pocket cost range */
    estimatedCost?: {
        min: number;
        max: number;
    };
    /** Full fee (no subsidy) */
    fullFee?: {
        min: number;
        max: number;
    };
}

/**
 * Props for the FundingCalculator component
 */
export interface FundingCalculatorProps {
    /** Available funding programs (state-specific logic injected here) */
    programs: FundingProgram[];
    /** Course information */
    course: {
        code: string;
        name: string;
        feeRange: {
            min: number;
            max: number;
        };
    };
    /** Default state to pre-select */
    defaultState?: StateCode;
    /** Callback when calculation is performed */
    onCalculate?: (result: FundingCalculatorResult) => void;
    /** Custom class name */
    className?: string;
    /** Override UI components (for theming) */
    components?: {
        Card?: React.ComponentType<{ className?: string; children: React.ReactNode }>;
        Button?: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
        Select?: React.ComponentType<{
            value: string;
            onValueChange: (value: string) => void;
            options: Array<{ value: string; label: string }>;
        }>;
    };
}

/**
 * State-specific funding logic interface
 * Implement this to add custom state logic
 */
export interface StateFundingLogic {
    /** State code this logic applies to */
    state: StateCode;
    /** Calculate eligibility for a specific program */
    calculateEligibility: (
        program: FundingProgram,
        input: FundingCalculatorInput
    ) => { eligible: boolean; reason?: string };
    /** Get all programs for this state */
    getPrograms: () => FundingProgram[];
}
