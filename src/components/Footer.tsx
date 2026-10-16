import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#2A1713] text-stone-300 pt-16 pb-8 border-t border-stone-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Story Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif-title font-bold text-[#FDFBF7]">
                Nani Masala Co.
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Bringing generational warmth, sun-dried purity, and heirloom aromatic perfection straight from regional spice plantations to your modern family kitchen.
            </p>
            <div className="text-xs text-amber-300/80 pt-1">
              <span className="font-bold text-amber-200">FSSAI Reg No:</span> 10021051000123 (Demo verified)
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Pure Ground Spices</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Heritage Blends</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Whole Seeds &amp; Berries</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Organic Gift Combos</a></li>
              <li><a href="#recipes" className="hover:text-amber-200 transition-colors">Grandma's Recipes</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#faq" className="hover:text-amber-200 transition-colors">Track Order</a></li>
              <li><a href="#faq" className="hover:text-amber-200 transition-colors">Shipping Policy (India)</a></li>
              <li><a href="#faq" className="hover:text-amber-200 transition-colors">Returns &amp; Refunds</a></li>
              <li><a href="#story" className="hover:text-amber-200 transition-colors">Lab Test Reports</a></li>
              <li><a href="#faq" className="hover:text-amber-200 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              Grandma's Spice Circle
            </h4>
            <p className="text-xs text-stone-400 mb-2">
              Receive secret heritage recipes and early harvest announcements.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-1.5">
              <div className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-stone-800 text-xs px-3 py-2 rounded-l text-stone-200 border-0 focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#D97706] hover:bg-[#B45309] text-white px-3.5 py-2 text-xs font-bold rounded-r transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-emerald-400 block font-medium">
                  ✓ Welcome to the family circle! Check your inbox soon.
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Legal Compliance & Payment Methods */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 pb-6 text-xs text-stone-400 border-t border-stone-800">
          <div className="flex flex-wrap gap-4">
            <span>Legal:</span>
            <a href="#faq" className="hover:text-amber-200 transition-colors">Privacy Policy</a>
            <a href="#faq" className="hover:text-amber-200 transition-colors">Terms of Service</a>
            <a href="#faq" className="hover:text-amber-200 transition-colors">Refund Policy</a>
          </div>
          <div className="flex items-center gap-2">
            <span>Secured by:</span>
            <span className="font-semibold text-stone-200">
              Razorpay | UPI | RuPay | Visa | Mastercard | COD
            </span>
          </div>
        </div>

        {/* BOTTOM BAR WITH CRITICAL DEVELOPER CREDIT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-xs text-stone-400 border-t border-stone-800/60 text-center sm:text-left">
          <p>
            Copyright © {new Date().getFullYear()} Nani Masala Co. All rights reserved. “A Little Tradition in Every Pinch.”
          </p>
          
          {/* REQUIRED AKDIGIMAX CREDIT */}
          <p className="text-stone-300 font-medium">
            Designed &amp; Developed by{' '}
            <a
              href="https://akdigimax.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-500/50 underline-offset-2 transition-colors"
            >
              AKDIGIMAX
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
