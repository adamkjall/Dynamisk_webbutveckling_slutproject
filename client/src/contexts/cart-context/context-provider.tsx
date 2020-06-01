import React, { FC, useState, useEffect } from "react";

import CartContext from "./context";

import { Product } from "../../shop.data";

interface IProps {}

export type ShippingMethod = "postNord" | "schenker" | "dhl";
export type PaymentMethod = "card" | "invoice" | "swish";

const CartContextProvider: FC<IProps> = (props) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    "postNord"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  useEffect(() => {
    let cost = 0;
    switch (shippingMethod) {
      case "dhl":
        cost = 10;
        break;
      case "schenker":
        cost = 5;
        break;
      default:
        cost = 2;
    }
    setShippingCost(cost);
  }, [shippingMethod]);

  const addItemToCart = (item: Product) => {
    const existing = cart.find((cartItem) => cartItem._id === item._id);

    if (existing) {
      const newCart = cart.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity ? cartItem.quantity + 1 : 1,
          };
        } else return cartItem;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
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
        shippingMethod,
        setShippingMethod: setShipping,
        paymentMethod,
        setPaymentMethod: setPayment,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        clearCart,
        shippingCost: shippingCost,
      }}
    />
  );
};

export default CartContextProvider;
