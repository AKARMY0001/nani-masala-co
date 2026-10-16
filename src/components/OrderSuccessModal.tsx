import React from 'react';
import { PlacedOrder } from '../types';
import { CheckCircle2, Download, ShoppingBag } from 'lucide-react';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
  onViewInvoice: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewInvoice,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-55 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 text-center space-y-4 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        
        <h3 className="text-xl font-serif-title font-bold text-[#6B1426]">
          Order Confirmed!
        </h3>
        <p className="text-xs text-stone-600">
          Thank you, <strong>{order.customer.name}</strong>, for bringing Nani's stone-ground tradition to your family kitchen.
        </p>
        
        {/* Order Details card */}
        <div className="bg-[#F7F2E7] p-4 rounded-xl text-left text-xs space-y-2 border border-stone-200">
          <div className="flex justify-between">
            <span className="text-stone-500">Order ID:</span>
            <span className="font-mono font-bold text-[#6B1426]">{order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Payment Status:</span>
            <span className="text-emerald-700 font-bold">{order.paymentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Total Paid:</span>
            <span className="font-bold text-stone-900">₹{order.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Estimated Dispatch:</span>
            <span className="font-bold text-stone-800">Within 24 Hours</span>
          </div>
          <div className="flex justify-between border-t border-stone-300 pt-1 text-[11px] text-stone-500">
            <span>FSSAI License:</span>
            <span className="font-mono">10021051000123</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={onViewInvoice}
            className="w-full bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Download &amp; View PDF Invoice</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-[#F7F2E7] hover:bg-stone-200 text-stone-800 text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
