import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthenticationContext from "../contexts/authentication-context/context";

import ProtectedRoute from "./protected-route/protected-route";

import Home from "../pages/home";
import Shop from "../pages/shop";
import Checkout from "../pages/checkout";
import Admin from "../pages/admin";
import SignInSignUp from "../pages/sign-in-sign-up";

/**
 * Main application router
 * You WANT to keep that component stateless!
 *
 * If you need to inject props to a specific route, use the context API
 * If you need to fetch data (like content for instance), load it from the view itself using componentDidMount()
 *
 * @see https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/shop/:category/:query?" component={Shop} />
      <Route
        exact
        path="/login"
        render={(props) =>
          isAuthenticated ? <Redirect to="/" /> : <SignInSignUp />
        }
      />
      <ProtectedRoute exact path="/checkout" component={Checkout} />
      <ProtectedRoute exact admin path="/admin" component={Admin} />
    </Switch>
  );
};

export default AppRouter;
