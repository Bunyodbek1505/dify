'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore'; 
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-300 dark:text-gray-400 text-sm">Mavzu</span>
      <div className="flex border border-gray-600 dark:border-gray-500 rounded-md overflow-hidden">
        <button
          className={`px-3 py-2 text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 ${
            theme === 'system' ? 'bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-100' : ''
          }`}
          onClick={() => setTheme('system')}
          title="Tizim mavzusi"
        >
          <ComputerDesktopIcon className="h-5 w-5" />
        </button>
        <button
          className={`px-3 py-2 text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 ${
            theme === 'light' ? 'bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-100' : ''
          }`}
          onClick={() => setTheme('light')}
          title="Yorug' mavzu"
        >
          <SunIcon className="h-5 w-5" />
        </button>
        <button
          className={`px-3 py-2 text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 ${
            theme === 'dark' ? 'bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-100' : ''
          }`}
          onClick={() => setTheme('dark')}
          title="Qorong'u mavzu"
        >
          <MoonIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;