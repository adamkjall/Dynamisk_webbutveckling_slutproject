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
import { IProduct } from "./product";

interface Props {
  locked?: boolean; // lock cart from changes
}

const CartItems = ({ locked = false }: Props) => {
  const {
    cart,
    removeItemFromCart,
    addItemToCart,
    clearItemFromCart,
    shippingMethod,
    getProductQuantity,
    calcCartTotal,
    totalWithVat,
  } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

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
          {/* Removes duplicate products */}
          {Array.from(new Set(cart)).map((product) => (
            <TableRow key={product._id + "-" + product.selectedSize}>
              {responsive !== "small" ? (
                <TableCell>
                  <Image
                    src={`${product.imageURL}`}
                    style={{ width: "4rem" }}
                  ></Image>
                </TableCell>
              ) : null}
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price}</TableCell>
              {!locked && (
                <>
                  <TableCell flex direction="row" align="center">
                    {getProductQuantity(product) > 1 ? (
                      <Button
                        icon={<SubtractCircle />}
                        style={{
                          padding:
                            responsive === "small" ? "0 0.2rem" : "0 0.4rem",
                        }}
                        onClick={() => removeItemFromCart(product._id)}
                      />
                    ) : (
                      <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}</div>
                      // "\u00a0\u00a0" // for empty space
                    )}
                    <span>{getProductQuantity(product)}</span>
                    <Button
                      size="small"
                      style={{
                        padding:
                          responsive === "small" ? "0 0.2rem" : "0 0.4rem",
                      }}
                      icon={<AddCircle />}
                      onClick={() =>
                        addItemToCart(product, product.selectedSize)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      style={{
                        padding: responsive === "small" ? "0" : "0",
                      }}
                      onClick={() => clearItemFromCart(product._id)}
                      icon={<Close />}
                    />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell scope="row">Shipping</TableCell>
            <TableCell>${shippingMethod.price}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell scope="row">
              <strong>Total</strong>
            </TableCell>
            <TableCell>
              <strong>${calcCartTotal()}</strong>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell scope="row">
              <em>VAT included</em>
            </TableCell>
            <TableCell>
              <em>${totalWithVat()}</em>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default CartItems;
