import React, { useState } from "react"
import { Accordion, AccordionPanel, Box, Text, Heading } from "grommet"
import OrderCard from "./order-card"


interface IProps {
    orders: any | null
    gridArea: string
    size: "small" | "medium" | "large" | "xlarge"
}

const getOrderStatus = (orderStatus) => {
    let status = "Not sent"
    if (orderStatus) {
        status = "Send"
    }
    return status
}

const getOrderDate = (timeStamp) => {
    const date = new Date(timeStamp)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

const boxMargins = {
    small: {
        "vertical": ".5rem",
        "horizontal": "1rem"
    },
    medium: {
        "vertical": "1rem",
        "horizontal": "1.5rem"
    },
    large: {
        "vertical": "1rem",
        "horizontal": "1.5rem"
    },
    xlarge: {
        "vertical": "1rem",
        "horizontal": "1.5rem"
    },
}

const OrderList = (props: IProps) => {
    const {orders, gridArea, size} = props

    return (
        (!orders)
            ? null
            : <Accordion 
                gridArea={gridArea}
                margin={{
                    "horizontal": ".8rem"
                }}
            >
                {orders.map((order) =>
                    <AccordionPanel
                        key={`Item-${order._id}`}
                        header={
                            <Box
                                gap="small"
                                margin={boxMargins[size]}
                            >
                                <Heading level="3" margin="xxsmall">
                                    {`Order: ${order._id}`}
                                </Heading>
                                <Text size="medium">
                                    {`Order placed: ${getOrderDate(order.timeStamp)}`}
                                </Text>
                                <Text size="medium">
                                    {`Status: ${getOrderStatus(order.orderStatus)}`}
                                </Text>
                            </Box>
                        }
                    >
                        <OrderCard order={order} size={size} />
                    </AccordionPanel>
                )}
            </Accordion>
    )
}

export default OrderList