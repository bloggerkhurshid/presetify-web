import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-xl tracking-tight">.DNG <span className="text-xs font-bold text-gray-400">by Khurshid</span></span>
            <p className="text-sm text-gray-500">Premium presets for your photography.</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-black transition-colors">Disclaimer</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} .DNG by Khurshid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
