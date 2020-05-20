import React, { useContext } from "react";
import { Box, Button, Text, Heading, Image, ResponsiveContext } from "grommet";

import CartContext from "../contexts/cart-context/context";

interface Iprops {
  item: any;
}

const ItemDetails = (props: Iprops) => {
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
          {props.item.name}
        </Heading>
        <Heading
          color="#c96d36"
          size="small"
          margin={responsive === "small" ? "none" : "medium"}
        >
          ${props.item.price}
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
            src={props.item.imageUrl}
            style={{ boxShadow: "2px 2px 4px gray" }}
          />
        </Box>
        <Box justify="between">
          <Text style={{ fontWeight: "bold" }}>Sizes: </Text>
          <Box margin={{ vertical: "small" }}>
            <Text>
              {props.item.size.map((sizeUnit: any, index: any) => (
                <Text
                  key={index}
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: responsive === "small" ? "0.1rem" : "0.3rem",
                    border: "1px solid black",
                    color: "black",
                    marginRight: "0.3rem"
                  }}
                >
                  {sizeUnit}
                </Text>
              ))}
            </Text>
          </Box>
          <Text style={{ fontWeight: "bold" }}>Seasons: </Text>
          <Box margin={{ vertical: "small" }}>
            <Text>
              {props.item.season.map((seasonUnit: any, index: any) => (
                <Text
                  key={index}
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: responsive === "small" ? "0.1rem" : "0.3rem",
                    border: "1px solid black",
                    color: "black",
                    marginRight: "0.3rem"
                  }}
                >
                  {seasonUnit}
                </Text>
              ))}
            </Text>
          </Box>
          <Text margin={{ vertical: "xsmall" }}>
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {responsive === "small"
              ? props.item.description.slice(0, 50)
              : props.item.description}
          </Text>
          <Button
            primary
            onClick={(event: any) => {
              addItemToCart(props.item);
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
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
