import { apiFetch } from "../fetchData";

export interface ChatMessagePayload {
  inputs?: object;
  query: string;
  response_mode?: string;
  conversation_id?: string;
  user?: string;
  files?: Array<any>;
}

export function sendChatMessage(payload: ChatMessagePayload) {
  return apiFetch({
    endpoint: "/chat-messages",
    method: "POST",
    body: {
      inputs: payload.inputs || {},
      query: payload.query,
      response_mode: payload.response_mode || "streaming",
      conversation_id: payload.conversation_id || "",
      user: payload.user || "abc-123",
      files: payload.files,
    }
  });
}

