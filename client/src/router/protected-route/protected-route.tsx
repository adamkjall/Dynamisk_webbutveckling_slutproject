import React, { FC, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthenticationContext from "../../contexts/authentication-context/context";

interface Props {
  component: React.ElementType;
  path: string;
  exact?: boolean;
  admin?: boolean;
}

const ProtectedRoute: FC<Props> = ({
  component: Component,
  admin,
  ...rest
}) => {
  const { isAuthenticated, user } = useContext(AuthenticationContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || (user && user.role === "admin") ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
