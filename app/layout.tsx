import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";
import SeoJsonLD from '@/components/SeoJsonLD';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://udbhavprajapati.vercel.app"),

  title: "Udbhav Prajapati | Full-Stack Developer (Web + App)",

  description:
    "Portfolio of Udbhav Prajapati, Full-Stack Developer specializing in React, Next.js, Node.js, React Native and Flutter.",

  keywords: [
    "Udbhav Prajapati",
    "Udbhav's portfolio",
    "Udbhav portfolio",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
  ],

  icons: {
    icon: "/up.svg",
    apple: "/up.svg",
  },

  openGraph: {
    title: "Udbhav Prajapati",
    description: "Full-Stack Developer Portfolio",
    url: "https://udbhavprajapati.vercel.app",
    siteName: "Udbhav Prajapati Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoFlex.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/my_image.jpg" />
      </head>
      <body className="min-h-full flex flex-col"><SeoJsonLD />{children}</body>
    </html>
  );
}
