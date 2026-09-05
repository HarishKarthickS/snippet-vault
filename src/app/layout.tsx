import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/ui/vault.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ui",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-code",
});

export const metadata: Metadata = {
  title: "Snippet Vault",
  description: "Search, filter, and copy local code snippets.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${atkinson.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  );
}
