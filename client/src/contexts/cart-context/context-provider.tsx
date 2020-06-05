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

  // runs when component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/shipments", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setShippingMethods(data);
        if(Array.isArray(data)){
          setShippingMethod(data[0]);
        }
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/payments", { credentials: "include" }) // Fetch payment data
      .then((res) => res.json()) // Convert to json
      .then((data) => {
        setPaymentMethods(data);
        if(Array.isArray(data)){
          setPaymentMethod(data[0]);
        }
      });
  }, []);

  console.log(shippingMethod)
  console.log(paymentMethod)

  const addItemToCart = (product: IProduct) => {
    const existing = cart.find((cartItem) => cartItem._id === product._id);

    if (existing) {
      const newCart = cart.map((cartItem) => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity ? cartItem.quantity + 1 : 1,
          };
        } else return cartItem;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId: string) => {
    const existing = cart.find((cartItem) => cartItem._id === itemId);

    if (existing) {
      if (existing.quantity === 1) {
        const newCart = cart.filter((item) => item._id !== itemId);
        setCart(newCart);
      } else {
        const newCart = cart.map((cartItem) => {
          if (cartItem._id === itemId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity ? cartItem.quantity - 1 : 1,
            };
          } else return cartItem;
        });
        setCart(newCart);
      }
    }
  };

  const clearItemFromCart = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem._id !== itemId)
    );
  };

  const clearCart = () => setCart([]);

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
        setShippingMethod: setShipping,
        paymentMethod,
        setPaymentMethod: setPayment,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        clearCart,
      }}
    />
  );
};

export default CartContextProvider;
