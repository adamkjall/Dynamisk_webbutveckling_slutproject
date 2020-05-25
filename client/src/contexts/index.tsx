import React, { FC } from "react";

import AuthenticationContextProvider from "./authentication-context/context-provider";
import CartContextProvider from "./cart-context/context-provider";

interface IProps {
  children: React.ReactNode;
}

const ApplicationContextProvider: FC<IProps> = ({ children }) => (
  <AuthenticationContextProvider>
    <CartContextProvider>{children}</CartContextProvider>
  </AuthenticationContextProvider>
);

export default ApplicationContextProvider;
