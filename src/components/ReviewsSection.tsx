import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      quote:
        'The moment you open the jar of Shahi Garam Masala, the entire kitchen smells of pure cardamom and mace. No commercial brand even comes close. Truly reminds me of my grandmother’s cooking in Lucknow.',
      author: 'Dr. Sunita Sharma',
      location: 'Bengaluru • Ordered Garam Masala & Haldi',
      rating: 5,
    },
    {
      quote:
        'The Salem Haldi has that deep vibrant yellow color and leaves zero artificial yellow food dye stain on your fingers. The natural curcumin oil concentration is visibly authentic. Excellent packaging too!',
      author: 'Rajesh Kulkarni',
      location: 'Pune • Monthly Organic Subscriber',
      rating: 5,
    },
    {
      quote:
        'The Guntur Teja chilli powder actually has that sharp punch without burning your stomach, because there are no fake red colors added. Authentic and pure. Prompt delivery within 3 days.',
      author: 'Ananya Sen',
      location: 'Kolkata • Panch Phoron & Teja Chilli',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
            VERIFIED BUYERS ONLY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#6B1426] mt-1">
            Stories from Indian Households
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-amber-500 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-stone-600 font-medium ml-1">
              4.92 / 5 Average Rating (14,000+ Reviews)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-[#FDFBF7] p-6 rounded-xl border border-stone-200 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200">
                <p className="text-xs font-bold text-stone-900">{r.author}</p>
                <p className="text-[11px] text-stone-500">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
