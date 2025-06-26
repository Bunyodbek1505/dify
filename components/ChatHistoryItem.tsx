'use client';

import React from 'react';

interface ChatHistoryItemProps {
  title: string;
  // id: string;
  // isActive?: boolean;
  onClick?: () => void;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  title,
  // isActive,
  onClick,
}) => {
  return (
    <li
      className="p-3 text-sm cursor-pointer border-b border-gray-700 dark:border-gray-600 hover:bg-gray-700 dark:hover:bg-gray-600 last:border-b-0"
      onClick={onClick}
    >
      {title}
    </li>
  );
};

export default ChatHistoryItem;