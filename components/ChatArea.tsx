"use client";

import React from "react";
import InputArea from "./InputArea";

const ChatArea: React.FC = () => {
  //   const messages: string[] = [];

  const handleSendMessage = (message: string) => {
    console.log("Yuborilmoqda:", message);
  };

  return (
    <main className="flex flex-col flex-grow bg-[#212124] dark:bg-gray-800">
      <div className="flex-grow p-6 overflow-y-auto">
        {/* messages.map((msg, index) => (
            <div key={index} className="mb-2 p-3 bg-gray-700 dark:bg-gray-600 rounded-md text-white dark:text-gray-100">
              {msg}
            </div>
          )) */}
        {/* Hozircha bo'sh */}
      </div>

      <InputArea onSendMessage={handleSendMessage} placeholder="Talk to 1" />
    </main>
  );
};

export default ChatArea;
