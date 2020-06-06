import React, { useContext } from "react";
import styled from "styled-components"
import { Link, useHistory, useLocation } from "react-router-dom";

import { Nav, Text, Box, ResponsiveContext, Menu } from "grommet";

import AuthenticationContext from "../contexts/authentication-context/context";
import AccountMenu from "./account-menu";

const StyledGrommetMenu = styled(Menu)`
  min-width: 5.5rem;
`

const MyMenu = () => {
  const history = useHistory();
  const location = useLocation()
  const { isAdmin, isAuthenticated, logout } = useContext(
    AuthenticationContext
  );

  const menuItems = [
    {
      label: "All",
      route: "/shop/all",
      onClick: () => history.push("/shop/all")
    },
    {
      label: "Mens",
      route: "/shop/mens",
      onClick: () => history.push("/shop/mens")
    },
    {
      label: "Womens",
      route: "/shop/womens",
      onClick: () => history.push("/shop/womens")
    },
    {
      label: "Hats",
      route: "/shop/hats",
      onClick: () => history.push("/shop/hats")
    },
    {
      label: "Jackets",
      route: "/shop/jackets",
      onClick: () => history.push("/shop/jackets")
    },
    {
      label: "Sneakers",
      route: "/shop/shoes",
      onClick: () => history.push("/shop/shoes")
    },
  ]

  const getCurrentCategory = () => {
    let currentCategory = "Categories"
    menuItems.forEach((item) => {
      if (item.route === location.pathname) {
        currentCategory = item.label
      }
    })
    return currentCategory
  }

  return (
    <Box
      height="6.5vh"
      direction="row"
      justify="between"
      align="center"
      elevation="small"
      pad="small"
    >
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <StyledGrommetMenu
              label={getCurrentCategory()}
              items={
                menuItems.map(item => {
                  const menuitem = {...item}
                  delete menuitem.route
                  return menuitem
                })
              }
            />
          ) : (
              <Nav direction="row" background="mainText">
                {
                  menuItems.map((item, index) => 
                    <Link className="link" to={item.route} key={`${item.label}-${index}`}>
                      <Text size="medium">{item.label.toUpperCase()}</Text>
                    </Link>
                  )
                }
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
          <AccountMenu logout={logout} />
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
