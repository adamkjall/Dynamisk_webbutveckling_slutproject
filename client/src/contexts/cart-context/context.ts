import { createContext } from "react";

import { IProduct } from "../../components/product";

export interface ShippingMethod {
  company: string
  deliveryTime: number
  desc: string
  price: number
  type: string
}

export interface PaymentMethod {
  type: string
  desc: string
  price: number
}

interface IContext {
  cart: IProduct[];
  shippingMethods: ShippingMethod[],
  paymentMethods: PaymentMethod[]
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  addItemToCart: (item: IProduct) => void;
  removeItemFromCart: (itemId: string) => void;
  clearItemFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export default createContext<IContext>({
  cart: [],
  shippingMethods: [],
  paymentMethods: [],
  shippingMethod: null,
  setShippingMethod: () => {},
  paymentMethod: null,
  setPaymentMethod: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  clearCart: () => {},
});
