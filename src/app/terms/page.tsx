import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | .DNG',
  description: 'Terms of Service for .DNG.',
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh]">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-gray max-w-none text-gray-600">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using Presetify, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. License & Usage</h2>
        <p className="mb-4">
          The presets provided on .DNG are for personal and commercial use in your own photography. You may not resell, redistribute, or package these presets as your own products.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Intellectual Property</h2>
        <p className="mb-4">
          All content, features, and functionality on .DNG (including but not limited to text, graphics, logos, and digital downloads) are owned by Presetify and are protected by international copyright and intellectual property laws.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall Presetify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the presets.
        </p>
      </div>
    </div>
  );
}
