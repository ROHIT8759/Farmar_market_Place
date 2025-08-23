export interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  description: string;
  category: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  inStock: boolean;
  unit: string; // kg, piece, liter, etc.
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isSeller: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  orderDate: string;
  estimatedDelivery?: string;
}

export type CategoryType = 'All' | 'Vegetables' | 'Fruits' | 'Dairy' | 'Grains' | 'Meat' | 'Organic';
