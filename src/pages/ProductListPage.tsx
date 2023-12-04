// src/pages/ProductListPage.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ProductList from "../components/ProductList";
import { addToCart, saveProducts } from "../redux/actions";
import { Product } from "../redux/types";

interface ProductListPageProps {
  onAddToCart: (product: Product) => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ onAddToCart }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // Загрузка товаров с бэкенда
    fetch("https://test-frontend.dev.int.perx.ru/api/goods/")
      .then((response) => response.json())
      .then((data) => {
        // Положим товары в хранилище
        dispatch(saveProducts(data));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [dispatch]);

  return (
    <div>
      <ProductList products={products}  />
    </div>
  );
};

export default ProductListPage;
