// src/components/Cart.tsx

import React from "react";
import { List, Button, InputNumber } from "antd";
import { CartItem } from "../redux/types";
import "./Cart.style.css";

interface CartProps {
  items: CartItem[];
  onRemove: (item: CartItem) => void;
  onUpdateQuantity: (item: CartItem, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity }) => {
  return (
    <div>
      <h2>Корзина</h2>
      <List
        dataSource={items}
        renderItem={(item: CartItem) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={`$${item.price.toFixed(2)} x ${item.quantity}`}
            />
            <div className="cart-actions"> {/* Используем новый контейнер для InputNumber и Button */}
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => onUpdateQuantity(item, value as number)}
              />
              <Button onClick={() => onRemove(item)}>Удалить</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Cart;
