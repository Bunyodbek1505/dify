"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import ChatArea from "@/components/chat/ChatArea";
import { getChatHistory } from "@/service/chat/chatHistory";
import { useThemeInitializer } from "@/store/themeStore";

export default function AppLayoutClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState<string | undefined>(
    undefined
  );
  const [chatList, setChatList] = useState<{ id: string; name: string }[]>([]);
  console.log(chatList);

  useThemeInitializer();

  useEffect(() => {
    getChatHistory().then((res) => {
      const chats = res.data.map((chat: any) => ({
        id: chat.id,
        name: chat.name || "No title",
      }));
      setChatList(chats);
      console.log("Chatlar ro‘yxati:", chats);
      // Birinchi chatni active qilamiz
      if (chats.length > 0) setActiveChatId(chats[0].id);
    });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        chatList={chatList}
      />
      <div className="flex-1 relative transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)]">
        <ChatArea activeChatId={activeChatId} />
      </div>
    </div>
  );
}
