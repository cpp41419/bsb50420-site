"use client"

import Link from "next/link"
import { Menu, X, GraduationCap } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { SITE } from "@/site"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { name: "Course Info", href: "#course-info" },
        { name: "Units", href: "#units" },
        { name: "Career Outcomes", href: "#careers" },
        { name: "FAQ", href: "#faq" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4 md:px-6 mx-auto">
                <Link href="/" className="flex items-center space-x-2 mr-8">
                    <GraduationCap className="h-6 w-6 text-secondary" />
                    <span className="hidden font-bold sm:inline-block text-primary">
                        {SITE.course.code}<span className="text-secondary">.com.au</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Link
                            href="#compare"
                            className={cn(
                                "hidden md:inline-flex",
                                "h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            )}
                        >
                            Get Course Guide
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-foreground"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background p-4">
                    <nav className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-foreground py-2 border-b border-border/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="#compare"
                            className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow hover:bg-secondary/90 w-full"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Get Course Guide
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
