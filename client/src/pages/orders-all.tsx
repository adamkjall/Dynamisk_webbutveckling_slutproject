import React, { useState, useEffect } from "react"
import { Main, Heading } from "grommet"
import useFetch from "../hooks/useFetch"
import OrdersController from "../components/orders-controller"
import { 
    updateOrderStatus, 
    getAllOrdersAdmin, 
    findOrderById 
} from "../api-utils"

interface StatusResponse {
    status: "hidden" | "error" | "success"
    message: string
}

const OrdersAll = () => {
    let {
        response: orders,
        loading,
    } = useFetch(
        `http://localhost:8080/api/orders`,
        { credentials: "include" },
        []
    )

    const [allOrders, setAllOrders] = useState(null)
    const [searchStatus, setSearchStatus] = useState({
        status: "hidden",
        message: ""
    } as StatusResponse)

    useEffect(() => {
        setAllOrders(orders)
    }, [orders])

    const updateStatus = async (order) => {
        const newStatus = {
            ...order,
            orderStatus: !order.orderStatus
        }
        const result = await updateOrderStatus(newStatus)
        if (result.status === "error") {
            console.log(result);
        } else {
            updateOrdersInState(order, result)
        }
    }

    const searchForOrders = async (input, clear) => {
        if (input) {
            const res = await findOrderById(input)
            if (!(res.status === "error")) {
                setAllOrders([res])
                clear(true)
                setSearchStatus({
                    status: "success",
                    message: `Order: ${res._id}`
                })
            } else {
                setSearchStatus({
                    status: "error",
                    message: "Couldn't find your order"
                }) 
            }
        }
    }

    const updateOrdersInState = (order, newOrder) => {
        const orderIndex = allOrders.findIndex(o => o._id === order._id)
        if (orderIndex !== -1) {
            const newOrders = [...allOrders]
            newOrders.splice(orderIndex, 1, newOrder)
            setAllOrders(newOrders)
        }
    }

    const resetOrdersInState = async () => {
        const res = await getAllOrdersAdmin()
        if(!(res.status === "error")) {
            setAllOrders(res)
            setSearchStatus({
                status: "hidden",
                message: ""
            }) 
        } else {
            console.log(res);   
        }
    }

    return (
        <Main>
            <Heading alignSelf="center" level="1"> All orders (admin) </Heading>
            <OrdersController 
                searchLogic={searchForOrders} 
                searchStatus={searchStatus}
                resetOrders={resetOrdersInState}
                updateStatus={updateStatus} 
                adminControls={true} 
                orders={allOrders} 
            />
        </Main>
    )
}

export default OrdersAll