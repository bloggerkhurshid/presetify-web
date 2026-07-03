import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | .DNG',
  description: 'Privacy Policy for .DNG.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh]">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none text-gray-600">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          Presetify operates as a digital download platform. We do not require account creation to download free presets. We only collect standard analytics data (such as IP addresses, browser types, and usage patterns) to improve our service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          Any information collected is used solely to provide, maintain, and improve our services, as well as to monitor the usage of our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Third-Party Services</h2>
        <p className="mb-4">
          We may use third-party services for analytics or advertising (e.g., Google Analytics, AdMob). These third parties have their own privacy policies addressing how they use such information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us via our Contact page.
        </p>
      </div>
    </div>
  );
}
