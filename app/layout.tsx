import React from "react"
import "./globals.css";
import Navbar from "../components/Navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "My Blog",
  description: "A beautiful blog built with Next.js & Nest.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}