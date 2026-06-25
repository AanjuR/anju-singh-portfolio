import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Anju Singh — AI Product Leader",
  description:
    "Anju Singh is an AI Product Leader, builder, and researcher creating AI-powered products that solve real customer problems.",
  keywords: [
    "AI Product Leader",
    "Product Management",
    "LLM",
    "AI Products",
    "Anju Singh",
  ],
  authors: [{ name: "Anju Singh" }],
  openGraph: {
    title: "Anju Singh — AI Product Leader",
    description:
      "Bridging Product Strategy, AI, and Engineering. Transforming ideas into scalable experiences.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="custom-cursor antialiased">{children}</body>
    </html>
  );
}
