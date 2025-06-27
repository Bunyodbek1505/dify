/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        sidebar: 'var(--sidebar)',
        'sidebar-dark': 'var(--sidebar-dark)',
        border: 'var(--border)',
        'border-dark': 'var(--border-dark)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;