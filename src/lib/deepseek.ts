
export interface DeepSeekMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface DeepSeekResponse {
    content: string;
    usage?: {
        total_tokens: number;
        prompt_tokens: number;
        completion_tokens: number;
    };
}

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = "deepseek-chat";

export async function chatWithDeepSeek(
    messages: DeepSeekMessage[],
    temperature = 0.7
): Promise<DeepSeekResponse> {
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
        throw new Error("DEEPSEEK_API_KEY is not defined in environment variables");
    }

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: DEEPSEEK_MODEL,
                messages,
                temperature,
                stream: false, // For now, no streaming for simplicity
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("DeepSeek API Error:", errorData);
            throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return {
            content: data.choices[0].message.content,
            usage: data.usage,
        };

    } catch (error) {
        console.error("DeepSeek Chat Failed:", error);
        throw error;
    }
}
