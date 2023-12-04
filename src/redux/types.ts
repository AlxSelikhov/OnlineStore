// src/redux/types.ts

export interface CartState {
  cartItems: CartItem[];
}

export interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Product {
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
  total?: number;
}

export interface ProductAction {
  type: string;
  payload: Product[];
}

export interface CartAction {
  type: string;
  payload: Product | CartItem;
}
