'use client';

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggleTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}