// src/pages/CartPage.tsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cart from "../components/Cart";
import {
  removeFromCart,
  updateQuantity,
  removeAllFromCart,
} from "../redux/actions";
import { CartItem } from "../redux/types";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.cartItems
  ) as CartItem[];

  const handleRemoveFromCart = (item: CartItem) => {
    // Удаление товара из корзины
    dispatch(removeFromCart(item));
  };

  const handleUpdateQuantity = (item: CartItem, quantity: number) => {
    // Обновление количества товара в корзине
    dispatch(updateQuantity(item, quantity));
  };

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllFromCart());
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total: number, item: CartItem) => total + (item.total || 0),
      0
    );
  };

  return (
    <div>
      <Cart
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <div>
        <p>Суммарная стоимость: ${getTotalPrice().toFixed(2)}</p>
        <button onClick={handleRemoveAllFromCart}>Удалить все</button>
      </div>
    </div>
  );
};

export default CartPage;
