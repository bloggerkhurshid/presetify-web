import Link from "next/link";
import Image from "next/image";
import SearchFilters from "@/components/SearchFilters";

const fetchPresets = async (page: number, q: string, categoryId: string) => {
  try {
    const url = new URL('https://api.devkayy.in/api/list_wallpapers.php');
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', '20');
    if (q) url.searchParams.set('search', q);
    if (categoryId) url.searchParams.set('category_id', categoryId);
    
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) return { data: [], pagination: null };
    const json = await res.json();
    return { data: json.data || [], pagination: json.pagination || null };
  } catch (error) {
    console.error(error);
    return { data: [], pagination: null };
  }
};

const fetchCategories = async () => {
  try {
    const res = await fetch('https://api.devkayy.in/api/get_categories.php', { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
};

import type { Metadata } from 'next';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const categoryName = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
  
  if (categoryName) {
    // Decode if needed, but usually it's fine. Capitalize first letter.
    const cleanName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    return {
      title: `${cleanName} Lightroom Presets | .DNG by Khurshid`,
      description: `Download free, premium ${cleanName} Lightroom DNG presets by Khurshid. Elevate your photography with perfectly tuned ${cleanName} presets.`,
    };
  }

  return {
    title: ".DNG | Free Lightroom Presets by Khurshid",
    description: "Download free, premium Lightroom DNG presets by Khurshid. Professional photography presets for mobile and desktop.",
  };
}

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q.toLowerCase() : '';
  const categoryName = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
  const pageStr = typeof resolvedParams.page === 'string' ? resolvedParams.page : '1';
  const page = parseInt(pageStr, 10) || 1;

  const categories = await fetchCategories();
  
  let categoryId = '';
  if (categoryName) {
    const found = categories.find((c: any) => c.name.toLowerCase() === categoryName.toLowerCase());
    if (found) {
      categoryId = found.id.toString();
    }
  }

  const presetsResponse = await fetchPresets(page, q, categoryId);

  const filteredPresets = presetsResponse.data;
  const pagination = presetsResponse.pagination;

  return (
    <div className="flex flex-col min-h-screen">


      {/* Presets Grid */}
      <section id="presets" className="container mx-auto px-4 pt-6 pb-16 max-w-7xl min-h-[80vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-black dark:text-white transition-colors">Latest Presets</h2>
              <p className="text-gray-500 dark:text-zinc-400 transition-colors">Discover our newest additions.</p>
            </div>
          </div>
          
          <SearchFilters categories={categories} />

          {filteredPresets.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredPresets.map((preset: any) => (
                  <Link href={`/preset/${preset.id}`} key={preset.id} className="group flex flex-col">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-4 border border-gray-200/50 dark:border-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-black/5 dark:group-hover:shadow-white/5">
                      {preset.thumbnail_path ? (
                        <Image
                          src={`https://api.devkayy.in/${preset.thumbnail_path}`}
                          alt={preset.title || "Preset"}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-600 transition-colors">No Image</div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white px-1 transition-colors">{preset.title || "Untitled Preset"}</h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 px-1 transition-colors">{preset.category_name || "Uncategorized"}</p>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.total_pages > 1 && (
                <div className="flex justify-center items-center mt-16 gap-2">
                  {Array.from({ length: pagination.total_pages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = pageNum === page;
                    
                    const params = new URLSearchParams();
                    if (q) params.set('q', q);
                    if (categoryName) params.set('category', categoryName);
                    params.set('page', pageNum.toString());

                    return (
                      <Link
                        key={pageNum}
                        href={`/?${params.toString()}`}
                        className={`w-10 h-10 flex items-center justify-center border font-medium transition-colors ${
                          isCurrent
                            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-[#0a0a0a] dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-900'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-400 dark:text-zinc-500 text-lg transition-colors">No presets found matching your search.</p>
              <Link href="/" className="inline-block mt-4 text-black dark:text-white font-medium hover:underline transition-colors">
                Clear Filters
              </Link>
            </div>
          )}
      </section>

      {/* Combined How It Works */}
      <section className="border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="container mx-auto px-4 py-20 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 transition-colors">How It Works</h2>
            <p className="text-gray-500 dark:text-zinc-400 max-w-xl mx-auto transition-colors">From browsing to applying — get a professional edit in minutes, right on your phone.</p>
          </div>

          {/* Top row — 3 general steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { step: "01", title: "Browse & Pick", desc: "Filter by category to find the exact mood and style you're after." },
              { step: "02", title: "Download Free DNG", desc: "Tap download to save the DNG preset file. No sign-up or account required." },
              { step: "03", title: "Apply in Lightroom", desc: "Import the DNG into Lightroom, create a preset from it, and apply to your photos." },
            ].map((item) => (
              <div key={item.step} className="border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 transition-colors duration-300">
                <span className="text-4xl font-black text-gray-100 dark:text-zinc-800 block mb-3 transition-colors">{item.step}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors">{item.title}</h3>
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>


        </div>
      </section>
    </div>
  );
}
