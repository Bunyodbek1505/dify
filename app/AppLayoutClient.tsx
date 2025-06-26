'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useThemeInitializer } from '@/store/themeStore'; 

interface AppLayoutClientProps {
  children: React.ReactNode; 
}

const AppLayoutClient: React.FC<AppLayoutClientProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useThemeInitializer();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-0' 
        } overflow-hidden`}
      >
        <Sidebar />
      </div>

      <div className="flex flex-col flex-grow relative">
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 ${isSidebarOpen ? 'hidden' : 'left-4'} z-10 p-2 bg-gray-700 dark:bg-gray-800 text-white dark:text-gray-200 rounded-md transition-all duration-300 ease-in-out`}
          title={isSidebarOpen ? 'Sidebar yopish' : 'Sidebar ochish'}
        >
          {/* Holatga qarab ikonka o'zgaradi */}
          {isSidebarOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>

        {children}
      </div>
    </div>
  );
};

export default AppLayoutClient;