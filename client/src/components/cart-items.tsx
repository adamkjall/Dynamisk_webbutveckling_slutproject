import React, { useContext } from "react";

import {
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Image,
  Box,
  ResponsiveContext,
} from "grommet";
import { Close, AddCircle, SubtractCircle } from "grommet-icons";

import CartContext from "../contexts/cart-context/context";

import { Product } from "../shop.data";

interface Props {
  locked?: boolean; // prohibit any change to the cart items
}

const CartItems = ({ locked = false }: Props) => {
  const {
    cart,
    removeItemFromCart,
    addItemToCart,
    clearItemFromCart,
    shippingCost,
  } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

  const calculateTotal = () => {
    let total: number = 0;

    for (let i = 0; i < cart.length; i++) {
      // const quantity = cart[i].quantity || 1;
      const quantity = 1;
      total += cart[i].price * quantity;
    }

    return total + shippingCost;
  };

  const calculateVat = () => {
    let total = calculateTotal();
    let vat = total * 0.25;

    return vat;
  };

  return (
    <Box responsive>
      <Table>
        <TableHeader>
          <TableRow>
            {responsive !== "small" ? (
              <TableCell scope="col" border="bottom"></TableCell>
            ) : null}
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom">
              Price
            </TableCell>
            {!locked && (
              <>
                <TableCell scope="col" border="bottom">
                  Quantity
                </TableCell>
                <TableCell scope="col" border="bottom"></TableCell>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: Product) => (
            <TableRow key={item._id}>
              {responsive !== "small" ? (
                <TableCell>
                  <Image src={item.image} style={{ width: "4rem" }}></Image>
                </TableCell>
              ) : null}
              <TableCell>{item.title}</TableCell>
              <TableCell>${item.price}</TableCell>
              {!locked && (
                <>
                  <TableCell flex direction="row" align="center">
                    {2 > 1 ? ( // todo check if quantity is greater than 1
                      <Button
                        icon={<SubtractCircle />}
                        style={{
                          padding:
                            responsive === "small" ? "0 0.2rem" : "0 0.4rem",
                        }}
                        onClick={() => removeItemFromCart(item._id)}
                      />
                    ) : (
                      <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}</div>
                      // "\u00a0\u00a0" // for empty space
                    )}
                    <span>{1}</span> {/* item.quantity */}
                    <Button
                      size="small"
                      style={{
                        padding:
                          responsive === "small" ? "0 0.2rem" : "0 0.4rem",
                      }}
                      icon={<AddCircle />}
                      onClick={() => addItemToCart(item)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      style={{
                        padding: responsive === "small" ? "0" : "0",
                      }}
                      onClick={() => clearItemFromCart(item._id)}
                      icon={<Close />}
                    />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell scope="row">Shipping</TableCell>
            <TableCell>${shippingCost}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell scope="row">
              <strong>Total</strong>
            </TableCell>
            <TableCell>
              <strong>${calculateTotal()}</strong>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell scope="row">
              <em>VAT included</em>
            </TableCell>
            <TableCell>
              <em>${calculateVat()}</em>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default CartItems;
