"use client";

import * as React from "react";
import { FundingCalculator, getDefaultPrograms } from "@cpp/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteFundingCalculatorProps {
    course: {
        code: string;
        name: string;
        feeRange: {
            min: number;
            max: number;
        };
    };
    defaultState?: "nsw" | "vic" | "qld";
    className?: string;
}

/**
 * Site-specific wrapper for the FundingCalculator component.
 * Integrates with the site's design system (Shadcn UI + Tailwind).
 */
export function SiteFundingCalculator({
    course,
    defaultState = "nsw",
    className,
}: SiteFundingCalculatorProps) {

    // Custom Card component that uses site's Card
    const StyledCard = React.useMemo(
        () =>
            function StyledCardComponent({
                className: cardClassName,
                children,
            }: {
                className?: string;
                children: React.ReactNode;
            }) {
                return (
                    <Card className={cn("bg-card", cardClassName)}>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Calculator className="w-5 h-5 text-primary" />
                                Funding Eligibility Calculator
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{children}</CardContent>
                    </Card>
                );
            },
        []
    );

    // Custom Button that uses site's Button
    const StyledButton = React.useMemo(
        () =>
            function StyledButtonComponent(
                props: React.ButtonHTMLAttributes<HTMLButtonElement>
            ) {
                return <Button {...props} className={cn("w-full", props.className)} />;
            },
        []
    );

    return (
        <div className={cn("site-funding-calculator", className)}>
            <style jsx global>{`
                .funding-calculator__container {
                    /* Override default container styles since we use Card */
                    border: none !important;
                    padding: 0 !important;
                    background: transparent !important;
                }

                .funding-calculator__header {
                    display: none; /* Hidden since we use CardHeader */
                }

                .funding-calculator__form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .funding-calculator__field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .funding-calculator__label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: hsl(var(--foreground));
                }

                .funding-calculator__select,
                .funding-calculator__input {
                    width: 100%;
                    padding: 0.625rem 0.875rem;
                    font-size: 0.875rem;
                    border: 1px solid hsl(var(--border));
                    border-radius: 0.375rem;
                    background-color: hsl(var(--background));
                    color: hsl(var(--foreground));
                    transition: border-color 0.15s, box-shadow 0.15s;
                }

                .funding-calculator__select:focus,
                .funding-calculator__input:focus {
                    outline: none;
                    border-color: hsl(var(--ring));
                    box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
                }

                .funding-calculator__radio-group {
                    display: flex;
                    gap: 1.5rem;
                }

                .funding-calculator__radio-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: hsl(var(--foreground));
                    cursor: pointer;
                }

                .funding-calculator__radio {
                    width: 1rem;
                    height: 1rem;
                    accent-color: hsl(var(--primary));
                }

                .funding-calculator__results {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid hsl(var(--border));
                }

                .funding-calculator__results-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: hsl(var(--foreground));
                    margin-bottom: 1rem;
                }

                .funding-calculator__cost-summary {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .funding-calculator__cost-item {
                    padding: 1rem;
                    background-color: hsl(var(--muted));
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .funding-calculator__cost-item--subsidised {
                    background-color: hsl(var(--primary) / 0.1);
                    border: 1px solid hsl(var(--primary) / 0.2);
                }

                .funding-calculator__cost-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: hsl(var(--muted-foreground));
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.25rem;
                }

                .funding-calculator__cost-value {
                    display: block;
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: hsl(var(--foreground));
                }

                .funding-calculator__cost-value--subsidised {
                    color: hsl(var(--primary));
                }

                .funding-calculator__cost-value--savings {
                    color: hsl(142.1 76.2% 36.3%); /* Green */
                }

                .funding-calculator__programs {
                    margin-bottom: 1.5rem;
                }

                .funding-calculator__programs-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: hsl(var(--foreground));
                    margin-bottom: 0.75rem;
                }

                .funding-calculator__programs-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .funding-calculator__program {
                    padding: 1rem;
                    background-color: hsl(var(--card));
                    border: 1px solid hsl(var(--border));
                    border-radius: 0.5rem;
                }

                .funding-calculator__program-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .funding-calculator__badge {
                    font-size: 0.625rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    padding: 0.125rem 0.375rem;
                    background-color: hsl(var(--primary));
                    color: hsl(var(--primary-foreground));
                    border-radius: 0.25rem;
                }

                .funding-calculator__program-description {
                    font-size: 0.875rem;
                    color: hsl(var(--muted-foreground));
                    margin-bottom: 0.5rem;
                }

                .funding-calculator__program-cost {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: hsl(var(--foreground));
                    margin-bottom: 0.5rem;
                }

                .funding-calculator__program-link {
                    font-size: 0.875rem;
                    color: hsl(var(--primary));
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }

                .funding-calculator__program-link:hover {
                    text-decoration-thickness: 2px;
                }

                .funding-calculator__no-results {
                    padding: 1rem;
                    background-color: hsl(var(--muted));
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }

                .funding-calculator__no-results p {
                    font-size: 0.875rem;
                    color: hsl(var(--muted-foreground));
                    margin-bottom: 0.5rem;
                }

                .funding-calculator__no-results p:last-child {
                    margin-bottom: 0;
                }

                .funding-calculator__ineligible {
                    margin-bottom: 1rem;
                }

                .funding-calculator__ineligible-summary {
                    font-size: 0.875rem;
                    color: hsl(var(--muted-foreground));
                    cursor: pointer;
                    padding: 0.5rem 0;
                }

                .funding-calculator__ineligible-list {
                    list-style: none;
                    padding: 0;
                    margin: 0.5rem 0 0 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .funding-calculator__ineligible-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.125rem;
                    padding: 0.75rem;
                    background-color: hsl(var(--muted));
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                }

                .funding-calculator__ineligible-reason {
                    font-size: 0.75rem;
                    color: hsl(var(--muted-foreground));
                }

                .funding-calculator__disclaimer {
                    font-size: 0.75rem;
                    color: hsl(var(--muted-foreground));
                    font-style: italic;
                    padding: 0.75rem;
                    background-color: hsl(var(--muted) / 0.5);
                    border-radius: 0.375rem;
                }
            `}</style>
            <FundingCalculator
                programs={getDefaultPrograms()}
                course={course}
                defaultState={defaultState}
                components={{
                    Card: StyledCard,
                    Button: StyledButton,
                }}
            />
        </div>
    );
}

export default SiteFundingCalculator;
