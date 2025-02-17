"use client";

import Link from 'next/link';
import { FaLeaf, FaBinoculars, FaInfoCircle } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="bg-foreground/10 p-2 border-b border-border/50  shadow-lg ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <FaLeaf size={24} color="currentColor" />
          Rainforest Explorer
        </Link>

        {/* Links and Theme Toggle */}
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              <FaLeaf size={16} color="currentColor" />
              Home
            </Link>
            <Link
              href="/wildlife"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              <FaBinoculars size={16} color="currentColor" />
              Wildlife
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            >
              <FaInfoCircle size={16} color="currentColor" />
              About
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}