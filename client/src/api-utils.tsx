import { User } from "./contexts/authentication-context/context";
import { IProduct } from "./components/product";
import { ShippingMethod, PaymentMethod } from "./contexts/cart-context/context";

interface INewOrder {
  user: User;
  products: IProduct[];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  toAddress: string;
  toZipCode: string;
  toCity: string;
}

interface IOrder extends INewOrder {
  _id: string;
  orderStatus: boolean;
  timeStamp: Date;
}

const orderAPI = "http://localhost:8080/api/orders/"

export const payWithApi = async (order: INewOrder) => {
  const options: RequestInit = {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(order),
  };

  const res = await fetch(orderAPI, options);
  const json = await res.json();
  return json;
};

export const updateOrderStatus = async (order: IOrder) => {
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(order)
  };

  const res = await fetch(orderAPI + order._id, options);
  const json = await res.json();
  return json
};

export const getAllOrdersAdmin = async () => {
  const options: RequestInit = {
    method: "GET",
    credentials: "include"
  };

  const res = await fetch(orderAPI, options);
  const json = await res.json();
  return json
}

export const getAllOrdersUser = async (id: string) => {
  const options: RequestInit = {
    method: "GET",
    credentials: "include"
  };

  const res = await fetch(`${orderAPI}/user/${id}`, options);
  const json = await res.json();
  return json
}

export const findOrderById = async (id: string) => {
  const options: RequestInit = {
    method: "GET",
    credentials: "include"
  };

  const res = await fetch(orderAPI + id, options);
  const json = await res.json();
  return json
};
