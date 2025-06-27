'use client';

import React, { useState } from "react";
import { PaperAirplaneIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

interface Props {
  placeholder?: string;
}

export default function InputArea({ placeholder = "Talk to 1" }: Props) {
  const [message, setMessage] = useState("");

  return (
    <div
      className="flex items-center border rounded-xl px-3 py-2 gap-2 bg-[var(--inputArea)] border-[var(--border)]"
    >
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-[var(--foreground)] text-sm px-2 placeholder-gray-400"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="p-1 rounded-full text-gray-400 hover:bg-[var(--border)] transition"
        title="Ovozli kiritish"
        onClick={() => alert("Ovozli kiritish hali qo'shilmagan!")}
      >
        <MicrophoneIcon className="h-5 w-5" />
      </button>
      <button
        className="p-1 rounded-full text-white transition disabled:opacity-30 bg-[var(--startNewChat)]"
        title="Yuborish"
        disabled={!message.trim()}
        onClick={() => setMessage("")}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </div>
  );
}