import React, { useContext } from "react";
import CartContext from "../contexts/cart-context/context";

import {
  Box,
  Form,
  RadioButtonGroup,
  Text,
  Table,
  TableCell,
  TableBody,
  TableRow,
  ResponsiveContext
} from "grommet";

interface IProps {}

const ShippingForm = (props: IProps) => {
  const { shippingMethod, setShippingMethod, shippingCost } = useContext(
    CartContext
  );

  const getDeliveryDate = () => {
    const date = new Date();
    switch (shippingMethod) {
      case "postNord":
        date.setHours(date.getHours() + 72);
        break;
      case "dhl":
        date.setHours(date.getHours() + 6);
        break;
      default:
        date.setHours(date.getHours() + 36);
    }
    return date.toLocaleDateString();
  };

  return (
    <Form style={{ gridArea: "name" }}>
      <Text weight="bold" alignSelf="start">
        Choose your prefered delivery partner{" "}
      </Text>
      <Box align="center" pad="medium">
        <ResponsiveContext.Consumer>
          {responsive =>
            responsive === "small" ? (
              <RadioButtonGroup
                direction="column"
                name="radio"
                options={[
                  { label: "PostNord (72h)", value: "postNord" },
                  { label: "Schenker (36h)", value: "schenker" },
                  { label: "DHL Express (6h)", value: "dhl" }
                ]}
                value={shippingMethod}
                onChange={event => {
                  const method: any = event.target.value;
                  setShippingMethod(method);
                }}
                {...props}
              />
            ) : (
              <RadioButtonGroup
                direction="row"
                name="radio"
                options={[
                  { label: "PostNord (72h)", value: "postNord" },
                  { label: "Schenker (36h)", value: "schenker" },
                  { label: "DHL Express (6h)", value: "dhl" }
                ]}
                value={shippingMethod}
                onChange={event => {
                  const method: any = event.target.value;
                  setShippingMethod(method);
                }}
                {...props}
              />
            )
          }
        </ResponsiveContext.Consumer>
      </Box>
      <Table margin="0">
        <TableBody>
          <TableRow>
            <TableCell scope="row">
              <Text>Delivery cost:</Text>
            </TableCell>
            <TableCell>
              <strong>${shippingCost}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">
              <Text>Delivery date:</Text>
            </TableCell>
            <TableCell>
              <strong>{getDeliveryDate().toLocaleString()}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Form>
  );
};

export default ShippingForm;
