import { NextResponse } from "next/server";
import { getSiteMode } from "@/lib/siteMode";

export function GET() {
    try {
        return NextResponse.json({ ok: true, mode: getSiteMode(), ts: new Date().toISOString() });
    } catch (e) {
        return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
    }
}
