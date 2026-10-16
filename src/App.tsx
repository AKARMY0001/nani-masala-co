import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, OrderCustomer, PlacedOrder } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhyStoneGroundSection } from './components/WhyStoneGroundSection';
import { RecipesSection } from './components/RecipesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

export default function App() {
  // Products State with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nani_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nani_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // UI state
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);
  const [totalOrdersCount, setTotalOrdersCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nani_order_count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Sync products to storage
  useEffect(() => {
    localStorage.setItem('nani_products', JSON.stringify(products));
  }, [products]);

  // Sync cart to storage
  useEffect(() => {
    localStorage.setItem('nani_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart actions
  const handleAddToCart = (product: Product | { id: number; name: string; price: number; weight: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          weight: product.weight,
          qty: 1,
        },
      ];
    });

    showToast(`Added ${product.name} to cart!`);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].qty += delta;
      if (updated[index].qty <= 0) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleApplyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DADI15') {
      setCouponCode('DADI15');
      setDiscountRate(0.15);
      showToast('Grandma code DADI15 applied! 15% OFF saved.');
      return true;
    }
    return false;
  };

  // Calculations for checkout
  const subtotal = cart.reduce((acc, it) => acc + it.price * it.qty, 0);
  const discount = Math.round(subtotal * discountRate);
  const shipping = subtotal >= 499 || cart.length === 0 ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleConfirmOrder = (customer: OrderCustomer) => {
    const orderId = 'NM-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder: PlacedOrder = {
      orderId,
      customer,
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      paymentStatus:
        customer.paymentMethod === 'razorpay'
          ? 'Verified (Razorpay Test Mode)'
          : 'Pending Doorstep Settlement (Cash on Delivery)',
    };

    setLastPlacedOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
    setTotalOrdersCount((prev) => {
      const updated = prev + 1;
      localStorage.setItem('nani_order_count', updated.toString());
      return updated;
    });
  };

  // Admin actions
  const handleUpdateStock = (id: number, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to remove this product from the storefront?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Product removed.');
    }
  };

  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts((prev) => [{ id: nextId, ...newProd }, ...prev]);
    showToast(`Product ${newProd.name} published.`);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset catalog back to initial 20 heirloom spices?')) {
      setProducts(INITIAL_PRODUCTS);
      showToast('Restored default 20 spices.');
    }
  };

  const featuredProduct = products[0] || INITIAL_PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A1713] selection:bg-amber-200 selection:text-[#6B1426]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-70 bg-[#2A1713] text-amber-200 px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header with Promo and Navigation */}
      <Header
        cartCount={cart.reduce((a, b) => a + b.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section with featured batch card */}
      <HeroSection
        onQuickAdd={(p) => handleAddToCart(p)}
        featuredProduct={featuredProduct}
      />

      {/* Categories Bar */}
      <CategoriesSection
        onSelectCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* 20 Artisanal Spices Catalogue */}
      <CatalogSection
        products={products}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onViewProduct={(p) => setSelectedProduct(p)}
      />

      {/* Why Stone Ground Section */}
      <WhyStoneGroundSection />

      {/* Heirloom Grandma Recipes Section */}
      <RecipesSection
        onAddBundle={(bundle) => handleAddToCart(bundle as any)}
      />

      {/* Verified Indian Household Reviews */}
      <ReviewsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer with Akdigimax credit */}
      <Footer />

      {/* Product Quick-View Tasting Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        couponCode={couponCode}
        appliedDiscountRate={discountRate}
        onApplyCoupon={handleApplyCoupon}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Secure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={total}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Order Confirmed Modal */}
      <OrderSuccessModal
        order={lastPlacedOrder}
        onClose={() => setIsSuccessOpen(false)}
        onViewInvoice={() => {
          setIsSuccessOpen(false);
          setIsInvoiceOpen(true);
        }}
      />

      {/* Printable / Downloadable GST Tax Invoice Modal */}
      <InvoiceModal
        order={lastPlacedOrder}
        onClose={() => setIsInvoiceOpen(false)}
      />

      {/* Store Manager Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateStock={handleUpdateStock}
        onDeleteProduct={handleDeleteProduct}
        onAddProduct={handleAddProduct}
        onResetDefaults={handleResetDefaults}
        totalOrdersCount={totalOrdersCount}
      />
    </div>
  );
}
