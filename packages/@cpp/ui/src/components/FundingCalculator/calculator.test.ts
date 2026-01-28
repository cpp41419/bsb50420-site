import { describe, it, expect } from "vitest";
import {
    checkEligibility,
    calculateFunding,
    formatCurrency,
    formatCostRange,
} from "./calculator";
import {
    NSW_SMART_AND_SKILLED,
    NSW_JOBTRAINER,
    VIC_SKILLS_FIRST,
    QLD_HIGHER_LEVEL_SKILLS,
    getDefaultPrograms,
} from "./programs";
import type { FundingCalculatorInput, FundingProgram } from "./types";

describe("checkEligibility", () => {
    describe("citizenship requirement", () => {
        it("returns eligible when citizen/PR and citizenship required", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
            };
            const result = checkEligibility(NSW_SMART_AND_SKILLED, input);
            expect(result.eligible).toBe(true);
        });

        it("returns ineligible when not citizen/PR and citizenship required", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: false,
            };
            const result = checkEligibility(NSW_SMART_AND_SKILLED, input);
            expect(result.eligible).toBe(false);
            expect(result.reason).toContain("citizenship");
        });
    });

    describe("age requirements", () => {
        it("returns eligible when age meets minimum", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                age: 18,
            };
            const result = checkEligibility(NSW_SMART_AND_SKILLED, input);
            expect(result.eligible).toBe(true);
        });

        it("returns ineligible when age below minimum", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                age: 14,
            };
            const result = checkEligibility(NSW_SMART_AND_SKILLED, input);
            expect(result.eligible).toBe(false);
            expect(result.reason).toContain("Minimum age");
        });

        it("returns ineligible when age above maximum (JobTrainer)", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                age: 30,
                employmentStatus: "unemployed",
            };
            const result = checkEligibility(NSW_JOBTRAINER, input);
            expect(result.eligible).toBe(false);
            expect(result.reason).toContain("Maximum age");
        });

        it("returns eligible when age within range for age-limited program", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                age: 20,
                employmentStatus: "unemployed",
            };
            const result = checkEligibility(NSW_JOBTRAINER, input);
            expect(result.eligible).toBe(true);
        });
    });

    describe("employment status", () => {
        it("returns eligible when employment status matches", () => {
            const input: FundingCalculatorInput = {
                state: "vic",
                isCitizenOrPR: true,
                employmentStatus: "employed",
            };
            const result = checkEligibility(VIC_SKILLS_FIRST, input);
            expect(result.eligible).toBe(true);
        });

        it("skips employment check when no status provided", () => {
            const input: FundingCalculatorInput = {
                state: "vic",
                isCitizenOrPR: true,
            };
            const result = checkEligibility(VIC_SKILLS_FIRST, input);
            expect(result.eligible).toBe(true);
        });
    });

    describe("prior qualification level", () => {
        it("returns eligible when no prior qualification", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                priorQualification: "none",
            };
            const result = checkEligibility(NSW_SMART_AND_SKILLED, input);
            expect(result.eligible).toBe(true);
        });

        it("returns eligible when qualification below threshold", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                priorQualification: "cert-iii",
            };
            const result = checkEligibility(NSW_SMART_AND_SKILLED, input);
            expect(result.eligible).toBe(true);
        });

        it("returns ineligible when qualification at or above threshold", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                priorQualification: "diploma",
            };
            const result = checkEligibility(NSW_SMART_AND_SKILLED, input);
            expect(result.eligible).toBe(false);
            expect(result.reason).toContain("Prior qualification");
        });
    });
});

