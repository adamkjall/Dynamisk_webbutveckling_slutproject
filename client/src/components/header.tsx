import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

import { Box, Heading, Layer, Stack, Text, ResponsiveContext } from "grommet";
import { Cart } from "grommet-icons";

import MyCart from "./cart";
import SearchBar from "./search-bar";

import CartContext from "../contexts/cart-context/context";

const StyledHeader = styled(Box)`
  min-height: 4rem
`

const Header = () => {
  const { cart } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

  const [open, setOpen] = React.useState<boolean>();

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  return (
    <StyledHeader
      height="8vh"
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      style={{ zIndex: 1 }}
    >
      <Heading
        level="3"
        margin="none"
        style={{ fontFamily: `ONEDAY` }}
        size="large"
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          ADAM FREDICK
        </Link>
      </Heading>
      <Box direction="row">
        <SearchBar />
        <Stack
          anchor="top-right"
          onClick={onOpen}
          margin={{ right: "medium" }}
          style={{ cursor: "pointer" }}
          alignSelf="center"
        >
          <Cart size={responsive === "small" ? "1.7rem" : "2.3rem"} />
          <Box background="#76FEB3" pad={{ horizontal: "xxsmall" }} round>
            <Text
              weight="bold"
              size={responsive === "small" ? "small" : "medium"}
            >
              {cart ? cart.length : 0}
            </Text>
          </Box>
        </Stack>
      </Box>
      {open && (
        <Layer position="top-right" onClickOutside={onClose}>
          <MyCart closeCart={onClose} />
        </Layer>
      )}
    </StyledHeader>
  );
};

export default Header;
