import React from "react";

interface ChatItem {
  id: string;
  name: string;
}

interface ChatHistoryProps {
  chats: ChatItem[];
  activeChatId?: string;
  onSelectChat?: (id: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chats,
  activeChatId,
  onSelectChat,
}) => {
  return (
    <ul className="flex-1 px-2 pt-1 overflow-y-auto">
      {chats.map((chat) => (
        <li
          key={chat.id}
          className={`px-3 py-2 rounded cursor-pointer mb-1 text-sm flex items-center gap-2 ${
            chat.id === activeChatId
              ? "bg-[var(--border)] text-[var(--foreground)] font-medium"
              : "hover:bg-[var(--border)] text-gray-300"
          }`}
          onClick={() => onSelectChat && onSelectChat(chat.id)}
        >
          {chat.name}
        </li>
      ))}
    </ul>
  );
};

export default ChatHistory;
