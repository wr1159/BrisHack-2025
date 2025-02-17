import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>

          {/* Tagline */}
          <p className="text-center text-primary">
            🌿 Protect Rainforests - Protect Our Future 🌿
          </p>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rainforest Explorer
          </p>
        </div>
      </div>
    </footer>
  );
}