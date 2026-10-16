import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem, OrderCustomer } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onConfirmOrder: (customer: OrderCustomer) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onConfirmOrder,
}) => {
  const [formData, setFormData] = useState<OrderCustomer>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    paymentMethod: 'razorpay',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate instant test gateway verification
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmOrder(formData);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto p-6 space-y-5 border border-stone-200 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h3 className="text-xl font-serif-title font-bold text-[#6B1426]">
              Secure Checkout &amp; Delivery
            </h3>
            <p className="text-xs text-stone-500">
              Provide shipping details for doorstep fresh dispatch within 24-48 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Priya Sharma"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:border-[#6B1426] focus:outline-none focus:ring-1 focus:ring-[#6B1426]"
              />
            </div>
            
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Phone Number (For Delivery &amp; OTP) *
              </label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:border-[#6B1426] focus:outline-none focus:ring-1 focus:ring-[#6B1426]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Delivery Address *
            </label>
            <input
              required
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Flat 402, Heritage Residency, Indiranagar"
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:border-[#6B1426] focus:outline-none focus:ring-1 focus:ring-[#6B1426]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                City *
              </label>
              <input
                required
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Bengaluru"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:border-[#6B1426] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                State *
              </label>
              <input
                required
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Karnataka"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:border-[#6B1426] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                PIN Code *
              </label>
              <input
                required
                type="text"
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                placeholder="560038"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:border-[#6B1426] focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="border border-amber-200 bg-amber-50/50 p-4 rounded-xl space-y-2.5">
            <span className="block font-bold text-stone-900 text-xs">
              Choose Payment Method
            </span>
            
            <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'razorpay' ? 'bg-white border-[#6B1426] shadow-xs' : 'bg-white/80 border-stone-200'}`}>
              <input
                type="radio"
                name="payment"
                checked={formData.paymentMethod === 'razorpay'}
                onChange={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                className="mt-0.5 accent-[#6B1426]"
              />
              <div className="flex-1">
                <span className="font-bold text-stone-900 block text-xs">
                  Razorpay (UPI, Google Pay, PhonePe, Cards, Netbanking)
                </span>
                <span className="text-[11px] text-stone-500">
                  Instant secure payment verification with test transaction signature.
                </span>
              </div>
            </label>

            <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'bg-white border-[#6B1426] shadow-xs' : 'bg-white/80 border-stone-200'}`}>
              <input
                type="radio"
                name="payment"
                checked={formData.paymentMethod === 'cod'}
                onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                className="mt-0.5 accent-[#6B1426]"
              />
              <div className="flex-1">
                <span className="font-bold text-stone-900 block text-xs">
                  Cash on Delivery (COD)
                </span>
                <span className="text-[11px] text-stone-500">
                  Pay cash or UPI to delivery agent when fresh spices arrive at your doorstep.
                </span>
              </div>
            </label>
          </div>

          {/* Order Summary Pill */}
          <div className="bg-[#F7F2E7] p-3 rounded-lg text-xs space-y-1">
            <div className="flex justify-between text-stone-600">
              <span>Items in order ({items.reduce((a, b) => a + b.qty, 0)}):</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount applied:</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Shipping cost:</span>
              <span className={shipping === 0 ? 'text-emerald-700 font-bold' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-stone-300 font-bold">
              <span className="text-stone-800">Final Amount to Pay:</span>
              <span className="text-base text-[#6B1426]">₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Authorizing Transaction...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize Order &amp; Download Receipt</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-stone-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
            <span>FSSAI License: 10021051000123 • Authentic Indian Organic Spices</span>
          </p>
        </form>

      </div>
    </div>
  );
};
