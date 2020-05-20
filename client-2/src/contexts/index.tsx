import React, { FC } from "react";

import AuthenticationContextProvider from "./authentication-context/context-provider";
import CartContextProvider from "./cart-context/context-provider";
import UserContextProvider from "./user-context/context-provider";

interface IProps {
  children: React.ReactNode;
}

const ApplicationContextProvider: FC<IProps> = ({ children }) => (
  <AuthenticationContextProvider>
    <UserContextProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </UserContextProvider>
  </AuthenticationContextProvider>
);

export default ApplicationContextProvider;
