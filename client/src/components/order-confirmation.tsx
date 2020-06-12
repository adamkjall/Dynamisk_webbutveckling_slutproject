import React, { useContext } from "react";

import { Box, Button } from "grommet";
import { Close } from "grommet-icons";

import CartContext from "../contexts/cart-context/context";

import styled from "styled-components";

interface ErrorResponse {
  status: boolean
  message: string
}

interface IProps {
  closeModal: (error: boolean) => void;
  error: ErrorResponse
  order: any
}

const OrderConfirmation = (props: IProps) => {
  const { closeModal, error, order } = props
  const { cart, shippingMethod, paymentMethod, totalWithVat } = useContext(
    CartContext
  );

  return (
    <Box background="light-3" pad="large">
      <Button
        primary
        alignSelf="end"
        icon={<Close />}
        onClick={() => closeModal(error.status)}
        color="light-3"
      />
      <h1>Order confirmation</h1>
      <h3>Order nr: {order._id}</h3>
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
        <StyledItemRow key={product._id + "-" + product.selectedSize}>
          <span>{product.title}</span>
          <span>${product.price + " x " + product.quantity}</span>
        </StyledItemRow>
      ))}

      <h4>Total: ${totalWithVat() + shippingMethod.price}</h4>

      <Button primary margin="medium" onClick={() => closeModal(error.status)} label="Okay" />
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
