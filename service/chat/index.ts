import { apiFetch } from "../fetchData";

export interface ChatMessagePayload {
  inputs?: object;
  query: string;
  response_mode?: string;
  conversation_id?: string;
  user?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

//   const formData = new FormData();
//   formData.append("query", payload.query);
//   formData.append("response_mode", payload.response_mode || "streaming");
//   formData.append("conversation_id", payload.conversation_id || "");
//   formData.append("user", payload.user || "abc-123");
//   if (payload.inputs) {
//     formData.append("inputs", JSON.stringify(payload.inputs));
//   }
//   if (payload.files) {
//     payload.files.forEach((file, idx) => {
//       formData.append(`files[${idx}]`, file);
//     });
//   }

//   return apiFetch({
//     endpoint: "/chat-messages",
//     method: "POST",
//     body: formData
//   });
// }