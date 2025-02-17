"use client";

import Link from "next/link";
import { FaLeaf, FaBinoculars } from "react-icons/fa";
import { WalletComponents } from "./Wallet";

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
                    SnapTrack
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
                            href="/"
                            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                        >
                            <FaBinoculars size={16} color="currentColor" />
                            Wildlife
                        </Link>
                    </div>
                    <WalletComponents />
                </div>
            </div>
        </nav>
    );
}
