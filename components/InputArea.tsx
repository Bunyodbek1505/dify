"use client";

import React, { useState } from "react";
import { PaperAirplaneIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const InputArea: React.FC<InputAreaProps> = ({
  onSendMessage,
  placeholder = "Talk to 1",
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-[1099px] flex justify-center items-center p-1 border border-gray-800 bg-[#2B2B30] gap-3">
      <input
        type="text"
        className="w-full flex-grow px-4  text-gray-100  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="p-3 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
        title="Ovozli kiritish"
        onClick={() => alert("Ovozli kiritish hali qo'shilmagan!")}
      >
        <MicrophoneIcon className="h-6 w-6" />
      </button>
      <button
        className="p-3 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        title="Yuborish"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default InputArea;
