import React from "react"
import { Box, Text, Grid, Heading, Button } from "grommet"
import CartItems from "./cart-items"
import styled from "styled-components"

const StyledDeliveryButton = styled(Button) `
    width: 100%;
    max-width: 30rem;
    align-self: center;
`

interface IProps {
    order: any
    size: "small" | "medium" | "large" | "xlarge"
    adminControls: boolean
    updateStatus?: (order: any) => void
}

const columns = {
    small: ["flex"],
    medium: ["flex"],
    large: ["flex"],
    xlarge: ["medium", "auto"],
}

const rows = {
    small: ["auto", "auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto"],
}

const areas = {
    small: [
        { name: "info", start: [0, 0], end: [1, 0] },
        { name: "products", start: [0, 1], end: [0, 1] },
    ],
    medium: [
        { name: "info", start: [0, 0], end: [1, 0] },
        { name: "products", start: [0, 1], end: [0, 1] },
    ],
    large: [
        { name: "info", start: [0, 0], end: [1, 0] },
        { name: "products", start: [0, 1], end: [0, 1] },
    ],
    xlarge: [
        { name: "info", start: [0, 0], end: [0, 0] },
        { name: "products", start: [1, 0], end: [1, 0] },
    ],
}

const getPaymentFee = (fee) => {
    let sanitizedFee
    if (fee === 0) {
        sanitizedFee = "None"
    } else {
        sanitizedFee = `$${fee}`
    }
    return sanitizedFee
}

// const updateDelivery = (order) => {
//     console.log(order);
//     console.log("hello");
    
// }

const recieverInfo = (order) => {
    return (
        <Box
            key={`recinfo-${order._id}`}
            gridArea="reciever"
            background="light-2"
            pad="small"
        >
            <Heading level="4" margin="xxsmall">Reciever</Heading>
            <Text>{`${order.user.firstName} ${order.user.lastName}`}</Text>
            <Text>{`${order.toAddress}, ${order.toZipCode} ${order.toCity}`}</Text>
        </Box>
    )
}

const deliveryInfo = (order) => {
    return (
        <Box
            key={`delinfo-${order._id}`}
            gridArea="delivery"
            background="light-2"
            pad="small"
        >
            <Heading level="4" margin="xxsmall">Delivery</Heading>
            <Text>{`${order.shippingMethod.desc}`}</Text>
            <Text>{`Method: ${order.shippingMethod.type}, ${order.shippingMethod.company}`}</Text>
            <Text>{`Delivery time: ${order.shippingMethod.deliveryTime} days`}</Text>
        </Box>
    )
}

const paymentInfo = (order) => {
    return (
        <Box
            key={`payinfo-${order._id}`}
            gridArea="payment"
            background="light-2"
            pad="small"
        >
            <Heading level="4" margin="xxsmall">Payment</Heading>
            <Text>{`Paid by: ${order.paymentMethod.type}`}</Text>
            <Text>{`Additional fee: ${getPaymentFee(order.paymentMethod.price)}`}</Text>
        </Box>
    )
}

const infoColumns = {
    small: ["auto"],
    medium: ["1/3", "1/3", "1/3"],
    large: ["1/3", "1/3", "1/3"],
    xlarge: ["auto"],
}

const infoRows = {
    small: ["auto", "auto", "auto"],
    medium: ["auto"],
    large: ["auto"],
    xlarge: ["auto", "auto", "auto"],
}

const infoAreas = {
    small: [
        { name: "reciever", start: [0, 0], end: [0, 0] },
        { name: "delivery", start: [0, 1], end: [0, 1] },
        { name: "payment", start: [0, 2], end: [0, 2] },
    ],
    medium: [
        { name: "reciever", start: [0, 0], end: [0, 0] },
        { name: "delivery", start: [1, 0], end: [1, 0] },
        { name: "payment", start: [2, 0], end: [2, 0] },
    ],
    large: [
        { name: "reciever", start: [0, 0], end: [0, 0] },
        { name: "delivery", start: [1, 0], end: [1, 0] },
        { name: "payment", start: [2, 0], end: [2, 0] },
    ],
    xlarge: [
        { name: "reciever", start: [0, 0], end: [0, 0] },
        { name: "delivery", start: [0, 1], end: [0, 1] },
        { name: "payment", start: [0, 2], end: [0, 2] },
    ],
}

const infoSection = (order, size) => {
    const infoComponents = {
        small: [recieverInfo(order), deliveryInfo(order), paymentInfo(order)],
        medium: [recieverInfo(order), deliveryInfo(order), paymentInfo(order)],
        large: [recieverInfo(order), deliveryInfo(order), paymentInfo(order)],
        xlarge: [recieverInfo(order), deliveryInfo(order), paymentInfo(order)],
    }
    return (
        <Grid
            key={`infoSection-${order._id}`}
            fill
            responsive={true}
            rows={infoRows[size]}
            columns={infoColumns[size]}
            areas={infoAreas[size]}
        >
            {infoComponents[size]}
        </Grid>
    )
}
const productSection = (order) => {
    return (
        <Box
            key={`productSection-${order._id}`}
            pad="small"
            background="light-2"
        >
            <CartItems locked={true} productsArray={order.products} />
        </Box>
    )
}

const OrderCard = (props: IProps) => {
    const { order, size, adminControls, updateStatus } = props
    const components = {
        small: [infoSection(order, size), productSection(order)],
        medium: [infoSection(order, size), productSection(order)],
        large: [infoSection(order, size), productSection(order)],
        xlarge: [infoSection(order, size), productSection(order)]
    }

    return (
        <>
            {
                (adminControls && updateStatus) &&
                <StyledDeliveryButton 
                    margin="small" 
                    primary 
                    label={
                        order.orderStatus 
                        ? "Undo delivery"
                        : "Mark as delivered"
                    } 
                    color=""
                    onClick={() => updateStatus(order)}
                />
            }
            <Grid
                fill
                responsive={true}
                rows={rows[size]}
                columns={columns[size]}
                areas={areas[size]}
                margin={{
                    "bottom": ".6rem"
                }}
            >
                {components[size]}
            </Grid>
        </>
    )
}

export default OrderCard

