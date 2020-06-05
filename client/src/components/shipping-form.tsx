import React, { useContext } from "react";

import {
  Box,
  Form,
  RadioButtonGroup,
  Text,
  Table,
  TableCell,
  TableBody,
  TableRow,
  ResponsiveContext,
} from "grommet";

import CartContext, { ShippingMethod } from "../contexts/cart-context/context";

interface IProps {}

const ShippingForm = (props: IProps) => {
  const { shippingMethod, setShipping, shippingMethods } = useContext(
    CartContext
  );

  const getDeliveryDate = () => {
    const date = new Date();
    date.setHours(date.getHours() + shippingMethod.deliveryTime * 24);
    return date.toLocaleDateString();
  };

  const transformMethodsToGrommetRadioButton = () => {
    return shippingMethods.map((method) => ({
      label: method.company + " (" + method.deliveryTime * 24 + "h)",
      value: method.company,
    }));
  };

  return (
    <Form style={{ gridArea: "name" }}>
      <Text weight="bold" alignSelf="start">
        Choose your prefered delivery partner{" "}
      </Text>
      <Box align="center" pad="medium">
        <ResponsiveContext.Consumer>
          {(responsive) =>
            responsive === "small" ? (
              <RadioButtonGroup
                direction="column"
                name="radio"
                options={transformMethodsToGrommetRadioButton()}
                value={shippingMethod.company}
                onChange={(e) => {
                  setShipping(
                    shippingMethods.find(
                      (method) => method.company === e.target.value
                    )
                  );
                }}
              />
            ) : (
              <RadioButtonGroup
                direction="row"
                name="radio"
                options={transformMethodsToGrommetRadioButton()}
                value={shippingMethod.company}
                onChange={(e) => {
                  setShipping(
                    shippingMethods.find(
                      (method) => method.company === e.target.value
                    )
                  );
                }}
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
              <strong>${shippingMethod.price}</strong>
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
