import React, { useContext } from "react";

import { Box, Button } from "grommet";
import { Close } from "grommet-icons";

import CartContext from "../contexts/cart-context/context";
import { IProduct } from "./product";

import styled from "styled-components";

interface IProps {
  closeModal: () => void;
}

const OrderConfirmation = (props: IProps) => {
  const {
    cart,
    shippingMethod,
    paymentMethod,
    totalWithVat,
    getProductQuantity,
  } = useContext(CartContext);

  return (
    <Box background="light-3" pad="large">
      <Button
        primary
        alignSelf="end"
        icon={<Close />}
        onClick={props.closeModal}
        color="light-3"
      />
      <h1>Order confirmation</h1>
      <h3>Order nr: {Math.floor(new Date().getTime() / 10000)}</h3>
      <StyledGrid>
        <span>Paying with: </span>
        <span>{paymentMethod.type}</span>
        <span>Shipping with: </span>
        <span>{shippingMethod.company}</span>
        <span>Estimated delivery: </span>
        <span>{new Date().toLocaleString()}</span>
      </StyledGrid>
      <h4>Items</h4>

      {cart.map((product) => (
        <StyledItemRow key={product._id}>
          <span>{product.title}</span>
          <span>${product.price + " x " + getProductQuantity(product)}</span>
        </StyledItemRow>
      ))}

      <h4>Total: ${totalWithVat() + shippingMethod.price}</h4>

      <Button primary margin="medium" onClick={props.closeModal} label="Okay" />
    </Box>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: "1fr" "1fr";
`;

const StyledItemRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default OrderConfirmation;
