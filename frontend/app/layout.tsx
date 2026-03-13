import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onepercentbetter.xyz"),
  title: "onepercentbetter — Systems for compound growth",
  description:
    "A landing page for Chris S. Yoon's products, experiments, and systems built around one core belief: small improvements compound.",
  openGraph: {
    title: "onepercentbetter — Systems for compound growth",
    description:
      "Products, experiments, and operating systems built around one core belief: get one percent better, repeatedly.",
    url: "https://onepercentbetter.xyz",
    siteName: "onepercentbetter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "onepercentbetter — Systems for compound growth",
    description:
      "Products, experiments, and operating systems built around one core belief: get one percent better, repeatedly.",
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
