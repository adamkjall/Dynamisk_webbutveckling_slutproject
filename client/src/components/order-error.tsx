import React from "react";

import { Box, Button, Heading } from "grommet";
import { Close } from "grommet-icons";

import styled from "styled-components";

interface ErrorResponse {
  status: boolean;
  message: string;
}

interface IProps {
  closeModal: (error: boolean) => void;
  error: ErrorResponse;
}

const OrderError = (props: IProps) => {
  const { closeModal, error } = props;

  return (
    <Box background="light-3" alignSelf="center" pad="large">
      <Button
        primary
        alignSelf="end"
        icon={<Close />}
        onClick={() => closeModal(error.status)}
        color="light-3"
      />
      <Heading level="2">Unable to carry through order</Heading>
      <StyledGrid>
        <span>{error.message}</span>
      </StyledGrid>
      <Button
        primary
        margin="medium"
        onClick={() => closeModal(error.status)}
        label="Close"
      />
    </Box>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: "1fr" "1fr";
`;

export default OrderError;
