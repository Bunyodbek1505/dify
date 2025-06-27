"use client";

import React, { useState } from "react";
import InputArea from "./InputArea";
import MessageItem from "./MessageItem";
import { streamChatMessage } from "@/service/chat/streamChatMessage";

export interface Message {
  id: string;
  question?: string;
  answer?: string;
  isLoading?: boolean;
}

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);

  console.log(messages, "messages");

  const handleSend = (question: string) => {
    const id = Date.now().toString(); 
    setMessages([...messages, { id, question, answer: "", isLoading: true }]);

    let fullAnswer = "";

    streamChatMessage({ query: question }, (chunk) => {
      fullAnswer += chunk;

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, answer: fullAnswer, isLoading: false } : msg
        )
      );
    })
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id ? { ...msg, isLoading: false } : msg
          )
        );
      })
      .catch(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id
              ? { ...msg, answer: "Xatolik yuz berdi!", isLoading: false }
              : msg
          )
        );
      });
  };

  return (
    <main className="flex flex-col h-full bg-[var(--chatArea)]">
      <div className="flex-1 overflow-y-auto p-0 flex flex-col items-center pt-6">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              question={msg.question}
              answer={msg.answer}
              isLoading={msg.isLoading}
            />
          ))}
          {/* {ai} */}
        </div>
      </div>
      <div className="w-full px-0 pb-6 flex justify-center">
        <div className="w-full max-w-2xl">
          <InputArea onSend={handleSend} />
        </div>
      </div>
    </main>
  );
}
