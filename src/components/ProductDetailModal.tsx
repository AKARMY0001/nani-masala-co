import React from 'react';
import { Product } from '../types';
import { X, Check, ShieldCheck, Sparkles, MapPin, Wind, ShoppingBag } from 'lucide-react';
import { LOGO_URL } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#F7F2E7]">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
              {product.cat}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              ★ {product.rating} ({product.reviewsCount || 420} reviews)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-start gap-4">
            <img
              src={LOGO_URL}
              alt={product.name}
              className="w-20 h-20 object-contain rounded-xl bg-amber-50/50 p-2 border border-amber-200 shrink-0"
            />
            <div>
              <h2 className="text-xl font-serif-title font-bold text-[#6B1426] leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {product.desc}
              </p>
              
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-[#6B1426]">₹{product.price}</span>
                <span className="text-sm text-stone-400 line-through">₹{product.mrp}</span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save {discountPercent}%
                </span>
                <span className="text-xs text-stone-500 ml-2">Net Weight: <strong>{product.weight}</strong></span>
              </div>
            </div>
          </div>

          {/* Heritage Badges */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="bg-[#FDFBF7] p-3 rounded-lg border border-stone-200 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Single-Origin Source</strong>
                <span className="text-stone-600 text-[11px]">{product.origin || 'Heirloom Plantation, India'}</span>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-3 rounded-lg border border-stone-200 flex items-start gap-2">
              <Wind className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Aroma Profile</strong>
                <span className="text-stone-600 text-[11px]">{product.aroma || 'Warm, sweet, cold stone-ground oils'}</span>
              </div>
            </div>
          </div>

          {/* Grinding & Lab purity note */}
          <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Nani's Stone-Ground Guarantee</span>
            </div>
            <ul className="space-y-1 text-stone-700 text-[11px]">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Cold-pounded below 28°C to preserve 98% of volatile aroma oils.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zero Sudan red, zero synthetic food color, zero starch or anti-caking agents.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>FSSAI Central Food Safety Verified (License #10021051000123).</span>
              </li>
            </ul>
          </div>

          {/* Ingredients if available */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-stone-900">Pure Ingredients:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#F7F2E7] border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="text-xs text-stone-600">
            <span>Availability: </span>
            <strong className="text-emerald-700">{product.stock} in batch stock</strong>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="bg-white hover:bg-stone-100 text-[#6B1426] font-bold text-xs px-4 py-2.5 rounded-lg border border-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => {
                onBuyNow(product);
                onClose();
              }}
              className="bg-[#6B1426] hover:bg-[#500C1B] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
