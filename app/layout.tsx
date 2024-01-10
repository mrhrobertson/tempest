import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import strings from "@/config/strings.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: strings.generic.title,
  description: strings.generic.desc,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
