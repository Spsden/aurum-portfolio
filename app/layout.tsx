import type { Metadata } from "next";
import { Geist, Geist_Mono, Stack_Sans_Headline } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const stack = Stack_Sans_Headline({
  variable: "--font-stack-sans-headline",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanak Maheshwari — Backend & AI Engineer",
  description:
    "Backend and AI engineer building distributed services, retrieval pipelines, and production-ready LLM applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <meta property="og:image" content="/backgrounds/metabg.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${stack.variable} antialiased min-h-screen 
  bg-theme-bg text-theme-fg
  transition-colors duration-300`}
      >

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
