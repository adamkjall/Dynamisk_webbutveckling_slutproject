import { createContext } from "react";
import { ShippingMethod, PaymentMethod } from "./context-provider";

import { CollectionItem } from "../../shop.data";

interface IState {
  cart: CollectionItem[];
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  addItemToCart: (item: CollectionItem) => void;
  removeItemFromCart: (itemId: number) => void;
  clearItemFromCart: (itemId: number) => void;
  clearCart: () => void;
  shippingCost: number;
}

export default createContext<IState>({
  cart: [],
  shippingMethod: "postNord",
  setShippingMethod: () => {},
  paymentMethod: "card",
  setPaymentMethod: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  clearCart: () => {},
  shippingCost: 0
});
