'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center px-4 py-16 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-500 animate-float">500</h1>
          <p className="text-4xl font-semibold text-gray-800 mt-4">Something Went Wrong!</p>
        </div>
        
        <div className="mb-8">
          <p className="text-xl text-gray-600 mb-4">
            We're sorry, but something unexpected happened.
          </p>
          <p className="text-lg text-gray-500">
            Our team has been notified and we're working to fix this issue.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-semibold"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-colors font-semibold"
          >
            Go Home
          </Link>
        </div>

        <div className="mt-12 text-6xl">
          🔧
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-red-100 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800">
              <strong>Error Details (Development Only):</strong>
              <br />
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}