import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Presetify',
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 max-w-7xl min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="text-8xl font-black text-gray-100 mb-0 leading-none">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-10 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
        >
          Browse Presets
        </Link>
        <Link
          href="/categories"
          className="border border-gray-200 text-gray-700 px-8 py-3 font-medium hover:bg-gray-50 transition-colors"
        >
          View Categories
        </Link>
      </div>
    </div>
  );
}
