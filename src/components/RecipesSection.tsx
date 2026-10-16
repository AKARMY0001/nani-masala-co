import React from 'react';
import { Clock, Users, Flame, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface RecipesSectionProps {
  onAddBundle: (bundle: Omit<CartItem, 'qty'>) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({ onAddBundle }) => {
  const recipes = [
    {
      title: 'Royal Awadhi Dum Biryani',
      time: '40 mins prep',
      badge: 'Serves 4',
      badgeIcon: Users,
      desc: "Long-grain aged basmati rice simmered on dum with caramelized onions, kewra water, and Nani's Special Biryani Masala.",
      spices: '• Biryani Masala (2 tbsp) • Shahi Jeera (1 tsp) • Black Cardamom',
      bundleName: 'Awadhi Biryani 3-Spice Kit',
      price: 340,
    },
    {
      title: "Dadi's Golden Haldi Doodh",
      time: '10 mins prep',
      badge: 'Immunity Boost',
      badgeIcon: Flame,
      desc: 'Traditional bedtime golden latte. High-curcumin Salem turmeric paired with Tellicherry pepper for 2,000% higher bio-absorption.',
      spices: '• Salem Haldi (1 tsp) • Black Pepper (pinch) • Dry Ginger Sonth',
      bundleName: 'Golden Latte Immunity 3-Spice Kit',
      price: 280,
    },
    {
      title: 'Homestyle Amritsari Chole',
      time: '35 mins prep',
      badge: 'Sunday Feast',
      badgeIcon: Flame,
      desc: 'Tangy, dark, and spicy chickpeas stewed with wild anardana seeds, roasted kasuri methi, and slow-stone-pounded Chole Masala.',
      spices: '• Chole Masala • Kashmiri Chilli • Whole Cumin Jeera',
      bundleName: 'Amritsari Chole 3-Spice Kit',
      price: 310,
    },
  ];

  return (
    <section id="recipes" className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              HEIRLOOM RECIPES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#6B1426] mt-1">
              Cook with Grandma's Authentic Touch
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Exact spice pairings passed down through three generations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((r, i) => {
            const BadgeIcon = r.badgeIcon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center text-xs text-amber-900 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{r.time}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <BadgeIcon className="w-3.5 h-3.5 text-amber-700" />
                      <span>{r.badge}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-serif-title font-bold text-[#6B1426]">
                    {r.title}
                  </h3>
                  
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {r.desc}
                  </p>

                  <div className="mt-4 bg-[#F7F2E7] p-3 rounded-lg text-xs space-y-1 border border-stone-200/50">
                    <span className="font-bold text-stone-800 block">Required Spices:</span>
                    <p className="text-stone-600 leading-relaxed font-mono text-[11px]">{r.spices}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      onAddBundle({
                        id: 9000 + i,
                        name: r.bundleName,
                        price: r.price,
                        weight: 'Curated 3-Pack',
                        cat: 'Heritage Blends',
                      })
                    }
                    className="w-full bg-[#6B1426] hover:bg-[#500C1B] text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-200" />
                    <span>Add 3-Spice Recipe Bundle (₹{r.price})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
