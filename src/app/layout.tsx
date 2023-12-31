import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import StoreProvider from "@/providers/store-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
