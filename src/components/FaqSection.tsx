import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What makes stone-ground spices superior to industrial machine-ground ones?',
      a: 'Industrial commercial pulverizers generate high heat (above 65°C), burning delicate volatile oils and causing authentic flavors to escape. Our slow granite stone grinders maintain room temperature, keeping the natural curative oils, essential colors, and authentic fragrances fully intact.',
    },
    {
      q: 'Are there any added artificial colors, preservatives, or anti-caking agents?',
      a: 'Zero. We never add artificial food dyes, starch fillers, preservatives, or anti-caking chemicals. Every single product is 100% natural, sun-dried, and FSSAI certified.',
    },
    {
      q: 'How fresh are the spices when delivered?',
      a: 'All our masalas are ground in micro-batches every 3–5 days. Your order is packaged in moisture-barrier pouches and dispatched within 24–48 hours of milling.',
    },
    {
      q: 'What payment methods and delivery options do you accept?',
      a: 'We support Razorpay (UPI, Google Pay, PhonePe, Paytm, Credit & Debit Cards, Netbanking) and Cash on Delivery (COD). Free delivery is applicable on all orders above ₹499 across all Indian PIN codes.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-[#F7F2E7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
            GOT QUESTIONS?
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#6B1426] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full font-bold text-sm text-stone-900 cursor-pointer p-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#6B1426]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
