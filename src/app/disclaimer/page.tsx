import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | .DNG',
  description: 'Disclaimer for .DNG.',
};

export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh]">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Disclaimer</h1>
      <div className="prose prose-gray max-w-none text-gray-600">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. General Information</h2>
        <p className="mb-4">
          The information and digital products provided by Presetify are for general informational and creative purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or product on the Site.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Product Results</h2>
        <p className="mb-4">
          Lightroom presets behave differently on every photo depending on lighting, colors, camera settings, and environment. We do not guarantee that your photos will look exactly like the preview images. Minor adjustments to exposure and white balance are usually required after applying a preset.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. External Links</h2>
        <p className="mb-4">
          The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
        </p>
      </div>
    </div>
  );
}
