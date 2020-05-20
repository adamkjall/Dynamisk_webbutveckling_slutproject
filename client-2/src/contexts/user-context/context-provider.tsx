import React, { useState } from "react";

import UserContext, { IUser } from "./context";

interface IProps {}

const initialUser: IUser = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  address: "",
  postCode: "",
  city: "",
  card: ""
};

const UserContextProvider = (props: IProps) => {
  const [user, setUser] = useState(initialUser);

  const updateUser = (key: string, value: string) => {
    setUser(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <UserContext.Provider
      {...props}
      value={{
        user,
        updateUser
      }}
    />
  );
};

export default UserContextProvider;
