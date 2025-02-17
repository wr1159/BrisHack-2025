import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../app/globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ThemeProvider } from 'next-themes';

   
// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Optional: Use a CSS variable for the font
});

// Metadata for the site
export const metadata: Metadata = {
  title: 'Rainforest Explorer',
  description: 'Discover the wonders of the rainforest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Optional: Add custom fonts or other head elements here */}
      </head>
      <body
        className={`${inter.className} bg-background text-foreground`}
        // style={{
        //   // Apply CSS variables directly to the body
        //   backgroundColor: 'hsl(var(--background))',
        //   color: 'hsl(var(--foreground))',
        // }}
      ><Navigation />
        {/* Main content */}
        <main>{children}</main>
        <Footer />
        {/* Optional: Add a footer or other global components here */}
      </body>
    </html>
  );
}