// src/App.tsx

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";

interface Product {
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface AppProps {
  start?: (options: { dealers?: string[] }) => void; // Добавляем опциональный параметр start
}

const App: React.FC<AppProps> = ({ start }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Получаем параметр dealers из URL
    const searchParams = new URLSearchParams(location.search);
    const dealerIds = searchParams.getAll("dealers");

    // Если функция start предоставлена в props, вызываем её
    if (start) {
      start({ dealers: dealerIds });
    }

    // Загрузка товаров соответствующих дилеров
    const loadProducts = async () => {
      try {
        // Если нет идентификаторов дилеров, получаем товары всех дилеров
        const url = dealerIds.length
          ? `https://test-frontend.dev.int.perx.ru/api/goods/?dealers=${dealerIds.join(",")}`
          : "https://test-frontend.dev.int.perx.ru/api/goods/"; 

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [start, location.search]);

  const handleAddToCart = (product: Product) => {
    // Обработка добавления в корзину
    console.log("Product added to cart:", product);

    // Обновление состояния корзины
    setCartItems((prevItems) => [
      ...prevItems,
      { ...product, quantity: 1 }, // Добавляем товар с начальным количеством 1
    ]);
  };

  return (
    <Provider store={store}>
      <Header />
      <div style={{ padding: "16px" }}>
        <Routes>
          <Route
            path="/"
            element={<ProductListPage onAddToCart={handleAddToCart} />}
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
