import { createContext } from "react";

import { IProduct } from "../../components/product";

export interface ShippingMethod {
  company: string;
  deliveryTime: number;
  desc: string;
  price: number;
  type: string;
}

export interface PaymentMethod {
  type: string;
  desc: string;
  price: number;
}

interface IContext {
  cart: IProduct[];
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
  shippingMethod: ShippingMethod;
  setShipping: (method: ShippingMethod) => void;
  paymentMethod: PaymentMethod;
  setPayment: (method: PaymentMethod) => void;
  addItemToCart: (item: IProduct, size: string) => void;
  removeItemFromCart: (itemId: string) => void;
  clearItemFromCart: (itemId: string) => void;
  clearCart: () => void;
  getProductQuantity: (product: IProduct) => number;
  calcCartTotal: () => number;
  totalWithVat: () => number;
}

export default createContext<IContext>({
  cart: [],
  shippingMethods: [],
  paymentMethods: [],
  shippingMethod: null,
  setShipping: () => {},
  paymentMethod: null,
  setPayment: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  clearCart: () => {},
  getProductQuantity: () => 0,
  calcCartTotal: () => 0,
  totalWithVat: () => 0,
});
