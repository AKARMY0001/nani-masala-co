export interface Product {
  id: number;
  name: string;
  cat: 'Pure Ground' | 'Heritage Blends' | 'Whole Spices' | 'Regional' | 'Combos';
  price: number;
  mrp: number;
  weight: string;
  stock: number;
  rating: number;
  reviewsCount?: number;
  desc: string;
  origin?: string;
  aroma?: string;
  ingredients?: string[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  weight: string;
  qty: number;
  image?: string;
  cat?: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  paymentMethod: 'razorpay' | 'cod';
}

export interface PlacedOrder {
  orderId: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
  paymentStatus: string;
}
