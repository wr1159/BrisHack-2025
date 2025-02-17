"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'react-feather';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

 

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

 
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-card text-foreground hover:bg-accent transition-colors"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}