"use client";

import * as React from "react";
import type {
    FundingCalculatorProps,
    FundingCalculatorInput,
    FundingCalculatorResult,
} from "./types";
import { calculateFunding, formatCostRange, formatCurrency } from "./calculator";
import { getDefaultPrograms } from "./programs";

const SUPPORTED_STATES = [
    { value: "nsw", label: "New South Wales" },
    { value: "vic", label: "Victoria" },
    { value: "qld", label: "Queensland" },
] as const;

const EMPLOYMENT_OPTIONS = [
    { value: "employed", label: "Employed" },
    { value: "unemployed", label: "Unemployed" },
    { value: "seeking", label: "Seeking Employment" },
] as const;

const QUALIFICATION_OPTIONS = [
    { value: "none", label: "No prior qualification" },
    { value: "cert-i-ii", label: "Certificate I or II" },
    { value: "cert-iii", label: "Certificate III" },
    { value: "cert-iv", label: "Certificate IV" },
    { value: "diploma", label: "Diploma or higher" },
    { value: "degree", label: "Bachelor degree or higher" },
] as const;

/**
 * FundingCalculator - An interactive calculator for determining government funding eligibility
 * for vocational training across Australian states (NSW, VIC, QLD).
 *
 * This component accepts state-specific funding logic and can be reused across different
 * site instantiations with different course configurations.
 */
