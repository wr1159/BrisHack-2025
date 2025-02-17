import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border/50 py-8 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Social Media Links */}
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            <FaInstagram size={24} color="currentColor" />
                        </a>
                        <a
                            href="#"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            <FaTwitter size={24} color="currentColor" />
                        </a>
                        <a
                            href="#"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            <FaYoutube size={24} color="currentColor" />
                        </a>
                    </div>

                    {/* Tagline */}
                    <p className="text-center text-primary">
                        🌿 Protect the Ecosystem - Protect Our Future 🌿
                    </p>

                    {/* Copyright */}
                    <div className="flex gap-2 items-center">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} SnapTrack
                        </p>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    );
}
