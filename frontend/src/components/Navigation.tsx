"use client";

import Link from 'next/link';
import { FaLeaf, FaBinoculars, FaInfoCircle } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="bg-card border-b border-border/50 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <FaLeaf className="h-6 w-6" />
          Rainforest Explorer
        </Link>

        {/* Links and Theme Toggle */}
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              <FaLeaf className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/wildlife"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              <FaBinoculars className="h-4 w-4" />
              Wildlife
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              <FaInfoCircle className="h-4 w-4" />
              About
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}