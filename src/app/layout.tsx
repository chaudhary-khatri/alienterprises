"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar"; // Adjust the path if needed
import Footer from "@/components/Footer"; // Adjust the path if needed
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Ensure client-side rendering (if needed for window-specific code)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <title>Ali Enterprises</title>
        </Head>
        <body className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="pt-10">
            {isClient ? children : null}
          </main>
          <Footer />
        </body>
      </html>
    </>
  );
};

export default Layout;
