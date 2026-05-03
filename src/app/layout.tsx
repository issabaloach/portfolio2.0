import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Issa | Full-Stack Developer",
  description: "Results-driven Full-Stack Developer specializing in building responsive, high-performance web applications using React, Next.js, TypeScript, and modern UI frameworks. Based in Karachi, Pakistan.",
  keywords: ["Full-Stack Developer", "React Developer", "Next.js", "TypeScript", "Node.js", "Web Development", "Frontend Developer", "Karachi", "Pakistan"],
  authors: [{ name: "Muhammad Issa" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Muhammad Issa | Full-Stack Developer",
    description: "Full-Stack Developer specializing in building responsive, high-performance web applications using React, Next.js, and modern UI frameworks.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Issa | Full-Stack Developer",
    description: "Full-Stack Developer specializing in building responsive, high-performance web applications using React, Next.js, and modern UI frameworks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
