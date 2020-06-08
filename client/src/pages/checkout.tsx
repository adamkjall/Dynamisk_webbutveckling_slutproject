import React, { useContext } from "react";

import { Grid, Box, Image, ResponsiveContext, Main } from "grommet";

import CheckoutForm from "../components/checkout-form";

import CartContext from "../contexts/cart-context/context"
import CartItems from "../components/cart-items";

import clothesOnRackImg from "../assets/images/clothesonrack.jpg";

const Checkout = () => {
  const { cart } = useContext(CartContext)
  const noDuplicateProducts = Array.from(new Set(cart))
  const size = useContext(ResponsiveContext) as
    | "small"
    | "medium"
    | "large"
    | "xlarge";

  const columns = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"],
  };

  const rows = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"],
  };

  const areas = {
    small: [{ name: "checkout-form", start: [0, 0], end: [0, 0] }],
    medium: [
      { name: "checkout-form", start: [0, 0], end: [0, 1] },
      { name: "cart", start: [1, 0], end: [1, 0] },
      { name: "image", start: [1, 1], end: [1, 1] },
    ],
    large: [
      { name: "checkout-form", start: [0, 0], end: [0, 1] },
      { name: "cart", start: [1, 0], end: [1, 0] },
      { name: "image", start: [1, 1], end: [1, 1] },
    ],
    xlarge: [
      { name: "checkout-form", start: [0, 0], end: [0, 1] },
      { name: "cart", start: [1, 0], end: [1, 0] },
      { name: "image", start: [1, 1], end: [1, 1] },
    ],
  };

  const checkoutForm = <CheckoutForm key="0" />;

  const cartSection = (
    <Box
      gridArea="cart"
      round="small"
      background="light-2"
      key="1"
      style={{ overflowY: "scroll" }}
    >
      <CartItems locked={true} productsArray={noDuplicateProducts} />
    </Box>
  );

  const checkOutImage = (
    <Box gridArea="image" round="small" key="2">
      <Image
        src={clothesOnRackImg}
        alt="shirts"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
      />
    </Box>
  );

  const components = {
    small: [checkoutForm],
    medium: [checkoutForm, cartSection, checkOutImage],
    large: [checkoutForm, cartSection, checkOutImage],
    xlarge: [checkoutForm, cartSection, checkOutImage],
  };

  return (
    <Main pad="medium">
      <Grid
        rows={rows[size]}
        columns={columns[size]}
        gap="small"
        areas={areas[size]}
        fill="vertical"
      >
        {components[size]}
      </Grid>
    </Main>
  );
};

export default Checkout;
