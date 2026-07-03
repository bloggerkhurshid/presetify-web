import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Presetify',
  description: 'Get in touch with Presetify.',
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8">
        Have a question about our presets? Need help installing them? We're here to help.
      </p>
      
      <div className="bg-gray-50 p-8 border border-gray-100 w-full">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Email Us</h2>
        <p className="text-gray-500 mb-6">We typically respond within 24-48 hours.</p>
        <a 
          href="mailto:hello@khurshidalom.in"
          className="inline-flex items-center justify-center bg-black px-8 py-4 text-base font-medium text-white hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
        >
          hello@khurshidalom.in
        </a>
      </div>
    </div>
  );
}
