import React, { useState, useEffect, useContext } from "react";
import { Main, Heading } from "grommet";
import useFetch from "../hooks/useFetch";
import OrdersController from "../components/orders-controller";
import AuthenticationContext from "../contexts/authentication-context/context";
import { getAllOrdersUser } from "../api-utils";

interface StatusResponse {
  status: "hidden" | "error" | "success";
  message: string;
}

const OrdersUser = () => {
  const { user } = useContext(AuthenticationContext);
  let { response: orders } = useFetch(
    `http://localhost:8080/api/orders/user/${user._id}`,
    { credentials: "include" },
    []
  );

  const [allOrders, setAllOrders] = useState(null);
  const [searchStatus, setSearchStatus] = useState({
    status: "hidden",
    message: "",
  } as StatusResponse);

  useEffect(() => {
    setAllOrders(orders);
  }, [orders]);

  const searchForOrders = (input, clear) => {
    if (input) {
      const findOrder = orders.filter((order) => order._id === input);
      if (findOrder.length !== 0) {
        setAllOrders(findOrder);
        clear(true);
        setSearchStatus({
          status: "success",
          message: `Order: ${findOrder[0]._id}`,
        });
      } else {
        setSearchStatus({
          status: "error",
          message: "Couldn't find your order",
        });
      }
    }
  };

  const resetOrdersInState = async () => {
    const res = await getAllOrdersUser(user._id);
    if (!(res.status === "error")) {
      setAllOrders(res);
      setSearchStatus({
        status: "hidden",
        message: "",
      });
    } else {
      console.log(res);
    }
  };

  return (
    <Main>
      <Heading alignSelf="center" level="1">
        {" "}
        Your orders{" "}
      </Heading>
      <OrdersController
        searchStatus={searchStatus}
        searchLogic={searchForOrders}
        resetOrders={resetOrdersInState}
        adminControls={false}
        orders={allOrders}
      />
    </Main>
  );
};

export default OrdersUser;
