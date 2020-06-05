import { User } from "./contexts/authentication-context/context";
import { IProduct } from "./components/product";
import { ShippingMethod, PaymentMethod } from "./contexts/cart-context/context";

interface IOrder {
  user: User;
  products: IProduct[];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  toAddress: string;
  toZipCode: string;
  toCity: string;
}

export const payWithApi = async (order: IOrder) => {
  const options: RequestInit = {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(order),
  };

  const res = await fetch("http://localhost:8080/api/orders/", options);
  const json = await res.json();
  return json;
};
