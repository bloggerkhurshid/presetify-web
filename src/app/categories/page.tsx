import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Categories | .DNG',
  description: 'Browse preset categories on .DNG.',
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

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh]">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Categories</h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Browse our curated collection of presets organized by mood and style. Find the perfect look for your photos.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category: any) => (
            <Link 
              href={`/?category=${category.id}`} 
              key={category.id} 
              className="group relative overflow-hidden aspect-square bg-gray-100 shadow-sm border border-gray-200/50 hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
            >
              {category.image ? (
                <img
                  src={`https://api.devkayy.in/${category.image}`}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  No Image
                </div>
              )}
              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-1 group-hover:-translate-y-1 transition-transform duration-300">
                  {category.name}
                </h2>
                <div className="h-0 overflow-hidden group-hover:h-5 transition-all duration-300">
                  <span className="text-sm font-medium text-white/80">Explore presets &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-400 text-lg">No categories available at the moment.</p>
        </div>
      )}
    </div>
  );
}
