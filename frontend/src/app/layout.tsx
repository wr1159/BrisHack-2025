import type { Metadata } from "next";
import "@coinbase/onchainkit/styles.css";
import { Averia_Serif_Libre } from "next/font/google";
import "../app/globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ThemeProvider from "@/components/theme-provider";
import { Providers } from "@/components/Provider";

// Initialize the Inter font
const averiaSerif = Averia_Serif_Libre({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: "300",
});

// Metadata for the site
export const metadata: Metadata = {
    title: "Rainforest Explorer",
    description: "Discover the wonders of the rainforest",
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
                className={`${averiaSerif.className} bg-background text-foreground`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>
                        <Navigation />
                        {/* Main content */}
                        <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url(/images/bg.jpg)]">
                            {children}
                        </main>
                        <Footer />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
