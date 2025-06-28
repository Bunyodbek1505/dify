import { apiFetch } from "../fetchData";

export function stopChatMessage(task_id: string) {
  return apiFetch({
    endpoint: `/chat-messages/${task_id}/stop`,
    method: "POST",
    body: { user: "abc-123" },
  });
}