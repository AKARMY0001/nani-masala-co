import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, ArrowUpDown } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onViewProduct: (p: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onBuyNow,
  onViewProduct,
}) => {
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  const filterTabs = [
    { label: 'All 20 Spices', value: 'All' },
    { label: 'Pure Ground', value: 'Pure Ground' },
    { label: 'Blends', value: 'Heritage Blends' },
    { label: 'Whole', value: 'Whole Spices' },
    { label: 'Regional', value: 'Regional' },
    { label: 'Combos', value: 'Combos' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.cat === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q) ||
          (p.ingredients && p.ingredients.some((ing) => ing.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              AUTHENTIC CATALOGUE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#6B1426] mt-1">
              Direct from Our Stone Mortar
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              20 handcrafted staples with verified batch testing and real-time inventory.
            </p>
          </div>

          {/* Controls: Filter Pills & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {filterTabs.map((tab) => {
                const isActive = activeCategory === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => onSelectCategory(tab.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#6B1426] text-white font-bold shadow-xs'
                        : 'bg-white text-stone-700 font-semibold border border-stone-300 hover:border-[#6B1426] hover:text-[#6B1426]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Sort Selector */}
            <div className="relative inline-flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 text-stone-700 text-xs rounded-full pl-7 pr-3 py-1.5 focus:outline-none focus:border-[#6B1426] cursor-pointer appearance-none"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search status notification if active */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-xs text-amber-900">
            <span>
              Showing results for <strong>"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={() => onSelectCategory('All')}
              className="text-[#6B1426] font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No spices matched your search</h3>
            <p className="text-xs text-stone-500 mt-1">Try searching for haldi, garam masala, biryani, or jeera.</p>
            <button
              onClick={() => {
                onSelectCategory('All');
              }}
              className="mt-4 bg-[#6B1426] text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              View All 20 Spices
            </button>
          </div>
        ) : (
          /* Live Dynamic Product Grid (20 Products) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const discountPercent = Math.round(((p.mrp - p.price) / p.mrp) * 100);
              const reviews = p.reviewsCount || Math.floor(p.price * 2.8);

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-amber-300"
                >
                  <div>
                    {/* Header: Category Pill & Star Rating */}
                    <div className="p-3 bg-[#F7F2E7] flex justify-between items-center text-[11px] border-b border-stone-100">
                      <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                        {p.cat}
                      </span>
                      <span className="text-stone-600 font-medium flex items-center gap-1">
                        <span className="text-amber-500 font-bold">★ {p.rating}</span>
                        <span className="text-stone-400">({reviews})</span>
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-1">
                        <h3
                          onClick={() => onViewProduct(p)}
                          className="font-serif-title font-bold text-stone-900 text-base leading-snug group-hover:text-[#6B1426] transition-colors cursor-pointer"
                        >
                          {p.name}
                        </h3>
                        <button
                          onClick={() => onViewProduct(p)}
                          className="p-1 text-stone-400 hover:text-[#6B1426] rounded shrink-0"
                          title="Quick view spice notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {p.desc}
                      </p>

                      {/* Weight and Stock Row */}
                      <div className="flex items-center gap-2 pt-2 text-xs">
                        <span className="text-stone-500 text-[11px]">Weight:</span>
                        <span className="font-bold text-[#6B1426] bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                          {p.weight}
                        </span>
                        <span className="text-[11px] text-emerald-700 ml-auto font-medium">
                          Stock: {p.stock}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-lg font-bold text-[#6B1426]">₹{p.price}</span>
                        <span className="text-xs text-stone-400 line-through">₹{p.mrp}</span>
                        <span className="text-[11px] text-emerald-700 font-bold">
                          {discountPercent}% Off
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Add to Cart and Buy Now buttons */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="bg-[#F7F2E7] hover:bg-amber-100/70 text-[#6B1426] text-xs font-bold py-2 rounded-lg border border-amber-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => onBuyNow(p)}
                      className="bg-[#6B1426] hover:bg-[#500C1B] text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-2xs cursor-pointer active:scale-95 text-center"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
