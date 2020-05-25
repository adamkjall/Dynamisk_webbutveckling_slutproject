import React from "react";

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  postCode: string;
  city: string;
  card: string;
  role: string;
}

interface IContext {
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateUser: (key: string, value: string) => void;
}

export default React.createContext<IContext>({
  isAuthenticated: false,
  isAdmin: () => false,
  user: null,
  login: (email: string, password: string) => {},
  logout: () => {},
  updateUser: (key: string, value: string) => {},
});
