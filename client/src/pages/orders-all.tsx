import React from "react"
import { Main, Heading } from "grommet"
import useFetch from "../hooks/useFetch"
import OrdersController from "../components/orders-controller"

const OrdersAll = () => {
    let {
        response: orders,
        loading,
    } = useFetch(
        `http://localhost:8080/api/orders`,
        { credentials: "include" },
        []
    )

    return (
        <Main>
            <Heading alignSelf="center" level="1"> All orders (admin) </Heading>
            <OrdersController adminControls={true} orders={orders} />
        </Main>
    )
}

export default OrdersAll