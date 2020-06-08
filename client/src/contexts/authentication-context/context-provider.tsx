import React, { FC, useState, useEffect } from "react";

import AuthenticationContext, { User } from "./context";

interface Props {}

const AuthenticationContextProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check if user already as an authentication session
  useEffect(() => {
    const options: RequestInit = {
      credentials: "include",
    };

    fetch("http://localhost:8080/api/users", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message === "Authenticated") {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      });
  }, []);

  const login = async (email: string, password: string) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    };

    const res = await fetch(
      "http://localhost:8080/api/users/session/login",
      options
    );
    const data = await res.json();

    if (data.message) {
      if (data.message === "Authenticated") {
        setIsAuthenticated(true);
        setUser(data.user);
      }
      return data.message;
    }

    return "Failed to login";
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);

    const options: RequestInit = {
      method: "DELETE",
      credentials: "include",
    };

    await fetch("http://localhost:8080/api/users/session/logout", options);
  };

  const register = async (user: User) => {
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    };

    const res = await fetch("http://localhost:8080/api/users", options);
    const data = await res.json();

    if (data.message) {
      if (data.message === "Authenticated") {
        setIsAuthenticated(true);
        setUser(data.user);
      }
      return data.message;
    }

    return "Failed to register";
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
        register,
        updateUser,
      }}
    />
  );
};

export default AuthenticationContextProvider;
