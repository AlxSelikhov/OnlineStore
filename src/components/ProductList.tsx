// src/components/ProductList.tsx

import React from "react";
import { List } from "antd";
import ProductQuantityControl from "./ProductQuantityControl";
import { Product } from "../redux/types";
import "./ProductList.style.css";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h2>Список товаров</h2>
      <List
        dataSource={products}
        renderItem={(product: Product) => (
          <List.Item key={product.name}>
            <List.Item.Meta
              title={product.name}
              description={`$${product.price.toFixed(2)}`}
              avatar={
                <img
                  src={`https://test-frontend.dev.int.perx.ru${product.image}`}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", marginRight: "16px" }}
                />
              }
            />
            <div className="product-actions">
              {" "}
              {/* Используем новый контейнер для ProductQuantityControl */}
              <ProductQuantityControl product={product} />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;
