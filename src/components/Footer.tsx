import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-xl tracking-tight text-black dark:text-white transition-colors">.DNG <span className="text-xs font-bold text-gray-400 dark:text-zinc-500">by Khurshid</span></span>
            <p className="text-sm text-gray-500 dark:text-zinc-400 transition-colors">Premium presets for your photography.</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-black dark:hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-50 dark:border-zinc-800/50 flex flex-col items-center justify-center transition-colors">
          <p className="text-xs text-gray-400 dark:text-zinc-500 transition-colors">
            &copy; {new Date().getFullYear()} .DNG by Khurshid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