describe("calculateFunding", () => {
    const programs = getDefaultPrograms();

    it("returns only programs for the selected state", () => {
        const input: FundingCalculatorInput = {
            state: "nsw",
            isCitizenOrPR: true,
        };
        const result = calculateFunding(input, programs);
        expect(result.state).toBe("nsw");
        expect(
            result.eligiblePrograms.every((p) => p.state === "nsw")
        ).toBe(true);
        expect(
            result.ineligiblePrograms.every((i) => i.program.state === "nsw")
        ).toBe(true);
    });

    it("correctly separates eligible and ineligible programs", () => {
        const input: FundingCalculatorInput = {
            state: "nsw",
            isCitizenOrPR: false, // Not citizen - should be ineligible for all
        };
        const result = calculateFunding(input, programs);
        expect(result.eligiblePrograms.length).toBe(0);
        expect(result.ineligiblePrograms.length).toBeGreaterThan(0);
    });

    it("calculates estimated cost from best eligible program", () => {
        const input: FundingCalculatorInput = {
            state: "nsw",
            isCitizenOrPR: true,
            age: 20,
            employmentStatus: "unemployed",
            courseFee: 3000,
        };
        const result = calculateFunding(input, programs);
        expect(result.estimatedCost).toBeDefined();
        // JobTrainer is free, so min should be 0
        expect(result.estimatedCost?.min).toBe(0);
    });

    it("returns full fee information when courseFee provided", () => {
        const input: FundingCalculatorInput = {
            state: "vic",
            isCitizenOrPR: true,
            courseFee: 4000,
        };
        const result = calculateFunding(input, programs);
        expect(result.fullFee).toEqual({ min: 4000, max: 4000 });
    });

    describe("NSW programs", () => {
        it("eligible citizen gets Smart and Skilled", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                age: 25,
                priorQualification: "cert-iii",
            };
            const result = calculateFunding(input, programs);
            expect(
                result.eligiblePrograms.some((p) => p.id === "nsw-smart-skilled")
            ).toBe(true);
        });

        it("young job seeker eligible for JobTrainer", () => {
            const input: FundingCalculatorInput = {
                state: "nsw",
                isCitizenOrPR: true,
                age: 20,
                employmentStatus: "unemployed",
                priorQualification: "none",
            };
            const result = calculateFunding(input, programs);
            expect(
                result.eligiblePrograms.some((p) => p.id === "nsw-jobtrainer")
            ).toBe(true);
        });
    });

    describe("VIC programs", () => {
        it("eligible citizen gets Skills First", () => {
            const input: FundingCalculatorInput = {
                state: "vic",
                isCitizenOrPR: true,
                age: 30,
                priorQualification: "cert-iii",
            };
            const result = calculateFunding(input, programs);
            expect(
                result.eligiblePrograms.some((p) => p.id === "vic-skills-first")
            ).toBe(true);
        });

        it("citizen eligible for Free TAFE", () => {
            const input: FundingCalculatorInput = {
                state: "vic",
                isCitizenOrPR: true,
            };
            const result = calculateFunding(input, programs);
            expect(
                result.eligiblePrograms.some((p) => p.id === "vic-free-tafe")
            ).toBe(true);
        });
    });

    describe("QLD programs", () => {
        it("citizen without prior qual eligible for Cert 3 Guarantee", () => {
            const input: FundingCalculatorInput = {
                state: "qld",
                isCitizenOrPR: true,
                priorQualification: "none",
            };
            const result = calculateFunding(input, programs);
            expect(
                result.eligiblePrograms.some((p) => p.id === "qld-cert-3-guarantee")
            ).toBe(true);
        });

        it("citizen with cert-iii ineligible for Cert 3 Guarantee", () => {
            const input: FundingCalculatorInput = {
                state: "qld",
                isCitizenOrPR: true,
                priorQualification: "cert-iii",
            };
            const result = calculateFunding(input, programs);
            expect(
                result.ineligiblePrograms.some(
                    (i) => i.program.id === "qld-cert-3-guarantee"
                )
            ).toBe(true);
        });

        it("citizen eligible for Higher Level Skills", () => {
            const input: FundingCalculatorInput = {
                state: "qld",
                isCitizenOrPR: true,
                priorQualification: "cert-iii",
            };
            const result = calculateFunding(input, programs);
            expect(
                result.eligiblePrograms.some(
                    (p) => p.id === "qld-higher-level-skills"
                )
            ).toBe(true);
        });
    });
});

describe("formatCurrency", () => {
    it("formats zero as $0", () => {
        expect(formatCurrency(0)).toBe("$0");
    });

    it("formats whole numbers without decimals", () => {
        expect(formatCurrency(1500)).toBe("$1,500");
    });

    it("formats large numbers with thousands separator", () => {
        expect(formatCurrency(10000)).toBe("$10,000");
    });
});

describe("formatCostRange", () => {
    it('formats zero range as "Free"', () => {
        expect(formatCostRange({ min: 0, max: 0 })).toBe("Free");
    });

    it("formats equal min/max as single value", () => {
        expect(formatCostRange({ min: 1500, max: 1500 })).toBe("$1,500");
    });

    it("formats range starting from zero", () => {
        expect(formatCostRange({ min: 0, max: 2400 })).toBe("Free - $2,400");
    });

    it("formats normal range", () => {
        expect(formatCostRange({ min: 500, max: 2500 })).toBe("$500 - $2,500");
    });
});

describe("program data integrity", () => {
    const programs = getDefaultPrograms();

    it("has programs for NSW, VIC, and QLD", () => {
        const states = new Set(programs.map((p) => p.state));
        expect(states.has("nsw")).toBe(true);
        expect(states.has("vic")).toBe(true);
        expect(states.has("qld")).toBe(true);
    });

    it("each state has at least one primary program", () => {
        const nswPrimary = programs.filter(
            (p) => p.state === "nsw" && p.isPrimary
        );
        const vicPrimary = programs.filter(
            (p) => p.state === "vic" && p.isPrimary
        );
        const qldPrimary = programs.filter(
            (p) => p.state === "qld" && p.isPrimary
        );

        expect(nswPrimary.length).toBeGreaterThanOrEqual(1);
        expect(vicPrimary.length).toBeGreaterThanOrEqual(1);
        expect(qldPrimary.length).toBeGreaterThanOrEqual(1);
    });

    it("all programs have required fields", () => {
        for (const program of programs) {
            expect(program.id).toBeTruthy();
            expect(program.name).toBeTruthy();
            expect(program.state).toBeTruthy();
            expect(program.description).toBeTruthy();
            expect(program.eligibility).toBeDefined();
            expect(typeof program.eligibility.citizenshipRequired).toBe(
                "boolean"
            );
            expect(typeof program.eligibility.residencyRequired).toBe(
                "boolean"
            );
        }
    });

    it("all programs have valid info URLs", () => {
        for (const program of programs) {
            if (program.infoUrl) {
                expect(program.infoUrl).toMatch(/^https?:\/\//);
            }
        }
    });
});
