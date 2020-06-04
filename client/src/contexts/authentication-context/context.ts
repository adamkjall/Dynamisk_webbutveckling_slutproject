import React from "react";

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  isAdmin: boolean;
}

interface IContext {
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
  register: (user: User) => Promise<string>;
  updateUser: (key: string, value: string) => void;
}

export default React.createContext<IContext>({
  isAuthenticated: true,
  isAdmin: () => false,
  user: null,
  login: (email: string, password: string) =>
    new Promise((resolve, reject) => {
      resolve("");
    }),
  logout: () => {},
  register: (user: User) =>
    new Promise((resolve, reject) => {
      resolve("");
    }),
  updateUser: (key: string, value: string) => {},
});
