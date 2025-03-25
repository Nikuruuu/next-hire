import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextHire – AI-Powered Interview & Prep Platform",
  description:
    "NextHire helps job seekers prepare for interviews and enables employers to conduct AI-driven real-time assessments, streamlining the hiring process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
