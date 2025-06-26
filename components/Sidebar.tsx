// components/Sidebar.tsx
"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import ChatHistoryItem from "./ChatHistoryItem";
import { PlusIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  // Demo suhbat tarixi
  const chatHistory = [
    { id: "new", title: "New conversation" },
    { id: "js", title: "what is js" },
    { id: "hi", title: "hi" },
  ];

  return (
    <aside className="flex flex-col h-full bg-[#1D1D20] text-gray-100 p-4 border-r border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800">
      <div className="sidebar-header mb-4">
        <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 rounded-md text-white dark:text-gray-100 font-semibold text-sm">
          <PlusIcon className="h-5 w-5 mr-2" />
          Start New chat
        </button>
      </div>
      <ul className="flex-grow overflow-y-auto list-none p-0 m-0 text-gray-300 dark:text-gray-400 text-sm">
        {chatHistory.map((chat) => (
          <ChatHistoryItem
            key={chat.id}
            title={chat.title}
            onClick={() => console.log("Chat selected:", chat.id)}
          />
        ))}
      </ul>
      <div className="sidebar-bottom pt-4 border-t border-gray-700 dark:border-gray-800 mt-auto text-sm">
        <ThemeSwitcher />
        {/* "About" elementi */}
        <div className="p-2 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-600 rounded-md mb-2 text-gray-300 dark:text-gray-400">
          About
        </div>
        {/* Pastki chapdagi options/settings ikonka va Powered By */}
        <div className="flex items-center text-gray-400 dark:text-gray-500">
          {/* Options/Settings ikonka */}
          <button
            className="p-1 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 text-gray-400 dark:text-gray-500 mr-2"
            title="Sozlamalar"
            onClick={() => alert("Options tugmasi bosildi!")}
          >
            <Bars3BottomLeftIcon className="h-5 w-5" />
          </button>
          <div className="text-xs flex-grow">POWERED BY **Dify**</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
