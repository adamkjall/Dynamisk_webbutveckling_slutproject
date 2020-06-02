import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { Nav, Text, Box, ResponsiveContext, Menu } from "grommet";

import AuthenticationContext from "../contexts/authentication-context/context";

const MyMenu = () => {
  const history = useHistory();
  const { isAdmin } = useContext(AuthenticationContext);

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
              <Text margin={{ left: "small" }} size="medium">
                <Link className="link" to="/shop/mens">
                  MENS
                </Link>
              </Text>
              <Text size="medium">
                <Link className="link" to="/shop/womens">
                  WOMENS
                </Link>
              </Text>
              <Text size="medium">
                <Link className="link" to="/shop/hats">
                  HATS
                </Link>
              </Text>
              <Text size="medium">
                <Link className="link" to="/shop/jackets">
                  JACKETS
                </Link>
              </Text>
              <Text size="medium">
                <Link className="link" to="/shop/shoes">
                  SNEAKERS
                </Link>
              </Text>
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
      <Text size="medium">
        {isAdmin() ? (
          <Link className="link" to="/admin">
            Admin
          </Link>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </Text>
    </Box>
  );
};

export default MyMenu;
