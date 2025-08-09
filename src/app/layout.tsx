import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./font-styles.css";
import FontProvider from "@/components/FontProvider";
import StructuredData from "@/components/StructuredData";
import ScreenReaderAnnouncements from "@/components/ScreenReaderAnnouncements";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import DataFastProvider from "@/components/DataFastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wonderland Early Years & Prep School - We learn, We care, We play",
  description:
    "Welcome to Wonderland Early Years & Prep School. A nurturing environment where children learn, care, and play together. Discover our programs for early years education.",
  keywords:
    "kindergarten, early years, preschool, childcare, education, learning, play-based learning",
  metadataBase: new URL("https://wonderlandke.com"),
  openGraph: {
    title: "Wonderland Early Years & Prep School",
    description:
      "A nurturing environment where children learn, care, and play together. Programs from Playgroup to Grade 4.",
    url: "https://wonderlandke.com",
    siteName: "Wonderland Early Years & Prep School",
    images: [
      {
        url: "/wonderland-logo.png",
        width: 1200,
        height: 630,
        alt: "Wonderland Early Years & Prep School",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonderland Early Years & Prep School",
    description:
      "A nurturing environment where children learn, care, and play together. Programs from Playgroup to Grade 4.",
    images: ["/wonderland-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://wonderlandke.com",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize DataFast mock BEFORE the real DataFast script loads
              // This ensures window.datafast.push is always available
              (function() {
                // Store the original push method if DataFast was already initialized
                var originalPush = window.datafast && window.datafast.push;
                
                // Create our mock/wrapper
                window.datafast = window.datafast || [];
                
                // Always ensure push is a function
                if (typeof window.datafast.push !== 'function') {
                  window.datafast.push = function(event) {
                    // In development or when DataFast is disabled, just log
                    if (window.location.hostname === 'localhost' || window.location.protocol === 'file:') {
                      console.log('DataFast Event (Mock):', event);
                    } else if (originalPush && typeof originalPush === 'function') {
                      // If we had an original push method, use it
                      originalPush.call(window.datafast, event);
                    } else {
                      // Otherwise just log
                      console.log('DataFast Event (Fallback):', event);
                    }
                  };
                }
                
                // Monitor for changes to window.datafast and fix it if needed
                var checkInterval = setInterval(function() {
                  if (window.datafast && typeof window.datafast.push !== 'function') {
                    console.log('DataFast push method was removed, restoring mock...');
                    window.datafast.push = function(event) {
                      console.log('DataFast Event (Restored):', event);
                    };
                  }
                }, 100);
                
                // Stop checking after 5 seconds
                setTimeout(function() {
                  clearInterval(checkInterval);
                }, 5000);
              })();
              
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataFastProvider />
        <PerformanceMonitor />
        <FontProvider />
        <ScreenReaderAnnouncements />
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
