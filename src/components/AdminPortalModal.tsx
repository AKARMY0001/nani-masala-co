import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, PlusCircle, Trash2, RotateCcw } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateStock: (id: number, newStock: number) => void;
  onDeleteProduct: (id: number) => void;
  onAddProduct: (p: Omit<Product, 'id'>) => void;
  onResetDefaults: () => void;
  totalOrdersCount: number;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateStock,
  onDeleteProduct,
  onAddProduct,
  onResetDefaults,
  totalOrdersCount,
}) => {
  const [name, setName] = useState('');
  const [cat, setCat] = useState<'Pure Ground' | 'Heritage Blends' | 'Whole Spices' | 'Regional' | 'Combos'>('Heritage Blends');
  const [price, setPrice] = useState('160');
  const [stock, setStock] = useState('30');
  const [weight, setWeight] = useState('100g');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddProduct({
      name: name.trim(),
      cat,
      price: parseInt(price) || 150,
      mrp: Math.round((parseInt(price) || 150) * 1.2),
      weight: weight.trim() || '100g',
      stock: parseInt(stock) || 25,
      rating: 4.9,
      desc: desc.trim() || 'Freshly pounded heritage spice batch added via Admin Portal.',
      origin: 'Heirloom Plantation',
      aroma: 'Aromatic, cold-ground essential oils',
    });

    setName('');
    setDesc('');
    setMessage(`Product "${name}" added to live storefront!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto p-6 space-y-5 border border-stone-300 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#6B1426]" />
            <h3 className="text-xl font-serif-title font-bold text-[#6B1426]">
              Nani Masala Co. Admin Portal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin KPI Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200">
            <span className="text-xs text-stone-500 block">Total Revenue</span>
            <span className="text-lg font-bold text-[#6B1426]">₹1,84,320</span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              ▲ +18.4% this month
            </span>
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
            <span className="text-xs text-stone-500 block">Total Orders</span>
            <span className="text-lg font-bold text-emerald-900">{428 + totalOrdersCount}</span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              99.2% Fulfilment
            </span>
          </div>

          <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200">
            <span className="text-xs text-stone-500 block">Active Products</span>
            <span className="text-lg font-bold text-rose-900">{products.length}</span>
            <span className="text-[10px] text-stone-500 block mt-0.5">Catalogue live</span>
          </div>

          <div className="bg-[#F7F2E7] p-3.5 rounded-xl border border-stone-300">
            <span className="text-xs text-stone-500 block">FSSAI Status</span>
            <span className="text-xs font-bold text-stone-800">10021051000123</span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              Demo Verified
            </span>
          </div>
        </div>

        {/* Add New Product Form */}
        <form onSubmit={handleAdd} className="border border-stone-200 rounded-xl p-4 bg-[#F7F2E7] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#6B1426] flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-[#D97706]" />
              <span>Add / Update Live Store Product</span>
            </h4>
            {message && (
              <span className="text-xs text-emerald-700 font-bold">{message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Spice Name (e.g. Kashmiri Saffron)"
              className="p-2 border rounded border-stone-300 bg-white"
            />
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="p-2 border rounded border-stone-300 bg-white"
            >
              <option value="Pure Ground">Pure Ground</option>
              <option value="Heritage Blends">Heritage Blends</option>
              <option value="Whole Spices">Whole Spices</option>
              <option value="Regional">Regional</option>
              <option value="Combos">Combos</option>
            </select>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price (₹)"
              className="p-2 border rounded border-stone-300 bg-white"
            />
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock Qty"
              className="p-2 border rounded border-stone-300 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Short aroma/origin description..."
              className="p-2 border rounded border-stone-300 bg-white"
            />
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight Pack (e.g. 100g, 250g)"
              className="p-2 border rounded border-stone-300 bg-white"
            />
          </div>

          <button
            type="submit"
            className="bg-[#6B1426] text-white text-xs font-bold px-4 py-2 rounded shadow hover:bg-[#500C1B] cursor-pointer"
          >
            Save Product to Live Storefront
          </button>
        </form>

        {/* Live Inventory Management Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-xl max-h-64 overflow-y-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-100 text-stone-900 font-bold border-b border-stone-200 sticky top-0">
              <tr>
                <th className="p-2.5">ID</th>
                <th className="p-2.5">Spice Product</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Price</th>
                <th className="p-2.5">Live Stock</th>
                <th className="p-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="p-2.5 font-mono text-stone-500">#{p.id}</td>
                  <td className="p-2.5 font-bold text-stone-900">{p.name}</td>
                  <td className="p-2.5">
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-medium">
                      {p.cat}
                    </span>
                  </td>
                  <td className="p-2.5 font-bold text-[#6B1426]">₹{p.price}</td>
                  <td className="p-2.5">
                    <input
                      type="number"
                      value={p.stock}
                      onChange={(e) => onUpdateStock(p.id, parseInt(e.target.value) || 0)}
                      className="w-16 p-1 border rounded text-xs bg-white text-stone-900 font-semibold"
                    />
                  </td>
                  <td className="p-2.5 text-right">
                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="text-rose-600 hover:text-rose-800 font-bold p-1 rounded"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom controls */}
        <div className="flex justify-between items-center text-xs text-stone-500 pt-2 border-t border-stone-200">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-stone-600 hover:text-[#6B1426] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Default 20 Spices</span>
          </button>
          
          <button
            onClick={onClose}
            className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-1.5 rounded font-bold cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
