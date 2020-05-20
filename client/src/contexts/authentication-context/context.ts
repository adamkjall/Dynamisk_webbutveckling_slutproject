import React from "react";

interface IState {
  isAuthenticated: boolean;
  user?: object;
  login: () => void;
  logout: () => void;
}

export default React.createContext<IState>({
  isAuthenticated: false,
  user: undefined,
  login: () => {},
  logout: () => {}
});
