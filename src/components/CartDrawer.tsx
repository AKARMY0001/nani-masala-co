import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Lock, Tag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  couponCode: string;
  appliedDiscountRate: number;
  onApplyCoupon: (code: string) => boolean;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  couponCode,
  appliedDiscountRate,
  onApplyCoupon,
  onProceedToCheckout,
}) => {
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const discount = Math.round(subtotal * appliedDiscountRate);
  const isFreeDelivery = subtotal >= 499 || items.length === 0;
  const shipping = isFreeDelivery ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const success = onApplyCoupon(inputCoupon);
    if (!success) {
      setCouponError('Invalid coupon code. Try DADI15 for 15% OFF!');
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Cart Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#F7F2E7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#6B1426]" />
            <h2 className="font-bold text-base text-stone-900">Your Fresh Spice Cart</h2>
            <span className="text-xs bg-amber-200/80 text-amber-950 font-bold px-2 py-0.5 rounded-full">
              {items.reduce((acc, it) => acc + it.qty, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {subtotal < 499 && subtotal > 0 && (
          <div className="bg-amber-50 px-4 py-2 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>Add <strong>₹{499 - subtotal}</strong> more for <strong>FREE Delivery</strong>!</span>
            <span className="text-[10px] text-amber-700 font-bold">Orders &gt; ₹499 free</span>
          </div>
        )}

        {/* Cart Item List */}
        <div className="p-4 flex-1 space-y-3 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-stone-300" />
              <p className="text-sm font-semibold text-stone-700">Your spice basket is empty</p>
              <p className="text-xs mt-1 text-stone-500">Pick from our freshly stone-ground collection.</p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#6B1426] text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Browse Spices
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs hover:border-amber-200 transition-colors"
              >
                <div className="pr-2">
                  <p className="font-bold text-stone-900 text-xs leading-snug">{item.name}</p>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    ₹{item.price} • {item.weight}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-stone-300 rounded bg-white">
                    <button
                      onClick={() => onUpdateQty(index, -1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-stone-800 text-xs">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(index, 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-stone-400 hover:text-rose-700 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer & Calculations */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-[#F7F2E7] space-y-3">
            {/* Coupon input */}
            <form onSubmit={handleApply} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Coupon: DADI15"
                  className="w-full bg-white pl-8 pr-3 py-1.5 text-xs rounded border border-stone-300 uppercase font-mono text-stone-800 focus:outline-none focus:border-[#6B1426]"
                />
              </div>
              <button
                type="submit"
                className="bg-stone-800 text-white text-xs px-3.5 py-1.5 rounded font-bold hover:bg-stone-900 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedDiscountRate > 0 && (
              <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded border border-emerald-200 flex items-center justify-between">
                <span>Code <strong>{couponCode}</strong> Applied! (15% OFF)</span>
                <span className="font-bold">-₹{discount}</span>
              </div>
            )}

            {couponError && (
              <div className="text-[11px] text-rose-600 font-medium">{couponError}</div>
            )}

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-stone-900">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className={isFreeDelivery ? 'text-emerald-700 font-bold' : 'text-stone-700 font-bold'}>
                  {isFreeDelivery ? 'FREE' : '₹50'}
                </span>
              </div>

              {appliedDiscountRate > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Grandma's Discount:</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-[#6B1426] pt-1.5 border-t border-stone-200">
                <span>Order Total:</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full bg-[#6B1426] hover:bg-[#500C1B] text-white text-sm font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-98"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-[10px] text-center text-stone-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-stone-400" />
              <span>256-Bit SSL Secured by Razorpay & Cash on Delivery</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
