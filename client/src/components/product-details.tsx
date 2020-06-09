import React, { useContext, useState } from "react";
import { Box, Button, Text, Heading, Image, ResponsiveContext } from "grommet";

import CartContext from "../contexts/cart-context/context";

import { IProduct } from "../components/product";

interface Iprops {
  product: IProduct;
}

const ProductDetails = ({ product }: Iprops) => {
  const [size, setSize] = useState(null);
  const [buttonColor, setButtonColor] = useState("#e0e0e0")
  const [activeButton, setActiveButton] = useState(null)
  const [isActive, setActive] = useState(false)
  const [disableButton, setDisableButton] = useState(true)
  const [disableSizeButton, setDisableSizeButton] = useState(false)
  const { addItemToCart } = useContext(CartContext);
  const responsive = useContext(ResponsiveContext);

  const handleClick = (event, size) => {
    setSize(size.size)
    if (size) setDisableButton(false)
    //setActiveButton(event.target.value)

/*     if(activeButton === event.target.value){
      setActive(true)
    }else{
      setActive(false)
    } */
    console.log(event)
    //setButtonColor("#949494")
    //console.log(handle)

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
            style={{ boxShadow: "2px 2px 4px gray" }}
          />
        </Box>
        <Box justify="between">
          <Text style={{ fontWeight: "bold" }}>Sizes: </Text>
          <Box margin={{ vertical: "small" }}>
            <Text style = {{display: "flex"}}>
              {product.sizes.map((size, index) =>
                //size.stock > 0 ? (
                  <div key={index} style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Button
                    
                     style={{
                      backgroundColor: buttonColor,
                      padding: responsive === "small" ? "0.3rem" : "0.5rem",
                      border: "1px solid black",
                      color: "black",
                      margin: "0.3rem",
                      cursor: "pointer",
                      width: "5rem",
                      textAlign: "center"
                    }}
                    disabled = {size.stock <= 0? true:false}
                    active = {isActive}
                    onClick={(event) => handleClick(event, size)}
                  >
                    {size.size}
                  </Button>
                  <p style = {{fontSize: "0.8rem", margin: "0"}}>{`In Stock: ${size.stock <= 0? "0" : size.stock }`}</p>
                  </div>
                //) 
              )}
            </Text>
          </Box>
{/*           <Text style={{ fontWeight: "bold" }}>Seasons: </Text> */}
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
          {/* {size ? ( */}
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
          {/* ) : null} */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
