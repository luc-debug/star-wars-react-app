import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Galaxy from "@/components/galaxy";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars Databank",
  description: "Explore the Star Wars universe with data from SWAPI",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Galaxy
          density={1}
          glowIntensity={0.2}
          saturation={0}
          hueShift={160}
          twinkleIntensity={0.3}
          rotationSpeed={0.05}
          repulsionStrength={5.5}
          autoCenterRepulsion={20}
          starSpeed={0.8}
          speed={0.8}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
