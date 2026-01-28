import { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { MasterDomainBanner } from "@/components/MasterDomainBanner"

import { AuthorityBar } from "@/components/shell/AuthorityBar"

interface ShellProps {
    children: ReactNode
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <AuthorityBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MasterDomainBanner />
        </div>
    )
}
