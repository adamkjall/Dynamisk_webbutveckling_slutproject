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
  const savedCart = JSON.parse(localStorage.getItem("cart")) || []
  const [cart, setCart] = useState<IProduct[]>(savedCart);
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

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // runs when component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/shipments", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setShippingMethods(data);
        if (Array.isArray(data)) {
          setShippingMethod(data[0]);
        }
      });

    fetch("http://localhost:8080/api/payments", { credentials: "include" }) // Fetch payment data
      .then((res) => res.json()) // Convert to json
      .then((data) => {
        setPaymentMethods(data);
        if (Array.isArray(data)) {
          setPaymentMethod(data[0]);
        }
      });
  }, []);

  const addItemToCart = (productToAdd: IProduct, size: string) => {
    const existing = cart.find(
      (product) => product.id === productToAdd._id + "-" + size
    );
    if (!existing) {
      setCart([
        ...cart,
        {
          ...productToAdd,
          selectedSize: size,
          quantity: 1,
          id: productToAdd._id + "-" + size,
        },
      ]);
    } else {
      existing.quantity++;
      setCart([...cart]); // force re-render
    }
  };

  const removeItemFromCart = (itemId: string) => {
    const existing = cart.find((cartItem) => cartItem.id === itemId);
    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity--;
        setCart([...cart]); // force re-render
      } else {
        const index = cart.findIndex((cartItem) => cartItem.id === itemId);
        const updatedCart = [
          ...cart.slice(0, index),
          ...cart.slice(index + 1, cart.length),
        ];
        setCart(updatedCart);
      }
    }
  };

  const clearItemFromCart = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const clearCart = () => setCart([]);

  const calcCartTotal = () =>
    cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

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
        totalWithVat,
        calcCartTotal,
      }}
    />
  );
};

export default CartContextProvider;
