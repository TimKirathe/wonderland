'use client';

import Script from 'next/script';

export default function DataFastProvider() {
  // Only load the actual DataFast script if we have a website ID
  // The mock is handled by /datafast-mock.js which loads before this
  if (!process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID) {
    return null;
  }

  return (
    <Script
      data-website-id={process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID}
      data-domain={process.env.NEXT_PUBLIC_DATAFAST_DOMAIN}
      src="/df/script.js"
      strategy="afterInteractive"
    />
  );
}