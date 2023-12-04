// src/components/ProductQuantityControl.tsx
import React from "react";
import { Button, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { Product } from "../redux/types";

interface ProductQuantityControlProps {
  product: Product;
}

const ProductQuantityControl: React.FC<ProductQuantityControlProps> = ({
  product,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleQuantityChange = (value: number | undefined | null) => {
    if (value !== null && value !== undefined) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
    setQuantity(1);
  };

  return (
    <>
      <InputNumber min={1} value={quantity} onChange={handleQuantityChange} />
      <Button onClick={handleAddToCart}>Добавить товар</Button>
    </>
  );
};

export default ProductQuantityControl;
