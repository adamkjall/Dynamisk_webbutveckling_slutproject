import React, { CSSProperties, useContext, useState } from "react";
import { Box, Button, Text, Heading, Image, ResponsiveContext } from "grommet";

import CartContext from "../contexts/cart-context/context";

import { IProduct } from "../components/product";

interface Iprops {
  product: IProduct;
}

const ProductDetails = ({ product }: Iprops) => {
  const [size, setSize] = useState(null);
  const [activeKey, setActiveKey] = useState(null)
  const [disableButton, setDisableButton] = useState(true)
  const { addItemToCart } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

  const handleClick = (size, index) => {
    setSize(size.size)
    if (size) setDisableButton(false)
    setActiveKey(index)
  }

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
        >
          <Image
            fit="cover"
            src={product.imageURL}
            style={{ boxShadow: "2px 2px 4px gray", margin: "0.5rem" }}
          />
        </Box>
        <Box justify="between">
          <Text style={{ fontWeight: "bold" }}>Sizes: </Text>
          <Box margin={{ vertical: "small" }}>
            <Text style = {{display: "flex"}}>
              {product.sizes.map((size, index) =>
                <div key={index} style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Button
                    value = {size.size}
                    style = {activeKey === index? active:unActive}
                    disabled = {size.stock <= 0? true:false}
                    onClick={() => handleClick(size, index)}
                  >
                    {size.size}
                  </Button>
                  <p style = {{fontSize: "0.8rem", margin: "0"}}>{`In Stock: ${size.stock <= 0? "0" : size.stock }`}</p>
                </div>
              )}
            </Text>
          </Box>
          <Text margin={{ vertical: "xsmall" }}>
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {responsive === "small" ? product.desc.slice(0, 50) : product.desc}
          </Text>
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
              disabled = {disableButton}
            />
        </Box>
      </Box>
    </Box>
  );
};

const unActive:CSSProperties={
  backgroundColor: "#e0e0e0",
  color: "black",
  padding: "0.5rem 0.2rem",
  border: "1px solid black",
  margin: "0.3rem",
  cursor: "pointer",
  width: "5rem",
  textAlign: "center"
}

const active:CSSProperties={
  backgroundColor: "#c96d36",
  color: "#e0e0e0",
  padding: "0.5rem 0.2rem",
  border: "1px solid black",
  margin: "0.3rem",
  cursor: "pointer",
  width: "5rem",
  textAlign: "center"
}

export default ProductDetails;
