import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Splash from "./components/Splash";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WingMann | Professional Relationship Operators",
  description:
    "Deploy high-level connectors at events. Accelerate deals through strategic introductions. Confidence-as-a-Service.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "WingMann | Professional Relationship Operators",
    description:
      "Deploy high-level connectors at events. Accelerate deals through strategic introductions.",
    url: "https://wingmann.app",
    siteName: "WingMann",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased grain`}>
        <Splash />
        {children}
      </body>
    </html>
  );
}
