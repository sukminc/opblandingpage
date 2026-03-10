import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "onepercentbetter.poker — GTO Defends. We Exploit.",
  description:
    "Data-driven poker exploit quantification platform. Turn GTO deviations into measurable bb/100 edge.",
  openGraph: {
    title: "onepercentbetter.poker",
    description: "GTO Defends. We Exploit.",
    url: "https://onepercentbetter.poker",
    siteName: "onepercentbetter.poker",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
