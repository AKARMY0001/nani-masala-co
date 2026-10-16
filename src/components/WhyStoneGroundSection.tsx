import React from 'react';
import { Wind, Handshake, ShieldCheck, Truck } from 'lucide-react';

export const WhyStoneGroundSection: React.FC = () => {
  const cards = [
    {
      title: 'Granite Stone Ground',
      desc: 'Slow crushing at room temperature retains 98% of natural volatile essential oils, retaining vivid color and robust fragrance.',
      icon: Wind,
    },
    {
      title: 'Direct Estate Sourcing',
      desc: 'Single-origin crops handpicked directly from multi-generational farming cooperatives in Guntur, Wayanad, and Salem at ethical fair prices.',
      icon: Handshake,
    },
    {
      title: '14-Point Lab Certified',
      desc: 'Every batch undergoes stringent GC-MS testing for curcumin levels, zero synthetic colors, zero Sudan red dye, and negligible moisture.',
      icon: ShieldCheck,
    },
    {
      title: '7-Day Fresh Milling',
      desc: 'Unlike commercial supermarket spices that sit in warehouses for over a year, Nani Masala packs are freshly milled within days of dispatch.',
      icon: Truck,
    },
  ];

  return (
    <section id="story" className="py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
            ANCESTRAL METHOD
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#6B1426] mt-1">
            Why Modern Families Trust Nani's Stone Mortar
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Industrial high-speed steel hammer mills generate temperatures exceeding 65°C, burning off the delicate aromatic oils and essential curative curcumin. Nani Masala Co. preserves the centuries-old traditional slow-pounding ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#F7F2E7] border border-stone-200 hover:border-amber-300 transition-colors shadow-2xs hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-[#6B1426] text-amber-200 flex items-center justify-center mb-4 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-2">{c.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
