import React, { useState, useEffect } from "react";
import { Main, Heading } from "grommet";
import useFetch from "../hooks/useFetch";
import OrdersController from "../components/orders-controller";
import { updateOrderStatus } from "../api-utils";

const OrdersAll = () => {
  let { response: orders } = useFetch(
    `http://localhost:8080/api/orders`,
    { credentials: "include" },
    []
  );

  const [allOrders, setAllOrders] = useState(null);

  useEffect(() => {
    setAllOrders(orders);
  }, [orders]);

  const updateStatus = async (order) => {
    const newStatus = {
      ...order,
      orderStatus: !order.orderStatus,
    };
    const result = await updateOrderStatus(newStatus);
    if (result.status === "error") {
      console.log(result);
    } else {
      updateOrdersInState(order, result);
    }
  };

  const updateOrdersInState = (order, newOrder) => {
    const orderIndex = allOrders.findIndex((o) => o._id === order._id);
    if (orderIndex !== -1) {
      const newOrders = [...allOrders];
      newOrders.splice(orderIndex, 1, newOrder);
      setAllOrders(newOrders);
    }
  };

  return (
    <Main>
      <Heading alignSelf="center" level="1">
        {" "}
        All orders (admin){" "}
      </Heading>
      <OrdersController
        updateStatus={updateStatus}
        adminControls={true}
        orders={allOrders}
      />
    </Main>
  );
};

export default OrdersAll;
