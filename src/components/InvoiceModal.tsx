import React from 'react';
import { PlacedOrder } from '../types';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { LOGO_URL } from '../data/products';

interface InvoiceModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs z-60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto p-6 md:p-8 space-y-6 border border-stone-300">
        
        {/* Top actions */}
        <div className="flex justify-between items-center print:hidden border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span className="font-bold text-sm text-stone-900">Official GST Invoice</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="border border-stone-300 p-6 rounded-xl bg-white space-y-5 text-stone-800 text-xs">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-stone-200 pb-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="Nani Masala Co."
                className="w-12 h-12 object-contain rounded-full border border-stone-200"
              />
              <div>
                <h1 className="text-xl font-serif-title font-bold text-[#6B1426]">
                  Nani Masala Co.
                </h1>
                <p className="text-[11px] text-stone-500">Heirloom Stone-Ground Spices Pvt Ltd</p>
                <p className="text-[10px] text-stone-500 font-mono">
                  FSSAI Central Lic: 10021051000123 • GSTIN: 29AABCN8912P1ZM
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-200 mb-1">
                PAID / CONFIRMED
              </span>
              <p className="font-mono font-bold text-[#6B1426] text-sm">{order.orderId}</p>
              <p className="text-[11px] text-stone-500">Date: {order.date}</p>
            </div>
          </div>

          {/* Customer & Shipping info */}
          <div className="grid grid-cols-2 gap-4 bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs">
            <div>
              <p className="font-bold text-stone-700 uppercase tracking-wider text-[10px]">Billed &amp; Shipped To:</p>
              <p className="font-bold text-stone-900 mt-1">{order.customer.name}</p>
              <p className="text-stone-600">{order.customer.address}</p>
              <p className="text-stone-600">{order.customer.city}, {order.customer.state} - {order.customer.pin}</p>
              <p className="text-stone-600">Phone: {order.customer.phone}</p>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-stone-700 uppercase tracking-wider text-[10px]">Payment &amp; Dispatch Details:</p>
              <p className="mt-1 font-semibold text-stone-800">
                Method: {order.customer.paymentMethod === 'razorpay' ? 'Razorpay UPI/Cards' : 'Cash on Delivery (COD)'}
              </p>
              <p className="text-stone-600">Dispatch Status: Priority 24-Hour Express</p>
              <p className="text-emerald-700 font-semibold mt-1">✓ 100% Organic Purity Tested</p>
            </div>
          </div>

          {/* Table of items */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-300 text-stone-600 text-[11px] uppercase bg-stone-100">
                  <th className="py-2 px-2">Item Description</th>
                  <th className="py-2 px-2 text-center">Pack</th>
                  <th className="py-2 px-2 text-center">Qty</th>
                  <th className="py-2 px-2 text-right">Unit Price</th>
                  <th className="py-2 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {order.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-2 font-medium text-stone-900">{it.name}</td>
                    <td className="py-2 px-2 text-center text-stone-600">{it.weight}</td>
                    <td className="py-2 px-2 text-center text-stone-800 font-bold">{it.qty}</td>
                    <td className="py-2 px-2 text-right text-stone-700">₹{it.price}</td>
                    <td className="py-2 px-2 text-right font-bold text-stone-900">₹{it.price * it.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="border-t border-stone-300 pt-3 space-y-1 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Item Total (Gross):</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Promotional Discount (15%):</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Doorstep Shipping &amp; Handling:</span>
              <span>{order.shipping === 0 ? 'FREE (Orders > ₹499)' : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#6B1426] pt-2 border-t border-stone-300">
              <span>Total Payable Amount (Incl. 5% GST):</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* Quality footer */}
          <div className="border-t border-dashed border-stone-300 pt-3 text-[10px] text-stone-500 text-center space-y-1">
            <p>Thank you for choosing Nani Masala Co. — "A Little Tradition in Every Pinch."</p>
            <p>Stone-ground cold milled spices are best consumed within 12 months from the packaging date.</p>
          </div>

        </div>

      </div>
    </div>
  );
};
