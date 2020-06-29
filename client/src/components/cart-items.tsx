import React, { useContext, useEffect, useState } from "react";

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
  productsArray: IProduct[]
  locked?: boolean; // lock cart from changes
}

const CartItems = (props: Props) => {
  const { locked, productsArray } = props
  const [ total, setTotal ] = useState(0)
  const {
    removeItemFromCart,
    addItemToCart,
    clearItemFromCart,
    shippingMethod,
    // calcCartTotal,
    // totalWithVat,
  } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

  useEffect(() => {
    let newTotal = productsArray.reduce(
      (prevValue, currProduct) => prevValue + currProduct.price * currProduct.quantity,
      0)
      newTotal += shippingMethod.price
      setTotal(newTotal)
      // console.log(newTotal);
      
  }, [productsArray])

  const calcTotalWithVAT = () => {
    return total * 1.25
  }

  return (
    <Box responsive style = {{fontSize: responsive === "small" ? "1rem": "1.5rem"}}>
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
              Size
            </TableCell>
            <TableCell scope="col" border="bottom">
              Price
            </TableCell>
            {!locked && (
              <>
                <TableCell scope="col" border="bottom">
                  Quantity
                </TableCell>
                {responsive === "small"? null: <TableCell scope="col" border="bottom"></TableCell>}
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Removes duplicate products */}
          {productsArray.map((product, index) => (
            <TableRow key={index} style = {{borderBottom: "1px solid black", padding: "0.5rem 0", margin: "0.5rem"}}>
              {responsive !== "small" ? (
                <TableCell>
                  <Image
                    src={`${product.imageURL}`}
                    style={{ width: "4rem" }}
                  ></Image>
                </TableCell>
              ) : null}
              <TableCell>
                { locked ?
              `${product.quantity} x ${product.title}`
              : product.title
              }
              </TableCell>
              <TableCell>{product.selectedSize}</TableCell>
              <TableCell>${product.price}</TableCell>
              {!locked && (
                <>
                  <TableCell flex direction="row" align="center">
                    {product.quantity > 1 ? (
                      <Button
                        icon={<SubtractCircle />}
                        style={{
                          padding:
                            responsive === "small" ? "0 0.2rem" : "0 0.4rem",
                        }}
                        onClick={() => removeItemFromCart(product.id)}
                      />
                    ) : (
                      <Button
                      icon={<SubtractCircle />}
                      style={{
                        padding:
                          responsive === "small" ? "0 0.2rem" : "0 0.4rem",
                      }}
                      onClick = {() => clearItemFromCart(product.id)}
                    />
                    )}
                    <span>{product.quantity}</span>
                    <Button
                      size="small"
                      style={{
                        padding:
                          responsive === "small" ? "0 0.2rem" : "0 0.4rem"
                      }}
                      icon={<AddCircle />}
                      onClick={() =>
                        addItemToCart(product, product.selectedSize)
                      }
                    />
                  </TableCell>
                  {responsive === "small"? 
                    null:
                    <TableCell align="center">
                      <Button
                        size="small"
                        style={{
                          padding: responsive === "small" ? "0" : "0"
                        }}
                        onClick={() => clearItemFromCart(product.id)}
                        icon={<Close/>}
                      />
                    </TableCell>
                  }
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
              <strong>${total}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row">
              <em>VAT included</em>
            </TableCell>
            <TableCell>
              <em>${calcTotalWithVAT()}</em>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default CartItems;
