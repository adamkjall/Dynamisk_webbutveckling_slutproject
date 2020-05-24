import React, { FC, useState } from "react";

import AuthenticationContext, { User } from "./context";

interface Props {}

const AuthenticationContextProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    console.log("login");
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
    console.log("logout");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (key: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <AuthenticationContext.Provider
      {...props}
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    />
  );
};

export default AuthenticationContextProvider;
