export type SiteMode = "main" | "answers";

export function getSiteMode(): SiteMode {
    const mode = process.env.SITE_MODE;
    if (mode !== "main" && mode !== "answers") {
        // In development, providing a helpful fallback or error is useful, 
        // but the contract says "build dies", so we throw.
        // However, for local dev without env vars set, this might be annoying.
        // Given the strict request, we stick to the error.
        throw new Error(
            `SITE_MODE missing/invalid. Expected "main" | "answers". Got: ${String(mode)}`
        );
    }
    return mode;
}

export function assertSiteMode(expected: SiteMode) {
    const actual = getSiteMode();
    if (actual !== expected) {
        throw new Error(`SITE_MODE mismatch. Expected "${expected}". Got "${actual}"`);
    }
}
