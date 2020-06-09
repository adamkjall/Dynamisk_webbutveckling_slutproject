import React, { useContext } from "react"
import { Main, Heading } from "grommet"
import useFetch from "../hooks/useFetch"
import OrdersController from "../components/orders-controller"
import AuthenticationContext from "../contexts/authentication-context/context"

const OrdersUser = () => {
    const { user } = useContext(AuthenticationContext)
    let {
        response: orders,
        loading,
    } = useFetch(
        `http://localhost:8080/api/orders/user/${user._id}`,
        { credentials: "include" },
        []
    )

    return (
        <Main>
            <Heading alignSelf="center" level="1"> Your orders </Heading>
            <OrdersController adminControls={false} orders={orders} />
        </Main>
    )
}

export default OrdersUser