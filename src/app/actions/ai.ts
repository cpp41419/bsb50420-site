"use server";

import { chatWithDeepSeek } from "@/lib/deepseek";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function askHeroAI(userQuery: string, context?: string, siteDetails?: any) {
    if (!userQuery.trim()) {
        return { error: "Please enter a query." };
    }

    const systemPrompt = `
You are a Regulatory Compliance Analyst for the Australian Vocational Education and Training (VET) sector.
Your role is to strictly interpret the training package requirements for the provided qualification context.

Core Directives:
1. **Authority Voice**: Speak like a senior auditor or regulator. Use terms like "Unit of Competency", "Prerequisite", "AQF Level", and "Assessment Conditions".
2. **No Marketing**: Do not use "fluff" words like "exciting journey", "unlock your potential", or "great choice". State the facts.
3. **Citation Grounding**: Every technical claim must be groundable. If the provided context contains a specific ID or Reference (e.g. from a Knowledge Graph), use a markdown citation link to it.
4. **Regulatory Accuracy**: If asked about outcomes, refer to "Licensing/Regulatory Outcomes" first, then "Employment Outcomes".
5. **Unknowns**: If the specific data (like a price or date) is not in the context, explicitly state: "This data varies by RTO and funding contract." Do not guess.
6. **Formatting**: Use bullet points for clarity. Keep responses dense and information-rich.

${context ? `Technical Context:\n${context}` : ""}
`;

    try {
        const response = await chatWithDeepSeek([
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuery },
        ]);

        // Async Logging (Fire and Forget)
        if (supabaseAdmin) {
            (async () => {
                try {
                    await supabaseAdmin.from('chat_logs').insert({
                        site_key: siteDetails?.siteKey || 'unknown',
                        course_code: siteDetails?.courseCode || 'unknown',
                        user_query: userQuery,
                        ai_response: response.content,
                        metadata: siteDetails || {},
                        provider: 'deepseek' // Tracking which AI provider was used
                    });
                } catch (logError) {
                    console.error("Failed to log chat:", logError);
                }
            })();
        }

        return { success: true, data: response.content };
    } catch (error) {
        console.error("Hero AI Action Error:", error);
        return { error: "I'm having trouble connecting to the knowledge base right now. Please try again later." };
    }
}
