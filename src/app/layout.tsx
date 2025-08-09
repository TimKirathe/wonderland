import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./font-styles.css";
import FontProvider from "@/components/FontProvider";
import StructuredData from "@/components/StructuredData";

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
  description: "Welcome to Wonderland Early Years & Prep School. A nurturing environment where children learn, care, and play together. Discover our programs for early years education.",
  keywords: "kindergarten, early years, preschool, childcare, education, learning, play-based learning",
  metadataBase: new URL('https://wonderlandke.com'),
  openGraph: {
    title: "Wonderland Early Years & Prep School",
    description: "A nurturing environment where children learn, care, and play together. Programs from Playgroup to Grade 4.",
    url: 'https://wonderlandke.com',
    siteName: 'Wonderland Early Years & Prep School',
    images: [
      {
        url: '/wonderland-logo.png',
        width: 1200,
        height: 630,
        alt: 'Wonderland Early Years & Prep School',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wonderland Early Years & Prep School",
    description: "A nurturing environment where children learn, care, and play together. Programs from Playgroup to Grade 4.",
    images: ['/wonderland-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wonderlandke.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: '/manifest.json',
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FontProvider />
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
