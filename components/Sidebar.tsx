"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  XMarkIcon,
  Bars3Icon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useThemeStore } from "@/store/themeStore";

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
        {/* Top: avatar and chat name */}
        <div className="flex flex-col items-center pt-3 gap-3">
          <div className="flex flex-col items-center gap-1">
            <img
              src="/robot-avatar.png"
              alt="bot"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xs text-center font-semibold">1</span>
          </div>
          <button
            className="mt-2 p-1 rounded hover:bg-[var(--border)]"
            onClick={() => setIsOpen(true)}
            title="Sidebar ochish"
          >
            <Bars3Icon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        {/* Bottom: settings icon */}
        <div className="flex flex-col items-center pb-4">
          <button
            title="Sozlamalar"
            className="p-2 rounded hover:bg-[var(--border)]"
            onClick={() => setThemeOpen((v) => !v)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
          </button>
          {themeOpen && (
            <div
              ref={themeRef}
              className="absolute left-16 bottom-20 z-50 bg-[var(--border)] rounded-lg shadow-lg py-2 px-4"
            >
              <div className="font-medium text-xs mb-2 text-gray-300">
                Theme
              </div>
              <div className="flex gap-2">
                <button
                  className={`p-2 rounded ${
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
                  <ComputerDesktopIcon className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 rounded ${
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
                  <SunIcon className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 rounded ${
                    theme === "dark"
                      ? "bg-[var(--chatArea)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme("dark");
                    setThemeOpen(false);
                  }}
                  title="Dark"
                >
                  <MoonIcon className="h-5 w-5" />
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
          <img
            src="/robot-avatar.png"
            alt="bot"
            className="w-10 h-10 rounded-lg"
          />
          <span className="font-semibold text-base">1</span>
        </div>
        <button
          className="p-1 rounded hover:bg-[var(--border)]"
          onClick={() => setIsOpen(false)}
          title="Sidebar yopish"
        >
          <XMarkIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      {/* Start new chat button */}
      <div className="px-4 py-3">
        <button className="w-full flex items-center justify-center px-2 py-2 rounded text-sm font-medium border border-[var(--border)] transition bg-[var(--startNewChat)] text-[var(--foreground)]">
          <svg width="18" height="18" className="mr-1" fill="none">
            <rect
              x="7"
              y="2"
              width="4"
              height="14"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="2"
              y="7"
              width="14"
              height="4"
              rx="2"
              fill="currentColor"
            />
          </svg>
          Start New chat
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
      <div className="px-3 pb-3 pt-2">
        <div className="bg-[var(--border)] rounded-lg mb-2 p-2">
          <div className="flex items-center mb-1">
            <span className="flex-1 text-xs text-gray-300 font-medium">
              Theme
            </span>
            <button
              title="Theme"
              onClick={() => setThemeOpen((v) => !v)}
              className="p-1 rounded hover:bg-[var(--chatArea)]"
            >
              <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          {themeOpen && (
            <div ref={themeRef} className="flex gap-2 justify-end">
              <button
                className={`p-2 rounded ${
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
                <ComputerDesktopIcon className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded ${
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
                <SunIcon className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded ${
                  theme === "dark"
                    ? "bg-[var(--chatArea)] text-white"
                    : "text-gray-300"
                }`}
                onClick={() => {
                  setTheme("dark");
                  setThemeOpen(false);
                }}
                title="Dark"
              >
                <MoonIcon className="h-5 w-5" />
              </button>
            </div>
          )}
          <div className="mt-2 text-xs text-gray-400 cursor-pointer rounded hover:bg-[var(--chatArea)] px-2 py-1">
            About
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <button
            className="p-2 rounded hover:bg-[var(--chatArea)] mr-2"
            title="Sozlamalar"
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </button>
          <span>
            POWERED BY{" "}
            <span className="font-bold text-[var(--foreground)]">Dify</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
