// src/redux/actions.ts

import { Product, CartItem } from "./types";

interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: CartItem;
}

interface RemoveAllFromCartAction {
  type: "REMOVE_ALL_FROM_CART";
}

export const addToCart = (
  product: Product,
  quantity: number
): AddToCartAction => {
  return {
    type: "ADD_TO_CART",
    payload: { ...product, quantity, total: product.price * quantity },
  };
};

export const removeFromCart = (item: CartItem) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: item,
  };
};

export const removeAllFromCart = (): RemoveAllFromCartAction => {
  return {
    type: "REMOVE_ALL_FROM_CART",
  };
};

export const updateQuantity = (item: CartItem, quantity: number) => {
  return {
    type: "UPDATE_QUANTITY",
    payload: { ...item, quantity },
  };
};

export const saveProducts = (products: Product[]) => {
  return {
    type: "SAVE_PRODUCTS",
    payload: products,
  };
};
