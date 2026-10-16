import React from 'react';
import { Wheat, Soup, Sparkles, Utensils, Gift } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  const categories = [
    {
      id: 'Pure Ground',
      title: 'Pure Ground',
      sub: 'Haldi, Mirch, Dhania',
      icon: Wheat,
      bg: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'Heritage Blends',
      title: 'Heritage Blends',
      sub: 'Garam, Biryani, Chole',
      icon: Soup,
      bg: 'bg-rose-100 text-rose-900',
    },
    {
      id: 'Whole Spices',
      title: 'Whole Spices',
      sub: 'Jeera, Pepper, Cardamom',
      icon: Sparkles,
      bg: 'bg-emerald-100 text-emerald-900',
    },
    {
      id: 'Regional',
      title: 'Regional Secrets',
      sub: 'Panch Phoron, Sambhar',
      icon: Utensils,
      bg: 'bg-orange-100 text-orange-900',
    },
    {
      id: 'Combos',
      title: 'Organic Combos',
      sub: 'Value Spice Chests',
      icon: Gift,
      bg: 'bg-yellow-100 text-yellow-900',
    },
  ];

  return (
    <section id="categories" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
            GENERATIONAL VARIETY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#6B1426] mt-1">
            Shop by Spice Tradition
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCategory(c.id);
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group p-4 rounded-xl border transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/80 border-[#6B1426] ring-2 ring-[#6B1426]/20 shadow-md'
                    : 'bg-[#F7F2E7] hover:bg-amber-50/50 border-stone-200 hover:border-amber-300 shadow-2xs hover:shadow-sm'
                }`}
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-full ${c.bg} flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-stone-900 group-hover:text-[#6B1426] transition-colors">
                  {c.title}
                </h3>
                <span className="text-[11px] text-stone-500 block mt-0.5">
                  {c.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
