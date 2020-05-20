import React, { FC, useState } from "react";

import AuthenticationContext from "./context";

interface IProps {}

const AuthenticationContextProvider: FC<IProps> = props => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    console.log("login");
  };

  const logout = () => {
    console.log("logout");
  };

  return (
    <AuthenticationContext.Provider
      {...props}
      value={{
        user,
        isAuthenticated,
        login,
        logout
      }}
    />
  );
};

export default AuthenticationContextProvider;
