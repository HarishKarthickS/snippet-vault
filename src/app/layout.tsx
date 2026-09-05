import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/ui/gallery.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-wall",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work",
});

export const metadata: Metadata = {
  title: "snippet-vault — Hall 14",
  description: "A black gallery wall. One white card in a spotlight. Languages as wall labels.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  );
}
