import React, { useContext, useState } from "react";
import { Box, Button, Text, Heading, Image, ResponsiveContext } from "grommet";

import CartContext from "../contexts/cart-context/context";

import { IProduct } from "../components/product";

interface Iprops {
  product: IProduct;
}

const ProductDetails = ({ product }: Iprops) => {
  const [size, setSize] = useState(null);
  const { addItemToCart } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

  return (
    <Box
      width="large"
      height="large"
      round="none"
      align="center"
      justify="center"
      background="light-3"
      pad={responsive === "small" ? "medium" : "large"}
    >
      <Box align="center" justify="center">
        <Heading
          margin="xsmall"
          size={responsive === "small" ? "small" : "large"}
        >
          {product.title}
        </Heading>
        <Heading
          color="#c96d36"
          size="small"
          margin={responsive === "small" ? "none" : "medium"}
        >
          ${product.price}
        </Heading>
      </Box>
      <Box direction={responsive === "small" ? "column" : "row"} align="center">
        <Box
          width={responsive === "small" ? "small" : "xlarge"}
          height={responsive === "small" ? "small" : "auto"}
          margin={responsive === "small" ? "0" : "1rem"}
          style={{ maxHeight: "100%" }}
        >
          <Image
            fit="cover"
            src={product.imageURL}
            style={{ boxShadow: "2px 2px 4px gray" }}
          />
        </Box>
        <Box justify="between">
          <Text style={{ fontWeight: "bold" }}>Sizes: </Text>
          <Box margin={{ vertical: "small" }}>
            <Text>
              {product.sizes.map((size, index) =>
                size.stock > 0 ? (
                  <Text
                    key={index}
                    style={{
                      backgroundColor: "#e0e0e0",
                      padding: responsive === "small" ? "0.1rem" : "0.3rem",
                      border: "1px solid black",
                      color: "black",
                      marginRight: "0.3rem",
                    }}
                    onClick={() => setSize(size.size)}
                  >
                    {size.size}
                  </Text>
                ) : null
              )}
            </Text>
          </Box>
          <Text style={{ fontWeight: "bold" }}>Seasons: </Text>
          <Box margin={{ vertical: "small" }}>
            <Text>
              {/* {props.item.season.map((seasonUnit: any, index: any) => (
                <Text
                  key={index}
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: responsive === "small" ? "0.1rem" : "0.3rem",
                    border: "1px solid black",
                    color: "black",
                    marginRight: "0.3rem",
                  }}
                >
                  {seasonUnit}
                </Text>
              ))} */}
            </Text>
          </Box>
          <Text margin={{ vertical: "xsmall" }}>
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {responsive === "small" ? product.desc.slice(0, 50) : product.desc}
          </Text>
          {size ? (
            <Button
              primary
              onClick={(event: any) => {
                addItemToCart(product, size);
                const itemComponent = event.target;
                itemComponent.innerText = "Item added";
                itemComponent.style.backgroundColor = "#76FEB3";
                itemComponent.style.color = "#373737";
                setTimeout(() => {
                  itemComponent.innerText = "Add to cart";
                  itemComponent.style.backgroundColor = "#373737";
                  itemComponent.style.color = "#FEFEFE";
                }, 4000);
              }}
              label="Add to cart"
              margin="small"
              color="buttonBg"
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
