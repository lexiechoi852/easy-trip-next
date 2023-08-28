import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import StoreProvider from "@/store/provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
