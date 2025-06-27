import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayoutClient from "./AppLayoutClient";
import Providers from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dify",
  description: "Chat UI with Next.js, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppLayoutClient>{children}</AppLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
