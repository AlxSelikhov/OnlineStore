// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../redux/types";

const Header: React.FC = () => {
  const cartItemCount = useSelector((state: RootState) => {
    if (!state.cartItems) {
      return 0;
    }

    return (state.cartItems as CartItem[]).reduce(
      (total, item) => total + item.quantity,
      0
    );
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1>Интернет корзина</h1>
      <nav>
        <ul style={{ listStyle: "none", display: "flex", gap: "16px" }}>
          <li>
            <Link to="/">Товары</Link>
          </li>
          <li>
            <Link to="/cart">Корзина ({cartItemCount})</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
