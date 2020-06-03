import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { Nav, Text, Box, ResponsiveContext, Menu } from "grommet";

import AuthenticationContext from "../contexts/authentication-context/context";

const MyMenu = () => {
  const history = useHistory();
  const { isAdmin, isAuthenticated, logout } = useContext(
    AuthenticationContext
  );

  return (
    <Box
      height="5vh"
      direction="row"
      justify="between"
      align="center"
      elevation="small"
      pad="small"
    >
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <Menu
              label="Menu"
              items={[
                { label: "Mens", onClick: () => history.push("/shop/mens") },
                {
                  label: "Womens",
                  onClick: () => history.push("/shop/womens"),
                },
                { label: "Hats", onClick: () => history.push("/shop/hats") },
                {
                  label: "Jackets",
                  onClick: () => history.push("/shop/jackets"),
                },
                {
                  label: "Sneakers",
                  onClick: () => history.push("/shop/shoes"),
                },
              ]}
            />
          ) : (
            <Nav direction="row" background="mainText">
              <Link className="link" to="/shop/mens">
                <Text margin={{ left: "small" }} size="medium">
                  MENS
                </Text>
              </Link>
              <Link className="link" to="/shop/womens">
                <Text size="medium">WOMENS</Text>
              </Link>
              <Link className="link" to="/shop/hats">
                <Text size="medium">HATS</Text>
              </Link>
              <Link className="link" to="/shop/jackets">
                <Text size="medium">JACKETS</Text>
              </Link>
              <Link className="link" to="/shop/shoes">
                <Text size="medium">SNEAKERS</Text>
              </Link>
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
      <Nav direction="row">
        {isAdmin() && (
          <Link className="link" to="/admin">
            <Text size="medium">Admin</Text>
          </Link>
        )}
        {isAuthenticated ? (
          <Link className="link" to="/" onClick={logout}>
            <Text size="medium">Logout</Text>
          </Link>
        ) : (
          <Link className="link" to="/login">
            <Text size="medium">Login</Text>
          </Link>
        )}
      </Nav>
    </Box>
  );
};

export default MyMenu;
