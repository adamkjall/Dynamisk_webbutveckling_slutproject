import React, { FC, useState } from "react";

import AuthenticationContext, { User } from "./context";

interface Props {}

const AuthenticationContextProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>({
    firstName: "Adam",
    lastName: "Kjäll",
    phoneNumber: "0123456789",
    email: "adam@email.se",
    streetAddress: "Blåbärsvägeb 7",
    zipCode: "40010",
    city: "Ankeborg",
    isAdmin: true,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email: string, password: string) => {
    // TODO login API call to server
    const user = {
      firstName: "Adam",
      lastName: "Kjäll",
      phoneNumber: "0123456789",
      email: "adam@email.se",
      streetAddress: "Blåbärsvägeb 7",
      zipCode: "40010",
      city: "Ankeborg",
      card: "999999999999",
      isAdmin: true,
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

  const isAdmin = () => user && user.isAdmin;

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
