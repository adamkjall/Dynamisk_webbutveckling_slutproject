import React from "react";
import { Accordion, AccordionPanel, Box, Text, Heading } from "grommet";
import OrderCard from "./order-card";
import styled from "styled-components";

const DeliveredText = styled(Text)`
  padding: 0 0.2rem;
  color: white;
  background: #3cb371;
`;

interface IProps {
  orders: any | null;
  gridArea: string;
  size: "small" | "medium" | "large" | "xlarge";
  adminControls: boolean;
  updateStatus?: (order: any) => void;
}

const getOrderStatus = (orderStatus) => {
  return (
    <Box direction="row">
      <Text>Status:&nbsp;</Text>
      {orderStatus ? (
        <DeliveredText>Delivered</DeliveredText>
      ) : (
        <Text>Not delivered</Text>
      )}
    </Box>
  );
};

const getOrderDate = (timeStamp) => {
  const date = new Date(timeStamp);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

const boxMargins = {
  small: {
    vertical: ".5rem",
    horizontal: "1rem",
  },
  medium: {
    vertical: "1rem",
    horizontal: "1.5rem",
  },
  large: {
    vertical: "1rem",
    horizontal: "1.5rem",
  },
  xlarge: {
    vertical: "1rem",
    horizontal: "1.5rem",
  },
};

const OrderList = (props: IProps) => {
  const { orders, gridArea, size, adminControls, updateStatus } = props;

  return (
    <>
      {!orders ? null : orders.status === "error" ? (
        <Heading level="3" alignSelf="center">
          {" "}
          Couldn't find any orders!{" "}
        </Heading>
      ) : (
        <Accordion
          gridArea={gridArea}
          margin={{
            horizontal: ".8rem",
          }}
        >
          {orders.map((order) => (
            <AccordionPanel
              key={`Item-${order._id}`}
              header={
                <Box gap="small" margin={boxMargins[size]}>
                  <Heading level="3" margin="xxsmall">
                    {`Order: ${order._id}`}
                  </Heading>
                  <Text size="medium">
                    {`Order placed: ${getOrderDate(order.timeStamp)}`}
                  </Text>
                  {getOrderStatus(order.orderStatus)}
                </Box>
              }
            >
              <OrderCard
                adminControls={adminControls}
                updateStatus={updateStatus}
                order={order}
                size={size}
              />
            </AccordionPanel>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default OrderList;
