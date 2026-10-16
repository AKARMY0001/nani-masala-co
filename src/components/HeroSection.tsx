import React from 'react';
import {
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Users,
  Plus
} from 'lucide-react';
import { LOGO_URL } from '../data/products';
import { Product } from '../types';

interface HeroSectionProps {
  onQuickAdd: (product: Product) => void;
  featuredProduct: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onQuickAdd,
  featuredProduct,
}) => {
  return (
    <section id="home" className="relative bg-[#500C1B] bg-pattern text-white py-14 lg:py-20 px-4 overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Hero Copy */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#3D0713]/90 border border-amber-500/40 px-3 py-1 rounded-full text-xs text-amber-200">
            <Award className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Slow Stone-Pounded In Small Batches • Since 1958</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold leading-tight tracking-tight text-[#FDFBF7]">
            Authentic Stone-Ground Spices, Crafted with Grandma's Secret Recipes.
          </h1>
          
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Handpicked from heritage organic plantations in Wayanad, Guntur, and Salem. Cold-milled using heavy granite stone grinders so vital essential oils never evaporate. Zero fillers, MSG, or artificial food dyes.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#catalog"
              className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Shop All 20 Spices (From ₹65)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="#recipes"
              className="bg-white/10 hover:bg-white/20 text-[#FDFBF7] font-semibold text-sm px-5 py-3 rounded-lg backdrop-blur-sm border border-white/20 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Grandma's Recipes</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-maroon-800/60">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-[#D97706] shrink-0" />
              <div>
                <p className="text-xs font-bold leading-tight text-white">100% Pure</p>
                <p className="text-[11px] text-stone-300">Lab Certified</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-[#D97706] shrink-0" />
              <div>
                <p className="text-xs font-bold leading-tight text-white">Stone Ground</p>
                <p className="text-[11px] text-stone-300">Preserved Aromas</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-[#D97706] shrink-0" />
              <div>
                <p className="text-xs font-bold leading-tight text-white">FSSAI Certified</p>
                <p className="text-[11px] text-stone-300">Reg #10021051000123</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-6 h-6 text-[#D97706] shrink-0" />
              <div>
                <p className="text-xs font-bold leading-tight text-white">45,000+</p>
                <p className="text-[11px] text-stone-300">Family Kitchens</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Card: Today's Fresh Batch */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white p-6 rounded-2xl shadow-2xl text-stone-900 border-2 border-amber-400/50 relative overflow-hidden transition-all duration-300 hover:shadow-amber-900/30">
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-100/60 rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-start mb-3 relative z-10">
              <span className="bg-[#6B1426] text-white text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-xs">
                TODAY'S FRESH BATCH
              </span>
              <span className="text-emerald-700 text-xs font-bold flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Milled 48h Ago</span>
              </span>
            </div>
            
            <div className="my-4 text-center">
              <img
                src={LOGO_URL}
                alt="Nani Masala Co. emblem"
                className="w-32 h-32 mx-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
            </div>

            <h3 className="text-lg font-serif-title font-bold text-[#6B1426] text-center">
              {featuredProduct.name}
            </h3>
            <p className="text-xs text-stone-600 text-center mt-1 max-w-sm mx-auto">
              {featuredProduct.desc}
            </p>
            
            <div className="bg-[#F7F2E7] p-3.5 rounded-xl mt-4 flex items-center justify-between border border-stone-200/60">
              <div>
                <span className="text-[11px] text-stone-500 block">Trial Pack ({featuredProduct.weight})</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[#6B1426]">₹{featuredProduct.price}</span>
                  <span className="text-xs text-stone-400 line-through">₹{featuredProduct.mrp}</span>
                  <span className="text-xs text-emerald-700 font-bold">
                    Save {Math.round(((featuredProduct.mrp - featuredProduct.price) / featuredProduct.mrp) * 100)}%
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => onQuickAdd(featuredProduct)}
                className="bg-[#6B1426] hover:bg-[#500C1B] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4 text-amber-200" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
