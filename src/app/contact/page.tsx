import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | .DNG',
  description: 'Get in touch with .DNG.',
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 transition-colors">Contact Us</h1>
      <p className="text-lg text-gray-600 dark:text-zinc-400 mb-8 transition-colors">
        Have a question about our presets? Need help installing them? We're here to help.
      </p>
      
      <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 border border-gray-100 dark:border-zinc-800 w-full transition-colors">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors">Email Us</h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-6 transition-colors">We typically respond within 24-48 hours.</p>
        <a 
          href="mailto:hello@khurshidalom.in"
          className="inline-flex items-center justify-center bg-black dark:bg-white px-8 py-4 text-base font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/5"
        >
          hello@khurshidalom.in
        </a>
      </div>
    </div>
  );
}
