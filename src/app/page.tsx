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
      <section id="presets" className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Presets</h2>
              <p className="text-gray-500">Discover our newest additions.</p>
            </div>
          </div>
          
          <SearchFilters categories={categories} />

          {filteredPresets.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredPresets.map((preset: any) => (
                  <Link href={`/preset/${preset.id}`} key={preset.id} className="group flex flex-col">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-4 border border-gray-200/50 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-black/5">
                      {preset.thumbnail_path ? (
                        <Image
                          src={`https://api.devkayy.in/${preset.thumbnail_path}`}
                          alt={preset.title || "Preset"}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 px-1">{preset.title || "Untitled Preset"}</h3>
                    <p className="text-sm text-gray-500 px-1">{preset.category_name || "Uncategorized"}</p>
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
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
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
              <p className="text-gray-400 text-lg">No presets found matching your search.</p>
              <Link href="/" className="inline-block mt-4 text-black font-medium hover:underline">
                Clear Filters
              </Link>
            </div>
          )}
      </section>

      {/* Combined How It Works */}
      <section className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-20 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From browsing to applying — get a professional edit in minutes, right on your phone.</p>
          </div>

          {/* Top row — 3 general steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { step: "01", title: "Browse & Pick", desc: "Filter by category to find the exact mood and style you're after." },
              { step: "02", title: "Download Free DNG", desc: "Tap download to save the DNG preset file. No sign-up or account required." },
              { step: "03", title: "Apply in Lightroom", desc: "Import the DNG into Lightroom, create a preset from it, and apply to your photos." },
            ].map((item) => (
              <div key={item.step} className="border border-gray-100 p-6">
                <span className="text-4xl font-black text-gray-100 block mb-3">{item.step}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>


        </div>
      </section>
    </div>
  );
}
