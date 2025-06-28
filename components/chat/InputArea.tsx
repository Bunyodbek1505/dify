"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { sendChatMessage } from "@/service/chat/sendMessage";

interface Props {
  onSend: (
    question: string,
    getAnswer: (cb: (answer: string) => void) => void
  ) => void;
  placeholder?: string;
}

export default function InputArea({
  onSend,
  placeholder = "Talk to 1",
}: Props) {
  const [message, setMessage] = useState("");
  const mutation = useMutation({
    mutationFn: (msg: string) => sendChatMessage({ query: msg }),
  });

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message, (cb) => {
      mutation.mutate(message, {
        onSuccess: (data) => cb(data.answer),
        onError: () => cb("Xatolik yuz berdi!"),
      });
    });
    setMessage("");
  };

  return (
    <div className="flex items-center border rounded-xl p-3 gap-1 bg-[var(--inputArea)] border-[var(--border)]">
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-[var(--foreground)] text-sm px-2 placeholder-gray-400"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim()) {
            handleSend();
          }
        }}
        disabled={mutation.isPending}
      />
      <button
        className="p-1 rounded-full text-gray-400 hover:bg-[var(--border)] transition cursor-pointer"
        title="Ovozli kiritish"
        onClick={() => alert("Ovozli kiritish hali qo'shilmagan!")}
      >
        <Icon icon={"mdi:microphone-outline"} className="h-5 w-5" />
      </button>
      <button
        className="py-1 px-2 rounded-sm text-white transition disabled:opacity-30 bg-[var(--sendChatBg)] cursor-pointer"
        title="Yuborish"
        disabled={!message.trim() || mutation.isPending}
        onClick={handleSend}
      >
        <Icon icon={"material-symbols:send-rounded"} className="h-5 w-5" />
      </button>
    </div>
  );
}
