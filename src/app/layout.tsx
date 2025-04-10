"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Navbar from "@/components/Navbar"; // Adjust the path if needed
import Footer from "@/components/Footer"; // Adjust the path if needed
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the GA measurement ID from the environment variable
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      <html lang="en">
        <Head>
          {/* Basic Meta Tags */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://alienterprises.in" />

          {/* Sitemap Link */}
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

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
          <meta
            property="og:image"
            content="https://alienterprises.in/path-to-your-og-image.jpg"
          />
          <meta property="og:url" content="https://alienterprises.in" />
          <meta property="og:type" content="website" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Ali Enterprises" />
          <meta
            name="twitter:description"
            content="Ali Enterprises offers top-quality machinery and industrial solutions for your business needs."
          />
          <meta
            name="twitter:image"
            content="https://alienterprises.in/path-to-your-og-image.jpg"
          />

          {/* Structured Data for Organization (JSON-LD) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Ali Enterprises",
                "url": "https://alienterprises.in",
                "logo": "https://alienterprises.in/path-to-your-logo.png",
                "sameAs": [] // Add your social media profile URLs here if applicable
              }),
            }}
          />
        </Head>

        <body className="min-h-screen bg-background text-foreground">
          {/* Navbar */}
          <Navbar />

          {/* Google Analytics Setup using Next.js Script Component */}
          {measurementId && (
            <>
              {/* Load GA Script */}
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
              />
              {/* Initialize GA */}
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${measurementId}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
            </>
          )}

          <main className="pt-10">{isClient ? children : null}</main>
          <Footer />
          <Analytics /> {/* Vercel Analytics for tracking traffic */}
        </body>
      </html>
    </>
  );
};

export default Layout;
