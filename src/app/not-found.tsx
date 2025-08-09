import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="text-center px-4 py-16 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary animate-float">404</h1>
          <p className="text-4xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</p>
        </div>
        
        <div className="mb-8">
          <p className="text-xl text-gray-600 mb-4">
            It looks like you&apos;ve wandered off the playground!
          </p>
          <p className="text-lg text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-semibold"
          >
            Go Back Home
          </Link>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-colors font-semibold"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 text-6xl animate-wiggle">
          🎈
        </div>
      </div>
    </div>
  );
}