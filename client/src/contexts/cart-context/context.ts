import { createContext } from "react";
import { ShippingMethod, PaymentMethod } from "./context-provider";

import { IProduct } from "../../components/product";

interface IContext {
  cart: IProduct[];
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  addItemToCart: (item: IProduct) => void;
  removeItemFromCart: (itemId: string) => void;
  clearItemFromCart: (itemId: string) => void;
  clearCart: () => void;
  shippingCost: number;
}

export default createContext<IContext>({
  cart: [],
  shippingMethod: "postNord",
  setShippingMethod: () => {},
  paymentMethod: "card",
  setPaymentMethod: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  clearCart: () => {},
  shippingCost: 0,
});
