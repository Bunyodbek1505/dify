'use client';

import React from "react";
import InputArea from "./InputArea";

export default function ChatArea() {
  return (
    <main className="flex flex-col h-full bg-[var(--chatArea)] text-[var(--foreground)]">
      <div className="flex-1 overflow-y-auto p-0"></div>
      <div className="w-full px-0 pb-6 flex justify-center">
        <div className="w-full max-w-2xl">
          <InputArea placeholder="Talk to 1" />
        </div>
      </div>
    </main>
  );
}