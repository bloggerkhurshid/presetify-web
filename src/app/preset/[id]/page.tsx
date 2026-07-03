import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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

const fetchRandomPresets = async (excludeId: string) => {
  try {
    const res = await fetch(`https://api.devkayy.in/api/list_wallpapers.php?sort=random&limit=8`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).filter((p: any) => p.id?.toString() !== excludeId);
  } catch (error) {
    return [];
  }
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const preset = await fetchPreset(resolvedParams.id);
  if (!preset) return { title: 'Not Found' };

  const title = preset.title || 'Lightroom Preset';
  const category = preset.category_name || 'Photography';

  return {
    title: `Download ${title} - Free Lightroom DNG Preset | .DNG`,
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Preset Not Found</h1>
        <Link href="/" className="text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white underline transition-colors">Return Home</Link>
      </div>
    );
  }

  const title = preset.title || 'Untitled Preset';
  const category = preset.category_name || 'Photography';

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-zinc-500 mb-10 transition-colors">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-black dark:hover:text-white transition-colors">Presets</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-zinc-300 font-medium transition-colors">{title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Preview */}
        <div className="w-full relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-zinc-900 shadow-2xl shadow-black/10 dark:shadow-white/5 transition-colors">
          {preset.thumbnail_path ? (
            <Image
              src={`https://api.devkayy.in/${preset.thumbnail_path}`}
              alt={`${title} - Free Lightroom Preset Preview`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
          )}
        </div>

        {/* Details & Download */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wider text-gray-400 dark:text-zinc-500 uppercase mb-2 transition-colors">
            {category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4 transition-colors">
            {title}
          </h1>
          <p className="text-sm text-gray-400 dark:text-zinc-500 mb-6 flex items-center gap-4 transition-colors">
            <span>✦ Free Download</span>
            <span>✦ DNG Format</span>
            <span>✦ Mobile &amp; Desktop</span>
          </p>

          <div className="prose prose-gray dark:prose-invert mb-8 text-gray-600 dark:text-zinc-400 leading-relaxed transition-colors">
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

          <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 border border-gray-200 dark:border-zinc-800 mb-6 transition-colors">
            <h2 className="font-bold text-gray-900 dark:text-white mb-3 text-base transition-colors">How to Install on Lightroom Mobile</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-zinc-400 space-y-2 transition-colors">
              <li>Tap the download button below to save the DNG file to your device.</li>
              <li>Open the <strong>Adobe Lightroom</strong> app on your phone.</li>
              <li>Import the DNG file from your camera roll or files app.</li>
              <li>Open the imported DNG, tap the three-dot menu (⋯), and select <strong>"Create Preset"</strong>.</li>
              <li>Save it and apply to any of your photos instantly!</li>
            </ol>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 border border-gray-200 dark:border-zinc-800 mb-8 transition-colors">
            <h2 className="font-bold text-gray-900 dark:text-white mb-3 text-base transition-colors">How to Install on Lightroom Classic (PC/Mac)</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-zinc-400 space-y-2 transition-colors">
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
              className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white px-8 py-4 text-lg font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download Free DNG Preset
            </a>
          ) : (
            <button disabled className="w-full bg-gray-200 dark:bg-zinc-800 px-8 py-4 text-lg font-medium text-gray-400 dark:text-zinc-600 cursor-not-allowed transition-colors">
              File Unavailable
            </button>
          )}
          <p className="text-xs text-gray-400 dark:text-zinc-500 text-center mt-3 transition-colors">Free for personal use. No sign-up required.</p>
        </div>
      </div>

      {/* Refined About & Why Section */}
      <section className="mt-16 border-t border-gray-100 dark:border-zinc-800 pt-12 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* About */}
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-zinc-500 uppercase mb-3 block transition-colors">About This Preset</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">The {title} Preset</h2>
            <p className="text-gray-500 dark:text-zinc-400 leading-relaxed mb-6 transition-colors">
              A free, handcrafted Lightroom DNG preset from .DNG's {category} collection.
              Designed to enhance mood, tone, and color grading with a single tap — without over-editing.
              Works beautifully across golden hour, indoor portraits, and street photography.
            </p>
            <div className="flex flex-wrap gap-2">
              {[category, 'Free', 'DNG Format', 'Mobile & Desktop', 'No Sign-up'].map(tag => (
                <span key={tag} className="text-xs font-semibold border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 px-3 py-1 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Why Use */}
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-zinc-500 uppercase mb-3 block transition-colors">Why Use Presets</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 transition-colors">Benefits at a Glance</h2>
            <ul className="space-y-3">
              {[
                { n: '01', label: 'Save Time', text: 'One tap applies a full editing style to any photo.' },
                { n: '02', label: 'Stay Consistent', text: 'Keep a cohesive look across your entire feed or portfolio.' },
                { n: '03', label: 'Learn Editing', text: 'See exactly how tone curves, HSL, and exposure are adjusted.' },
                { n: '04', label: 'Fully Flexible', text: 'Tweak any setting after applying — it\'s just a starting point.' },
              ].map(item => (
                <li key={item.n} className="flex items-start gap-3 border-b border-gray-50 dark:border-zinc-800/50 pb-3 last:border-0 transition-colors">
                  <span className="text-xs font-black text-gray-300 dark:text-zinc-600 w-6 pt-0.5 flex-shrink-0 transition-colors">{item.n}</span>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">{item.label} — </span>
                    <span className="text-gray-500 dark:text-zinc-400 text-sm transition-colors">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Recommended Presets */}
      <RecommendedSection currentId={resolvedParams.id} />
    </div>
  );
}

async function RecommendedSection({ currentId }: { currentId: string }) {
  const presets = await fetchRandomPresets(currentId);
  if (!presets.length) return null;

  return (
    <section className="border-t border-gray-100 dark:border-zinc-800 mt-12 transition-colors">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {presets.slice(0, 8).map((preset: any) => (
            <Link href={`/preset/${preset.id}`} key={preset.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-3 border border-gray-200/50 dark:border-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-black/5 dark:group-hover:shadow-white/5">
                {preset.thumbnail_path ? (
                  <Image
                    src={`https://api.devkayy.in/${preset.thumbnail_path}`}
                    alt={preset.title || 'Preset'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-600 transition-colors">No Image</div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white px-1 transition-colors">{preset.title || 'Untitled Preset'}</h3>
              <p className="text-xs text-gray-400 dark:text-zinc-500 px-1 transition-colors">{preset.category_name || 'Uncategorized'}</p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gray-950 dark:bg-zinc-900 text-white p-10 text-center transition-colors">
          <h2 className="text-2xl font-bold mb-2">Explore All Free Presets</h2>
          <p className="text-gray-400 dark:text-zinc-400 mb-6 max-w-lg mx-auto text-sm transition-colors">
            Browse our full collection of free Lightroom DNG presets for every mood, style, and genre.
          </p>
          <Link href="/" className="inline-flex items-center justify-center bg-white dark:bg-zinc-800 text-black dark:text-white px-8 py-3 font-semibold hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
            Browse All Presets &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
