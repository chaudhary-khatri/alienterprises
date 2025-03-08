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
          {/* Favicon */}
          <link rel="icon" href="/favicon_io/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon_io/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon_io/favicon-16x16.png"
          />
          <link rel="apple-touch-icon" href="/favicon_io/apple-touch-icon.png" />
          <meta name="theme-color" content="#ffffff" />
          
          {/* Site Title */}
          <title>Ali Enterprises</title>
          
          {/* Global Meta Tags for SEO */}
          <meta
            name="description"
            content="Ali Enterprises offers top-quality machinery and industrial solutions for your business needs."
          />
          
          {/* Open Graph Meta Tags for Social Sharing */}
          <meta property="og:title" content="Ali Enterprises" />
          <meta
            property="og:description"
            content="Ali Enterprises offers top-quality machinery and industrial solutions for your business needs."
          />
          <meta property="og:image" content="https://alienterprises.in/path-to-your-og-image.jpg" />
          <meta property="og:url" content="https://alienterprises.in" />
          <meta property="og:type" content="website" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Ali Enterprises" />
          <meta
            name="twitter:description"
            content="Ali Enterprises offers top-quality machinery and industrial solutions for your business needs."
          />
          <meta name="twitter:image" content="https://alienterprises.in/path-to-your-og-image.jpg" />
        </Head>
        <body className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="pt-10">{isClient ? children : null}</main>
          <Footer />
        </body>
      </html>
    </>
  );
};

export default Layout;
