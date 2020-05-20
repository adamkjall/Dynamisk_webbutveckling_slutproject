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
  ResponsiveContext
} from "grommet";
import { Close, AddCircle, SubtractCircle } from "grommet-icons";
import CartContext from "../contexts/cart-context/context";
import { CollectionItem } from "../shop.data";

const CartItems = () => {
  const {
    cart,
    removeItemFromCart,
    addItemToCart,
    clearItemFromCart,
    shippingCost
  } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

  const calculateTotal = () => {
    let total: number = 0;

    for (let i = 0; i < cart.length; i++) {
      const quantity = cart[i].quantity || 1;
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
            <TableCell scope="col" border="bottom">
              Quantity
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CollectionItem) => (
            <TableRow key={item.id}>
              {responsive !== "small" ? (
                <TableCell>
                  <Image src={item.imageUrl} style={{ width: "4rem" }}></Image>
                </TableCell>
              ) : null}
              <TableCell scope="row">{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell flex direction="row" align="center" size="xxsmall">
                {item.quantity && item.quantity > 1 ? (
                  <Button
                    icon={<SubtractCircle />}
                    style={{
                      padding: responsive === "small" ? "0.2rem" : "0.4rem"
                    }}
                    onClick={() => removeItemFromCart(item.id)}
                  />
                ) : (
                  <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}</div>
                  // "\u00a0\u00a0" // for empty space
                )}
                <span>{item.quantity}</span>
                <Button
                  size="small"
                  style={{
                    padding: responsive === "small" ? "0.2rem" : "0.4rem"
                  }}
                  icon={<AddCircle />}
                  onClick={() => addItemToCart(item)}
                />
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  style={{
                    padding: responsive === "small" ? "0.2rem" : "0.4rem"
                  }}
                  onClick={() => clearItemFromCart(item.id)}
                  icon={<Close />}
                />
              </TableCell>
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
