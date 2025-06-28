"use client";

import React from "react";

interface ChatHistoryItemProps {
  title: string;
  onClick?: () => void;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  title,
  onClick,
}) => {
  return (
    <li
      className="p-3 text-sm cursor-pointer border-b bg-red-500 hover:bg-[var(--border, #232327)] last:border-b-0"
      style={{
        borderColor: "var(--border, #232327)",
        color: "var(--foreground)",
      }}
      onClick={onClick}
    >
      {title}
    </li>
  );
};

export default ChatHistoryItem;