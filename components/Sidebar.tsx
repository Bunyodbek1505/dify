"use client";

import React, { useState, useRef, useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { Icon } from "@iconify/react/dist/iconify.js";

const chatHistory = [
  { id: "1", title: "New conversation" },
  { id: "2", title: "what is js" },
  { id: "3", title: "hi" },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
  activeChatId = "1",
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeChatId?: string;
}) {
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    }
    if (themeOpen) window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [themeOpen]);

  // Sidebar collapsed
  if (!isOpen) {
    return (
      <aside className="flex flex-col justify-between h-full w-[72px] bg-[var(--sidebar)] border-r border-[var(--border)] text-[var(--foreground)] transition-all duration-300 relative">
        {/* avatar and chat name */}
        <div className="flex flex-col items-center pt-3 gap-3">
          <div className="flex flex-col items-center gap-1">
            {/* <Image src={difyImage} alt="Dify logo" className="text-white"/> */}

            <span className="text-sm text-center font-semibold">Dify</span>
          </div>
          <button
            className="mt-2 p-1 rounded hover:bg-[var(--border)]"
            onClick={() => setIsOpen(true)}
            title="Sidebar ochish"
          >
            <Icon
              icon={"material-symbols:right-panel-close-outline-sharp"}
              className="h-6 w-6 text-gray-400"
            />
          </button>
        </div>
        {/* Bottom: settings icon */}
        <div className="flex flex-col items-center pb-4">
          <button
            title="Sozlamalar"
            className="p-2 rounded hover:bg-[var(--border)]"
            onClick={() => setThemeOpen((v) => !v)}
          >
            <Icon
              icon={"material-symbols:settings-outline"}
              className="h-5 w-5 text-gray-400"
            />
          </button>
          {themeOpen && (
            <div
              ref={themeRef}
              className="absolute left-16 bottom-20 z-50 bg-[var(--border)] rounded-lg shadow-lg py-2 px-4"
            >
              <div className="font-medium text-xs mb-2 text-gray-300">
                Theme
              </div>
              <div className="flex gap-2 ">
                <button
                  className={`p-2 rounded-lg ${
                    theme === "system"
                      ? "bg-[var(--chatArea)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme("system");
                    setThemeOpen(false);
                  }}
                  title="System"
                >
                  <Icon
                    icon="fluent:desktop-mac-24-regular"
                    className="h-5 w-5"
                  />
                </button>
                <button
                  className={`p-2 rounded-lg ${
                    theme === "light"
                      ? "bg-[var(--chatArea)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme("light");
                    setThemeOpen(false);
                  }}
                  title="Light"
                >
                  <Icon icon="mingcute:sun-line" className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 rounded-xl ${
                    theme === "dark"
                      ? "bg-[var(--themeIconBg)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme("dark");
                    setThemeOpen(false);
                  }}
                  title="Dark"
                >
                  <Icon
                    icon="material-symbols-light:dark-mode-outline"
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    );
  }

  // Full sidebar open
  return (
    <aside className="flex flex-col h-full w-[260px] bg-[var(--sidebar)] border-r border-[var(--border)] text-[var(--foreground)] transition-all duration-300 relative">
      {/* Header */}
      <div className="flex items-center justify-between h-[56px] px-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base">Dify</span>
        </div>
        <button
          className="p-1 rounded hover:bg-[var(--border)]"
          onClick={() => setIsOpen(false)}
          title="Sidebar yopish"
        >
          <Icon icon="lucide:panel-left" />
        </button>
      </div>
      {/* Start new chat button */}
      <div className="px-4 py-3">
        <button className="w-full flex items-center justify-center gap-1 px-2 py-2 rounded-xl cursor-pointer text-sm font-medium border border-[var(--border)] transition bg-[var(--startNewChat)] text-[var(--foreground)]">
          <span>
            <Icon
              icon="material-symbols:edit-square-outline-rounded"
              className="text-sm"
            />
          </span>
          <span className="text-sm"> Start New chat</span>
        </button>
      </div>
      {/* Chat list */}
      <ul className="flex-1 px-2 pt-1 overflow-y-auto">
        {chatHistory.map((chat) => (
          <li
            key={chat.id}
            className={`px-3 py-2 rounded cursor-pointer mb-1 text-sm flex items-center gap-2 ${
              chat.id === activeChatId
                ? "bg-[var(--border)] text-[var(--foreground)] font-medium"
                : "hover:bg-[var(--border)] text-gray-300"
            }`}
          >
            {chat.title}
          </li>
        ))}
      </ul>
      {/* Footer */}
      <div className="flex px-1 pb-3 pt-2">
        {/* toggle */}
        {themeOpen && (
          <div className="bg-[var(--border)] rounded-lg mb-2 p-2">
            <div className="flex justify-between items-center mb-0">
              <div>
                <span className="flex-1 text-xs text-gray-300 font-medium">
                  Theme
                </span>
              </div>
              <div
                ref={themeRef}
                className="bg-[var(--themeBgModalBtn)] px-1 py-1 rounded-lg flex items-center gap-1"
              >
                <button
                  className={`p-2 rounded-lg ${
                    theme === "system"
                      ? "bg-[var(--chatArea)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme("system");
                    setThemeOpen(false);
                  }}
                  title="System"
                >
                  <Icon
                    icon="fluent:desktop-mac-24-regular"
                    className="h-5 w-5"
                  />
                </button>

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-gray-600 mx-1 opacity-40" />

                <button
                  className={`p-2 rounded-lg ${
                    theme === "light"
                      ? "bg-[var(--chatArea)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme("light");
                    setThemeOpen(false);
                  }}
                  title="Light"
                >
                  <Icon icon="mingcute:sun-line" className="h-5 w-5" />
                </button>

                <button
                  className={`p-2 rounded-xl ${
                    theme === "dark"
                      ? "bg-[var(--themeIconBg)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme("dark");
                    setThemeOpen(false);
                  }}
                  title="Dark"
                >
                  <Icon
                    icon="material-symbols-light:dark-mode-outline"
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 cursor-pointer rounded hover:bg-[var(--chatArea)] px-2 py-1">
              About
            </div>
          </div>
        )}

        {/*  */}
        <div className="flex justify-baseline items-center text-xs text-gray-400">
          <button
            className="p-2 rounded hover:bg-[var(--chatArea)] mr-2"
            title="Sozlamalar"
            onClick={() => setThemeOpen((v) => !v)}
          >
            <Icon
              icon={"material-symbols:settings-outline"}
              className="h-5 w-5 text-gray-400"
            />
          </button>
          <span>
            POWERED BY{" "}
            <span className="font-bold text-[var(--foreground)]">
              Smart Base
            </span>
          </span>
        </div>
      </div>
    </aside>
  );
}
