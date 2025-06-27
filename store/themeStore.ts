import { useEffect } from 'react';
import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  _setResolvedTheme: (resolvedTheme: ResolvedTheme) => void;
}

const calculateResolvedTheme = (theme: Theme): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    const resolved = calculateResolvedTheme(newTheme);
    get()._setResolvedTheme(resolved);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(resolved);
    }
  },
  _setResolvedTheme: (resolvedTheme) => {
    set({ resolvedTheme });
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(resolvedTheme);
    }
  },
}));

export const useThemeInitializer = () => {
  const { setTheme, _setResolvedTheme } = useThemeStore();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
      setTheme(savedTheme);

      const handleMediaQuery = (e: MediaQueryListEvent) => {
        if (useThemeStore.getState().theme === 'system') {
          const resolved = e.matches ? 'dark' : 'light';
          _setResolvedTheme(resolved);
        }
      };

      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', handleMediaQuery);

      return () => mql.removeEventListener('change', handleMediaQuery);
    }
  }, [setTheme, _setResolvedTheme]);
};