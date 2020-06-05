import React, { FC, useState, useEffect } from "react";

import CartContext, { ShippingMethod, PaymentMethod } from "./context";

import { IProduct } from "../../components/product";

interface IProps {}

const INIT_SHIPPING_METHOD = {
  company: "",
  deliveryTime: 0,
  desc: "",
  price: 0,
  type: "",
};

const INIT_PAYMENT_METHOD = {
  type: "",
  desc: "",
  price: 0,
};

const CartContextProvider: FC<IProps> = (props) => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    INIT_SHIPPING_METHOD
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    INIT_PAYMENT_METHOD
  );
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>(
    null
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(null);

  console.log("cart", cart);

  // runs when component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/shipments", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setShippingMethods(data);
        setShippingMethod(data[0]);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/payments", { credentials: "include" }) // Fetch payment data
      .then((res) => res.json()) // Convert to json
      .then((data) => {
        setPaymentMethods(data);
        setPaymentMethod(data[0]);
      });
  }, []);

  const addItemToCart = (product: IProduct, size: string) => {
    setCart([...cart, { ...product, selectedSize: size }]);
  };

  const removeItemFromCart = (itemId: string) => {
    const index = cart.findIndex((cartItem) => cartItem._id === itemId);
    const updatedCart = [
      ...cart.slice(0, index),
      ...cart.slice(index + 1, cart.length),
    ];
    setCart(updatedCart);
  };

  const clearItemFromCart = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem._id !== itemId)
    );
  };

  const clearCart = () => setCart([]);

  const getProductQuantity = (productToCheck: IProduct) =>
    cart.reduce(
      (quantity, product) =>
        productToCheck === product ? quantity + 1 : quantity,
      0
    );

  const calcCartTotal = () =>
    cart.reduce((total, product) => total + product.price, 0);

  const totalWithVat = () => calcCartTotal() * 1.25;

  const setShipping = (method: ShippingMethod) => setShippingMethod(method);

  const setPayment = (method: PaymentMethod) => setPaymentMethod(method);

  return (
    <CartContext.Provider
      {...props}
      value={{
        cart,
        shippingMethods,
        paymentMethods,
        shippingMethod,
        setShipping,
        paymentMethod,
        setPayment,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        clearCart,
        getProductQuantity,
        totalWithVat,
        calcCartTotal,
      }}
    />
  );
};

export default CartContextProvider;
