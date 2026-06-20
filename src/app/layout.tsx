import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AltLab — Engineering the Future of AI-Native Computing",
  description:
    "AltLab is an independent AI systems research and infrastructure company researching persistent memory systems, AI workflow orchestration, runtime infrastructure, and AI-native operating systems.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "AltLab — Engineering the Future of AI-Native Computing",
    description:
      "Researching memory systems, agent orchestration, AI runtimes and intelligent operating systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-bg font-body text-ink antialiased">
        <div className="pointer-events-none fixed inset-0 bg-grid-fade" />
        <div className="noise-overlay pointer-events-none fixed inset-0" />
        <div className="relative">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
