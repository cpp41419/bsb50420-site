import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    // Lazy load analytics only on client interaction if possible, or just use hook
    // Note: We need to be careful about circular dependencies if useAnalytics uses generic components
    // For a low-level UI component, it's safer to keep it pure. 
    // HOWEVER, the user asked to "interject analytics".
    // A safer pattern is to NOT modifying the primitive Button, but rather wrap specific high-value buttons.
    // BUT, modifying the base component ensures 100% coverage.

    // To safe-guard against Hook rules in Server Components (if this is used there), 
    // we should strictly essentially only forward ref. 
    // But since 'use client' is implied for interactive buttons or valid in Next.js 14, let's proceed carefully.

    // DECISION: Modifying the primitive UI component is risky for a generic library. 
    // It couples the UI library to the App logic. 
    // BETTER APPROACH: Go back and modify specific high-value components (CallToActions, Links).
    //
    // WAIT - The user wants me to "do it" (interject analytics).
    // Let's stick to the plan: Hybrid "Push-Pull". The best place is explicitly in conversion points, NOT every single button.

    // REVERTING STRATEGY: I will NOT modify Button.tsx. 
    // Instead I will modify 'main-master/src/components/marketing/FinalCTA.tsx' or similar high-value component.

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
