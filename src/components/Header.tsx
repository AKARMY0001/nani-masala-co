import React from 'react';
import { ShoppingBag, Search, ShieldCheck } from 'lucide-react';
import { LOGO_URL } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <>
      {/* TOP PROMO BANNER */}
      <header className="w-full bg-[#3D0713] text-[#FEF3C7] text-xs py-2 px-4 text-center font-medium border-b border-[#500C1B] flex flex-wrap justify-between items-center max-w-full">
        <div className="mx-auto flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <span className="flex items-center gap-1">🌶️ Free Delivery on Orders Above ₹499</span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Stone-Ground in Small Batches</span>
          <span className="opacity-40 hidden md:inline">|</span>
          <span className="text-amber-300 font-bold">Use Code: <span className="bg-amber-900/40 px-1.5 py-0.5 rounded border border-amber-500/40 font-mono tracking-wider">DADI15</span> for 15% OFF</span>
        </div>
        <div className="hidden lg:flex items-center gap-3 text-xs text-amber-200 pr-4">
          <span>📞 Helpline: +91 98765 43210</span>
        </div>
      </header>

      {/* MAIN NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-amber-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo Area */}
            <a href="#home" className="flex items-center gap-3 shrink-0 group">
              <img
                src={LOGO_URL}
                alt="Nani Masala Co. Logo"
                className="h-12 w-12 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-2xl font-serif-title font-bold text-[#6B1426] tracking-tight block leading-tight">
                  Nani Masala Co.
                </span>
                <span className="text-[11px] sm:text-xs text-[#D97706] font-semibold uppercase tracking-wider block">
                  A Little Tradition in Every Pinch
                </span>
              </div>
            </a>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-2.5 text-stone-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search pure haldi, biryani masala, garam masala..."
                  className="w-full bg-[#F7F2E7] pl-10 pr-4 py-2 rounded-full text-xs sm:text-sm border border-stone-200 focus:outline-none focus:border-[#6B1426] focus:ring-1 focus:ring-[#6B1426] text-stone-800 transition-all placeholder:text-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Nav Utilities (Cart, Admin, Currency) */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-900 border border-amber-200 font-semibold px-2.5 py-1 rounded">
                <span>INR (₹)</span>
              </span>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-stone-700 hover:text-[#6B1426] transition-colors rounded-lg hover:bg-stone-50 cursor-pointer"
                title="View Spice Cart"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-6 h-6 text-stone-800" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#6B1426] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin Portal Button */}
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#6B1426] text-amber-50 hover:bg-[#500C1B] px-3.5 py-2 rounded-lg shadow-xs transition-all cursor-pointer active:scale-95"
                title="Store Inventory & Admin Dashboard"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Category Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 py-2.5 border-t border-stone-100 text-xs font-semibold tracking-wide text-stone-700 overflow-x-auto">
            <a href="#home" className="text-[#6B1426] hover:text-[#500C1B] transition-colors whitespace-nowrap">Home</a>
            <a href="#catalog" className="hover:text-[#6B1426] transition-colors whitespace-nowrap">All 20 Spices (Shop)</a>
            <a href="#categories" className="hover:text-[#6B1426] transition-colors whitespace-nowrap">Categories</a>
            <a href="#recipes" className="hover:text-[#6B1426] transition-colors whitespace-nowrap">Grandma's Recipes</a>
            <a href="#story" className="hover:text-[#6B1426] transition-colors whitespace-nowrap">Why Stone Ground</a>
            <a href="#faq" className="hover:text-[#6B1426] transition-colors whitespace-nowrap">FAQs</a>
            <button
              onClick={onOpenCart}
              className="hover:text-[#6B1426] transition-colors whitespace-nowrap text-stone-700 font-semibold cursor-pointer"
            >
              Direct Checkout
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-2.5 text-stone-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search pure spices, biryani masala..."
                className="w-full bg-[#F7F2E7] pl-10 pr-4 py-2 rounded-full text-xs border border-stone-200 focus:outline-none focus:border-[#6B1426] text-stone-800"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
