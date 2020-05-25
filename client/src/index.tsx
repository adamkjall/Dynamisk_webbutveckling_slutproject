import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import ApplicationContextProvider from "./contexts";

ReactDOM.render(
  <BrowserRouter>
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
