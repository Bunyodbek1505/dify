import { API_KEY, API_URL } from "@/global";

export type ChatMessagePayload = {
    inputs?: Record<string, any>;
    query: string;
    response_mode?: string;
    conversation_id?: string;
    user?: string;
    files?: any;
};

export async function streamChatMessage(payload: ChatMessagePayload, onChunk: (text: string) => void): Promise<void> {
    const { endpoint = "/chat-messages" } = {};
    const url = API_URL + endpoint;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (API_KEY) {
        headers["Authorization"] = `Bearer ${API_KEY}`;
    }

    const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
            inputs: payload.inputs || {},
            query: payload.query,
            response_mode: payload.response_mode || "streaming",
            conversation_id: payload.conversation_id || "",
            user: payload.user || "abc-123",
            files: payload.files,
        })
    });

    if (!res.ok || !res.body) {
        throw new Error("API yoki stream bilan muammo");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // SSE format: har bir qator -> data: {...}
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // oxirgi bo‘lak bo‘lishi mumkin, keyingi iteratsiyada davom etadi

        for (let line of lines) {
            line = line.trim();

            if (line.startsWith('data:')) {
                const jsonStr = line.slice(5).trim();
                if (jsonStr === '[DONE]') continue;
                try {
                    const msg = JSON.parse(jsonStr);
                    // msg.content yoki msg.answer yoki msg.data.content ni tekshiring
                    if (msg.event === 'message' && msg.answer) {
                        onChunk(msg.answer);
                    } else if (msg.event === 'message' && msg.data?.content) {
                        // Ba’zi APIlarda structure boshqacha bo‘lishi mumkin
                        onChunk(msg.data.content);
                    }
                } catch { /* ignore */ }
            }
        }
    }
}