"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl relative">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">.DNG <span className="text-xs font-bold text-gray-400">by Khurshid</span></span>
        </Link>
      </div>
    </header>
  );
}
