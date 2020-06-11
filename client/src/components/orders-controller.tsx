import React, { useContext } from "react";
import { Box, Grid, ResponsiveContext, Heading, Button } from "grommet";
import OrderList from "../components/orders-list";
import SearchBar from "./search-bar";

interface StatusResponse {
  status: "hidden" | "error" | "success";
  message: string;
}

interface IProps {
  orders: any | null;
  adminControls: boolean;
  updateStatus?: (order: any) => void;
  searchLogic: (input: string, cb: (shouldClear: boolean) => void) => void;
  searchStatus?: StatusResponse;
  resetOrders: () => void;
}

const OrdersController = (props: IProps) => {
  const {
    orders,
    adminControls,
    updateStatus,
    searchLogic,
    searchStatus,
    resetOrders,
  } = props;

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
        <>
          <Box
            direction="row"
            style={{
              position: "relative",
              marginBottom: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              primary
              style={{
                padding: ".2rem .8rem",
                margin: "0 .2rem 0 0",
              }}
              onClick={() => resetOrders()}
            >
              {size === "small" ? "X" : "Reset"}
            </Button>
            <SearchBar
              searchLogic={searchLogic}
              placeholder="Search by order-id"
            />
            {searchStatus && searchStatus.status === "error" ? (
              <span
                style={{
                  position: "absolute",
                  bottom: "-1rem",
                  minWidth: "60%",
                  textAlign: "center",
                  backgroundColor: "#F55448",
                  color: "white",
                  borderRadius: ".2rem",
                  padding: ".2rem 1rem",
                  margin: "0",
                }}
              >
                {searchStatus.message}
              </span>
            ) : searchStatus && searchStatus.status === "success" ? (
              <span
                style={{
                  position: "absolute",
                  bottom: "-1rem",
                  textAlign: "center",
                  backgroundColor: "#3CB371",
                  color: "white",
                  borderRadius: "1rem",
                  padding: ".2rem 1rem",
                  margin: "0",
                }}
              >
                {searchStatus.message}
              </span>
            ) : null}
          </Box>
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
        </>
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
