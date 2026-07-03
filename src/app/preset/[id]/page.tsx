import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

const fetchPreset = async (id: string) => {
  try {
    const res = await fetch(`https://api.devkayy.in/api/get_wallpaper.php?id=${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json || null;
  } catch (error) {
    return null;
  }
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const preset = await fetchPreset(resolvedParams.id);
  if (!preset) return { title: 'Not Found' };

  const title = preset.title || 'Lightroom Preset';
  const category = preset.category_name || 'Photography';

  return {
    title: `Download ${title} - Free Lightroom DNG Preset | Presetify`,
    description: `Download the ${title} Lightroom preset for free. A professional ${category} DNG preset for Adobe Lightroom mobile & desktop. Achieve a stunning, cohesive look with one tap.`,
    keywords: [
      title,
      `${title} preset`,
      `${title} lightroom`,
      `${category} preset`,
      'free lightroom preset',
      'dng preset download',
      'lightroom mobile preset',
      'free photography preset',
      'presetify',
    ],
    openGraph: {
      title: `Download ${title} - Free Lightroom DNG Preset`,
      description: `Download the ${title} Lightroom preset for free. Perfect for ${category} photography.`,
      images: preset.thumbnail_path ? [`https://api.devkayy.in/${preset.thumbnail_path}`] : [],
      type: 'website',
    },
  };
}

export default async function PresetPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const preset = await fetchPreset(resolvedParams.id);

  if (!preset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Preset Not Found</h1>
        <Link href="/" className="text-gray-500 hover:text-black underline">Return Home</Link>
      </div>
    );
  }

  const title = preset.title || 'Untitled Preset';
  const category = preset.category_name || 'Photography';

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-black transition-colors">Presets</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Preview */}
        <div className="w-full relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-2xl shadow-black/10">
          {preset.thumbnail_path ? (
            <img
              src={`https://api.devkayy.in/${preset.thumbnail_path}`}
              alt={`${title} - Free Lightroom Preset Preview`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
          )}
        </div>

        {/* Details & Download */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-2">
            {category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-sm text-gray-400 mb-6 flex items-center gap-4">
            <span>✦ Free Download</span>
            <span>✦ DNG Format</span>
            <span>✦ Mobile &amp; Desktop</span>
          </p>

          <div className="prose prose-gray mb-8 text-gray-600 leading-relaxed">
            <p>
              The <strong>{title}</strong> is a premium, free Lightroom preset crafted for
              {' '}<strong>{category.toLowerCase()}</strong> photography. Whether you're editing on your phone
              or desktop, this DNG preset delivers a polished, professional look in just one tap.
              Perfect for Instagram, portfolios, and personal projects.
            </p>
            <p className="mt-3">
              This preset is compatible with <strong>Adobe Lightroom Mobile</strong> (iOS &amp; Android) and 
              <strong> Adobe Lightroom Classic</strong> on PC and Mac. No subscription required — 
              simply download, import, and apply.
            </p>
          </div>

          <div className="bg-gray-50 p-6 border border-gray-200 mb-6">
            <h2 className="font-bold text-gray-900 mb-3 text-base">How to Install on Lightroom Mobile</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              <li>Tap the download button below to save the DNG file to your device.</li>
              <li>Open the <strong>Adobe Lightroom</strong> app on your phone.</li>
              <li>Import the DNG file from your camera roll or files app.</li>
              <li>Open the imported DNG, tap the three-dot menu (⋯), and select <strong>"Create Preset"</strong>.</li>
              <li>Save it and apply to any of your photos instantly!</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-6 border border-gray-200 mb-8">
            <h2 className="font-bold text-gray-900 mb-3 text-base">How to Install on Lightroom Classic (PC/Mac)</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              <li>Download the DNG file to your computer.</li>
              <li>Open <strong>Adobe Lightroom Classic</strong> and go to the <strong>Develop</strong> module.</li>
              <li>In the Presets panel, click the <strong>"+"</strong> icon and choose <strong>"Import Presets"</strong>.</li>
              <li>Select the downloaded DNG file and click Import.</li>
              <li>The preset will now appear in your Presets panel, ready to use!</li>
            </ol>
          </div>

          {preset.image_path ? (
            <a
              href={`/api/download?file=${encodeURIComponent(preset.image_path)}&name=${encodeURIComponent(title)}`}
              className="w-full flex items-center justify-center gap-2 bg-black px-8 py-4 text-lg font-medium text-white hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download Free DNG Preset
            </a>
          ) : (
            <button disabled className="w-full bg-gray-200 px-8 py-4 text-lg font-medium text-gray-400 cursor-not-allowed">
              File Unavailable
            </button>
          )}
          <p className="text-xs text-gray-400 text-center mt-3">Free for personal use. No sign-up required.</p>
        </div>
      </div>

      {/* SEO Rich Content Block */}
      <section className="mt-20 border-t border-gray-100 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the {title} Preset</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The <strong>{title}</strong> preset is part of Presetify's curated collection of free Lightroom
              presets for {category.toLowerCase()} photography. Each preset is handcrafted to enhance the
              mood, tone, and color grading of your photos without over-editing.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This {category.toLowerCase()} preset is ideal for photographers looking for a consistent
              editing style that works across different lighting conditions — from golden hour shots to 
              indoor portraits and urban street photography.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Lightroom Presets?</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="font-bold text-black">01.</span>
                <span><strong>Save Time:</strong> Apply a consistent look to hundreds of photos in seconds, instead of editing each one manually.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-black">02.</span>
                <span><strong>Consistency:</strong> Maintain a professional, cohesive feed for your Instagram, blog, or portfolio.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-black">03.</span>
                <span><strong>Learn Editing:</strong> Studying how a preset adjusts exposure, tone curves, and HSL helps you understand photo editing.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-black">04.</span>
                <span><strong>Fully Adjustable:</strong> Every preset is a starting point — tweak the settings to perfectly match your photo's lighting.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 bg-gray-950 text-white p-12 text-center">
        <h2 className="text-3xl font-bold mb-3">Explore More Free Presets</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Browse our full collection of free Lightroom DNG presets for every mood, style, and genre of photography.
        </p>
        <Link href="/" className="inline-flex items-center justify-center bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors">
          Browse All Presets &rarr;
        </Link>
      </section>
    </div>
  );
}
