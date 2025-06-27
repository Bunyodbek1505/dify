'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useThemeInitializer } from '@/store/themeStore';

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useThemeInitializer();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 relative transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </div>
    </div>
  );
}