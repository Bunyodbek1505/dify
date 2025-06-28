"use client";

import React, { useEffect, useState } from "react";
import { streamChatMessage } from "@/service/chat/streamChatMessage";
import MessageItem from "./MessageItem";
import StopResponding from "./Stopresponding";
import InputArea from "./InputArea";
import { stopChatMessage } from "@/service/chat/stopChatMessage";
import { getMessagesByConversationId } from "@/service/chat/chatHistory";

export interface Message {
  id: string;
  question?: string;
  answer?: string;
  isLoading?: boolean;
}

interface ChatAreaProps {
  activeChatId?: string;
}

export default function ChatArea({ activeChatId }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeChatId) return;
    getMessagesByConversationId(activeChatId, 50).then((res) => {
      if (res && Array.isArray(res.data)) {
        setMessages(
          res.data
            .map((msg: any) => ({
              id: msg.id,
              question: msg.query,
              answer: msg.answer,
            }))
            .reverse()
        );
      }
    });
  }, [activeChatId]);

  const handleSend = (question: string) => {
    const id = Date.now().toString();
    setMessages([...messages, { id, question, answer: "", isLoading: true }]);
    setIsStreaming(true);

    let fullAnswer = "";

    streamChatMessage(
      { query: question, conversation_id: activeChatId || "" },
      (chunk) => {
        fullAnswer += chunk;

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id
              ? { ...msg, answer: fullAnswer, isLoading: false }
              : msg
          )
        );
      },
      (taskId: string) => {
        setCurrentTaskId(taskId);
      }
    )
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id ? { ...msg, isLoading: false } : msg
          )
        );
        setIsStreaming(false);
      })
      .catch(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id
              ? { ...msg, answer: "Xatolik yuz berdi!", isLoading: false }
              : msg
          )
        );
        setIsStreaming(false);
      });
  };

  return (
    <main className="flex flex-col h-full bg-[var(--chatArea)] ">
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
        </div>
      </div>
      <div className="relative">
        {/* stop button */}
        {isStreaming && currentTaskId && (
          <div className="absolute top-[-20] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <StopResponding
              onStop={async () => {
                // !!! bu yerda login qilinganda userni olish kerak
                await stopChatMessage(currentTaskId);
                setIsStreaming(false);
              }}
            />
          </div>
        )}
        {/* Input area */}
        <div className="w-full px-0 pb-6 flex justify-center ">
          <div className="w-full max-w-3xl">
            <InputArea onSend={handleSend} />
          </div>
        </div>
      </div>
    </main>
  );
}
