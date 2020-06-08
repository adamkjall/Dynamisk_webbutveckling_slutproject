import React from "react"
import { Box, Text, Grid, Heading } from "grommet"

interface IProps {
    order: any
    size: "small" | "medium" | "large" | "xlarge"
}

const columns = {
    small: ["flex"],
    medium: ["flex"],
    large: ["medium", "auto"],
    xlarge: ["medium", "auto"],
}

const rows = {
    small: ["auto", "medium"],
    medium: ["auto", "medium"],
    large: ["auto"],
    xlarge: ["auto"],
}

const areas = {
    small: [
        { name: "info", start: [0, 0], end: [1, 0] },
        { name: "products", start: [0, 1], end: [1, 1] },
    ],
    medium: [
        { name: "info", start: [0, 0], end: [1, 0] },
        { name: "products", start: [0, 1], end: [1, 1] },
    ],
    large: [
        { name: "info", start: [0, 0], end: [0, 0] },
        { name: "products", start: [1, 0], end: [1, 0] },
    ],
    xlarge: [
        { name: "info", start: [0, 0], end: [0, 0] },
        { name: "products", start: [1, 0], end: [1, 0] },
    ],
}

const getPaymentFee = (fee) => {
    let sanitizedFee = fee
    if (sanitizedFee === 0) {
        sanitizedFee = "None"
    } else {
        sanitizedFee += ":-"
    }
    return sanitizedFee
}

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
    large: ["auto"],
    xlarge: ["auto"],
}

const infoRows = {
    small: ["auto", "auto", "auto"],
    medium: ["auto"],
    large: ["auto", "auto", "auto"],
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
        { name: "delivery", start: [0, 1], end: [0, 1] },
        { name: "payment", start: [0, 2], end: [0, 2] },
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
            gap="small"
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
            background="light-2"
        ></Box>
    )
}

const OrderCard = (props: IProps) => {
    const { order, size } = props
    const components = {
        small: [infoSection(order, size), productSection(order)],
        medium: [infoSection(order, size), productSection(order)],
        large: [infoSection(order, size), productSection(order)],
        xlarge: [infoSection(order, size), productSection(order)]
    }

    return (
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
    )
}

export default OrderCard