export function FundingCalculator({
    programs = getDefaultPrograms(),
    course,
    defaultState = "nsw",
    onCalculate,
    className = "",
    components,
}: FundingCalculatorProps) {
    const [input, setInput] = React.useState<FundingCalculatorInput>({
        state: defaultState,
        isCitizenOrPR: true,
        courseFee: course.feeRange.max,
    });

    const [result, setResult] = React.useState<FundingCalculatorResult | null>(null);
    const [hasCalculated, setHasCalculated] = React.useState(false);

    const handleInputChange = <K extends keyof FundingCalculatorInput>(
        key: K,
        value: FundingCalculatorInput[K]
    ) => {
        setInput((prev) => ({ ...prev, [key]: value }));
        setHasCalculated(false);
    };

    const handleCalculate = () => {
        const calculatedResult = calculateFunding(input, programs);
        setResult(calculatedResult);
        setHasCalculated(true);
        onCalculate?.(calculatedResult);
    };

    // Use provided components or default to native elements
    const Card = components?.Card ?? DefaultCard;
    const Button = components?.Button ?? DefaultButton;

    return (
        <div className={`funding-calculator ${className}`}>
            <Card className="funding-calculator__container">
                <div className="funding-calculator__header">
                    <h3 className="funding-calculator__title">
                        Funding Eligibility Calculator
                    </h3>
                    <p className="funding-calculator__subtitle">
                        Check your eligibility for government-subsidised training for{" "}
                        <strong>{course.name}</strong>
                    </p>
                </div>

                <div className="funding-calculator__form">
                    {/* State Selection */}
                    <div className="funding-calculator__field">
                        <label
                            htmlFor="fc-state"
                            className="funding-calculator__label"
                        >
                            Which state do you live in?
                        </label>
                        <select
                            id="fc-state"
                            value={input.state}
                            onChange={(e) =>
                                handleInputChange(
                                    "state",
                                    e.target.value as FundingCalculatorInput["state"]
                                )
                            }
                            className="funding-calculator__select"
                        >
                            {SUPPORTED_STATES.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Citizenship */}
                    <div className="funding-calculator__field">
                        <label className="funding-calculator__label">
                            Are you an Australian citizen or permanent resident?
                        </label>
                        <div className="funding-calculator__radio-group">
                            <label className="funding-calculator__radio-label">
                                <input
                                    type="radio"
                                    name="citizenship"
                                    checked={input.isCitizenOrPR === true}
                                    onChange={() =>
                                        handleInputChange("isCitizenOrPR", true)
                                    }
                                    className="funding-calculator__radio"
                                />
                                Yes
                            </label>
                            <label className="funding-calculator__radio-label">
                                <input
                                    type="radio"
                                    name="citizenship"
                                    checked={input.isCitizenOrPR === false}
                                    onChange={() =>
                                        handleInputChange("isCitizenOrPR", false)
                                    }
                                    className="funding-calculator__radio"
                                />
                                No
                            </label>
                        </div>
                    </div>

                    {/* Age */}
                    <div className="funding-calculator__field">
                        <label
                            htmlFor="fc-age"
                            className="funding-calculator__label"
                        >
                            Your age
                        </label>
                        <input
                            id="fc-age"
                            type="number"
                            min={15}
                            max={100}
                            value={input.age ?? ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "age",
                                    e.target.value ? parseInt(e.target.value, 10) : undefined
                                )
                            }
                            placeholder="Enter your age"
                            className="funding-calculator__input"
                        />
                    </div>

                    {/* Employment Status */}
                    <div className="funding-calculator__field">
                        <label
                            htmlFor="fc-employment"
                            className="funding-calculator__label"
                        >
                            Employment status
                        </label>
                        <select
                            id="fc-employment"
                            value={input.employmentStatus ?? ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "employmentStatus",
                                    e.target.value as FundingCalculatorInput["employmentStatus"] || undefined
                                )
                            }
                            className="funding-calculator__select"
                        >
                            <option value="">Select status...</option>
                            {EMPLOYMENT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Prior Qualification */}
                    <div className="funding-calculator__field">
                        <label
                            htmlFor="fc-qualification"
                            className="funding-calculator__label"
                        >
                            Highest prior qualification
                        </label>
                        <select
                            id="fc-qualification"
                            value={input.priorQualification ?? ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "priorQualification",
                                    e.target.value as FundingCalculatorInput["priorQualification"] || undefined
                                )
                            }
                            className="funding-calculator__select"
                        >
                            <option value="">Select qualification...</option>
                            {QUALIFICATION_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        onClick={handleCalculate}
                        className="funding-calculator__button"
                    >
                        Check Eligibility
                    </Button>
                </div>

                {/* Results */}
                {hasCalculated && result && (
                    <div className="funding-calculator__results">
                        <h4 className="funding-calculator__results-title">
                            Your Results
                        </h4>

                        {/* Cost Summary */}
                        <div className="funding-calculator__cost-summary">
                            <div className="funding-calculator__cost-item">
                                <span className="funding-calculator__cost-label">
                                    Full Course Fee
                                </span>
                                <span className="funding-calculator__cost-value funding-calculator__cost-value--full">
                                    {formatCostRange(course.feeRange)}
                                </span>
                            </div>
                            {result.estimatedCost && (
                                <div className="funding-calculator__cost-item funding-calculator__cost-item--subsidised">
                                    <span className="funding-calculator__cost-label">
                                        With Subsidy
                                    </span>
                                    <span className="funding-calculator__cost-value funding-calculator__cost-value--subsidised">
                                        {formatCostRange(result.estimatedCost)}
                                    </span>
                                </div>
                            )}
                            {result.estimatedCost && (
                                <div className="funding-calculator__cost-item">
                                    <span className="funding-calculator__cost-label">
                                        Potential Savings
                                    </span>
                                    <span className="funding-calculator__cost-value funding-calculator__cost-value--savings">
                                        Up to{" "}
                                        {formatCurrency(
                                            course.feeRange.max - result.estimatedCost.min
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Eligible Programs */}
                        {result.eligiblePrograms.length > 0 && (
                            <div className="funding-calculator__programs">
                                <h5 className="funding-calculator__programs-title">
                                    Eligible Funding Programs
                                </h5>
                                <ul className="funding-calculator__programs-list">
                                    {result.eligiblePrograms.map((program) => (
                                        <li
                                            key={program.id}
                                            className="funding-calculator__program"
                                        >
                                            <div className="funding-calculator__program-header">
                                                <strong>{program.name}</strong>
                                                {program.isPrimary && (
                                                    <span className="funding-calculator__badge">
                                                        Primary
                                                    </span>
                                                )}
                                            </div>
                                            <p className="funding-calculator__program-description">
                                                {program.description}
                                            </p>
                                            {program.studentContribution && (
                                                <p className="funding-calculator__program-cost">
                                                    Student contribution:{" "}
                                                    {formatCostRange(program.studentContribution)}
                                                </p>
                                            )}
                                            {program.infoUrl && (
                                                <a
                                                    href={program.infoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="funding-calculator__program-link"
                                                >
                                                    Learn more
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* No Eligible Programs */}
                        {result.eligiblePrograms.length === 0 && (
                            <div className="funding-calculator__no-results">
                                <p>
                                    Based on the information provided, you may not be
                                    eligible for subsidised training in {input.state.toUpperCase()}.
                                </p>
                                <p>
                                    You may still enrol as a fee-paying student at the full
                                    course fee of {formatCostRange(course.feeRange)}.
                                </p>
                            </div>
                        )}

                        {/* Ineligible Programs (collapsed by default) */}
                        {result.ineligiblePrograms.length > 0 && (
                            <details className="funding-calculator__ineligible">
                                <summary className="funding-calculator__ineligible-summary">
                                    Programs you&apos;re not eligible for (
                                    {result.ineligiblePrograms.length})
                                </summary>
                                <ul className="funding-calculator__ineligible-list">
                                    {result.ineligiblePrograms.map(({ program, reason }) => (
                                        <li
                                            key={program.id}
                                            className="funding-calculator__ineligible-item"
                                        >
                                            <strong>{program.name}</strong>
                                            <span className="funding-calculator__ineligible-reason">
                                                {reason}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        )}

                        {/* Disclaimer */}
                        <p className="funding-calculator__disclaimer">
                            This calculator provides an estimate only. Actual eligibility
                            is determined by your chosen training provider and the
                            relevant state government authority. Contact providers
                            directly to confirm funding availability.
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
}

// Default unstyled components for when no UI library is provided
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
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#fff",
            }}
        >
            {children}
        </div>
    );
}

function DefaultButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
                width: "100%",
                ...props.style,
            }}
        />
    );
}

export default FundingCalculator;
