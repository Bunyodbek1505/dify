"use client";

import { useThemeStore } from '@/store/themeStore';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      <button
        className={`p-2 rounded-md ${
          theme === 'light' ? 'text-white' : 'text-gray-400'
        } hover:bg-[var(--chatArea)]`}
        style={{
          background: theme === 'light' ? 'var(--startNewChat)' : undefined,
        }}
        onClick={() => setTheme('light')}
        title="Yorug' mavzu"
      >
        <SunIcon className="h-5 w-5" />
      </button>
      <button
        className={`p-2 rounded-md ${
          theme === 'system' ? 'text-white' : 'text-gray-400'
        } hover:bg-[var(--chatArea)]`}
        style={{
          background: theme === 'system' ? 'var(--startNewChat)' : undefined,
        }}
        onClick={() => setTheme('system')}
        title="Tizim mavzusi"
      >
        <ComputerDesktopIcon className="h-5 w-5" />
      </button>
      <button
        className={`p-2 rounded-md ${
          theme === 'dark' ? 'text-white' : 'text-gray-400'
        } hover:bg-[var(--chatArea)]`}
        style={{
          background: theme === 'dark' ? 'var(--startNewChat)' : undefined,
        }}
        onClick={() => setTheme('dark')}
        title="Qorong'u mavzu"
      >
        <MoonIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;