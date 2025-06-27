import Image from "next/image";
import React from "react";
import avatarImage from "@/public/avatar.png";

export default function MessageItem({
  question,
  answer,
  isLoading,
}: {
  question?: string;
  answer?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Question (user) */}
      <div className="flex justify-end">
        <div className="rounded-xl px-4 py-3 shadow-sm bg-[var(--inputArea)] text-[var(--foreground)] max-w-[60%] mr-2 font-medium text-base">
          <Image src={avatarImage} alt="avatar" className="w-10 h-10" />
          {question}
        </div>
      </div>
      {/* Answer (AI) */}
      <div className="flex justify-start">
        <div className="rounded-xl px-4 py-3 shadow-sm bg-[var(--sidebar)] text-[var(--foreground)] max-w-[80%] ml-2 border border-[var(--border)]">
          <div className="flex items-center mb-2 gap-2">
            <span className="font-semibold text-base">1</span>
          </div>
          {isLoading ? (
            <span className="italic text-gray-400">Yuklanmoqda...</span>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: answer || "" }} />
          )}
          {answer}
        </div>
      </div>
    </div>
  );
}
