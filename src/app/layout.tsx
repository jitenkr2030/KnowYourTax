import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KnowYourTax.ai - Smart Tax Management for Indian Citizens",
  description: "Empowering every Indian to understand and optimize their tax payments with AI-powered insights and analytics.",
  keywords: ["KnowYourTax.ai", "Tax Management", "Indian Tax", "GST", "Income Tax", "Tax Calculator", "Tax Analytics"],
  authors: [{ name: "KnowYourTax.ai Team" }],
  openGraph: {
    title: "KnowYourTax.ai - Smart Tax Management",
    description: "Know exactly how much tax you pay in India with AI-powered insights and analytics.",
    url: "https://knowyourtax.ai",
    siteName: "KnowYourTax.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KnowYourTax.ai - Smart Tax Management",
    description: "Know exactly how much tax you pay in India with AI-powered insights and analytics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
