import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | .DNG',
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 max-w-7xl min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="text-8xl font-black text-gray-100 dark:text-zinc-900 mb-0 leading-none transition-colors">404</p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3 transition-colors">Page Not Found</h1>
      <p className="text-gray-500 dark:text-zinc-400 mb-10 max-w-sm transition-colors">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Browse Presets
        </Link>
      </div>
    </div>
  );
}
