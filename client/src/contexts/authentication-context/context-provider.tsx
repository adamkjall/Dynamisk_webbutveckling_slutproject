import React, { FC, useState, useEffect } from "react";

import AuthenticationContext, { User } from "./context";

interface Props {}

const AuthenticationContextProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email: string, password: string) => {
    // TODO login API call to server
    const user = {
      firstName: "Adam",
      lastName: "Kjäll",
      phoneNumber: "0123456789",
      email: "adam@email.se",
      address: "Blåbärsvägeb 7",
      postCode: "400 10",
      city: "Ankeborg",
      card: "999999999999",
      role: "admin",
    };

    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // TODO logout api call to server
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (key: string, value: string) => {
    // TODO update api call
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isAdmin = () => user && user.role === "admin";

  return (
    <AuthenticationContext.Provider
      {...props}
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        updateUser,
      }}
    />
  );
};

export default AuthenticationContextProvider;
