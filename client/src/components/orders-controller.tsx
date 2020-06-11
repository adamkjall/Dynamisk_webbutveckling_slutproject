import React, { useContext } from "react";
import { Box, Grid, ResponsiveContext, Heading } from "grommet";
import OrderList from "../components/orders-list";

interface IProps {
  orders: any | null;
  adminControls: boolean;
  updateStatus?: (order: any) => void;
}

const OrdersController = (props: IProps) => {
  const { orders, adminControls, updateStatus } = props;

  const size = useContext(ResponsiveContext) as
    | "small"
    | "medium"
    | "large"
    | "xlarge";

  const columns = {
    small: ["auto"],
    medium: ["xsmall", "auto", "xsmall"],
    large: ["small", "auto", "small"],
    xlarge: ["small", "auto", "small"],
  };

  const rows = {
    small: ["auto"],
    medium: ["auto"],
    large: ["auto"],
    xlarge: ["auto"],
  };

  const areas = {
    small: [{ name: "main", start: [0, 0], end: [0, 0] }],
    medium: [
      { name: "main", start: [1, 0], end: [1, 0] },
      { name: "left", start: [0, 0], end: [0, 0] },
      { name: "right", start: [2, 0], end: [2, 0] },
    ],
    large: [
      { name: "main", start: [1, 0], end: [1, 0] },
      { name: "left", start: [0, 0], end: [0, 0] },
      { name: "right", start: [2, 0], end: [2, 0] },
    ],
    xlarge: [
      { name: "main", start: [1, 0], end: [1, 0] },
      { name: "left", start: [0, 0], end: [0, 0] },
      { name: "right", start: [2, 0], end: [2, 0] },
    ],
  };

  const mainSection = (
    <OrderList
      key="0"
      updateStatus={updateStatus}
      adminControls={adminControls}
      gridArea="main"
      orders={orders}
      size={size}
    />
  );
  const leftSection = <Box key="1" gridArea="left" />;
  const rightSection = <Box key="2" gridArea="right" />;

  const components = {
    small: [mainSection],
    medium: [mainSection, leftSection, rightSection],
    large: [mainSection, leftSection, rightSection],
    xlarge: [mainSection, leftSection, rightSection],
  };

  return (
    <>
      {orders ? (
        <Grid
          fill
          responsive={true}
          rows={rows[size]}
          columns={columns[size]}
          gap="medium"
          areas={areas[size]}
          style={{
            overflowY: "scroll",
          }}
        >
          {components[size]}
        </Grid>
      ) : (
        <Heading level="3" alignSelf="center">
          {" "}
          Loading your orders...{" "}
        </Heading>
      )}
    </>
  );
};

export default OrdersController;
