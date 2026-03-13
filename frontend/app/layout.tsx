import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onepercentbetter.now"),
  title: "1% Better",
  description:
    "Quiet products, fast loops, and a public system for funding, hiring, and compounding better work.",
  icons: {
    icon: [
      { url: "/logo-256.png?v=3", sizes: "256x256", type: "image/png" },
      { url: "/logo-48.png?v=3", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo-48.png?v=3",
    apple: "/logo-256.png?v=3",
  },
  openGraph: {
    title: "1% Better",
    description:
      "Quiet products, fast loops, and a public system for funding, hiring, and compounding better work.",
    url: "https://onepercentbetter.now",
    siteName: "1% Better",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1% Better",
    description:
      "Quiet products, fast loops, and a public system for funding, hiring, and compounding better work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
