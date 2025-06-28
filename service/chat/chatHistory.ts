import { apiFetch } from "../fetchData";

export function getChatHistory() {
    return apiFetch({
        endpoint: `/conversations?limit=100`,
        method: "GET",
    });
}



export function getMessagesByConversationId(
    conversation_id: string,
    limit: number = 50,
    user: string = "abc-123"
) {
    return apiFetch({
        endpoint: `/messages`,
        method: "GET",
        query: {
            user,
            conversation_id,
            limit,
        },
    });
}