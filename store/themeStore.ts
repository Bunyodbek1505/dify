// store/themeStore.ts
import { useEffect } from 'react';
import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  // Bu setter faqat ichki logic uchun, tashqaridan setResolvedTheme chaqirilmaydi
  _setResolvedTheme: (resolvedTheme: ResolvedTheme) => void;
}

// Brauzerda resolved theme'ni hisoblash funksiyasi
const calculateResolvedTheme = (currentTheme: Theme): ResolvedTheme => {
  // Server-side render paytida window mavjud emas, light default
  if (typeof window === 'undefined') {
    return 'light';
  }
  if (currentTheme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return currentTheme;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'system',
  resolvedTheme: 'light',

  setTheme: (newTheme: Theme) => {
    set({ theme: newTheme });
    const newResolved = calculateResolvedTheme(newTheme);
    get()._setResolvedTheme(newResolved);

    if (typeof window !== 'undefined') {
       localStorage.setItem('theme', newTheme);
    }
  },

  _setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
}));


export const useThemeInitializer = () => {
    const { theme, resolvedTheme, setTheme, _setResolvedTheme } = useThemeStore();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const initialTheme = (savedTheme as Theme | null) || 'system';
            useThemeStore.setState({ theme: initialTheme });

            const initialResolved = calculateResolvedTheme(initialTheme);
            useThemeStore.setState({ resolvedTheme: initialResolved });

            const root = document.documentElement;
            if (initialResolved === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, []); 


    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            if (resolvedTheme === 'dark') {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [resolvedTheme]); 


    useEffect(() => {
        let mediaQuery: MediaQueryList | undefined;
        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            const currentThemeState = useThemeStore.getState().theme;
            if (currentThemeState === 'system') {
                 const updatedResolved = event.matches ? 'dark' : 'light';
                 _setResolvedTheme(updatedResolved);
            }
        };

        if (typeof window !== 'undefined' && theme === 'system') {
            mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        }

        return () => {
            if (mediaQuery) {
                mediaQuery.removeEventListener('change', handleSystemThemeChange);
            }
        };
    }, [theme, _setResolvedTheme]);
};