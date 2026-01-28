export { FundingCalculator, default } from "./FundingCalculator";
export {
    calculateFunding,
    checkEligibility,
    formatCurrency,
    formatCostRange,
} from "./calculator";
export {
    getDefaultPrograms,
    getProgramsByState,
    NSW_SMART_AND_SKILLED,
    NSW_JOBTRAINER,
    VIC_SKILLS_FIRST,
    VIC_FREE_TAFE,
    QLD_CERT_3_GUARANTEE,
    QLD_HIGHER_LEVEL_SKILLS,
    QLD_FREE_TAFE,
} from "./programs";
export type {
    FundingCalculatorProps,
    FundingCalculatorInput,
    FundingCalculatorResult,
    FundingProgram,
    EligibilityCriteria,
    StateFundingLogic,
} from "./types";
