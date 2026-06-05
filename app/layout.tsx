import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Udbhav Prajapati | Full-Stack Developer (Web + App)",
  description: "Portfolio of Udbhav Prajapati, a skilled Full-Stack Developer (Web & Mobile) specializing in building fast, scalable applications using React, Next.js, Node.js, React Native, and Flutter.",
  keywords: ["Udbhav Prajapati", "Full Stack Developer", "Web Developer", "Mobile Developer", "React Developer", "Next.js Developer", "React Native Developer", "Groovy Technoweb Intern"],
  authors: [{ name: "Udbhav Prajapati" }],
  creator: "Udbhav Prajapati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
