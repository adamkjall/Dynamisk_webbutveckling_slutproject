import React, { useEffect, useState } from "react";

import { withRouter, RouteComponentProps } from "react-router-dom";

import { Box, Button, Layer, Heading, Paragraph } from "grommet";
import { Close } from "grommet-icons";

import ProductDetails from "./product-details";

export interface IProduct {
  _id: string;
  category: string;
  title: string;
  image: string;
  imageURL: string;
  price: number;
  sizes: {
    size: string;
    stock: number;
  }[];
  desc: string;
  selectedSize?: { size: string; quantity: number }[];
}

interface Iprops extends RouteComponentProps {
  product: IProduct;
}

const Product = ({ product, history, match, location }: Iprops) => {
  const [showItemDetails, setShowItemDetails] = useState(false);

  // this effect makes sure you can share an items url
  // if we have an item id in the url we open the item
  // with the matching id
  useEffect(() => {
    const id = location.search.slice(4, location.search.length);

    if (id === product._id) {
      setShowItemDetails(true);
    }
  }, [location.search, product._id]);

  const closeModal = () => {
    setShowItemDetails(false);
    // go back to previous url
    history.push(match.url);
  };

  const openModal = () => {
    setShowItemDetails(true);
    // set new url so you can copy link and share
    history.push(
      match.url +
        "/" +
        product.title.replace(/\s/g, "-").toLowerCase() +
        "/?id=" +
        product._id
    );
  };

  return (
    <Box
      width="medium"
      height="medium"
      round="small"
      align="center"
      justify="end"
      elevation="medium"
      overflow="hidden"
      background={`url(${product.imageURL})`}
      margin="small"
      onClick={openModal}
    >
      <Box
        direction="row"
        background="rgba(255,255,255,0.8)"
        width="100%"
        height="25%"
        justify="evenly"
        align="center"
      >
        <Box
          direction="column"
          pad="small"
          align="center"
          fill
          justify="around"
        >
          <Heading level="3" margin="small">
            {product.title}
          </Heading>
          <Paragraph margin="none">${product.price}</Paragraph>
        </Box>
      </Box>

      {showItemDetails && (
        <Layer onEsc={closeModal} onClickOutside={closeModal}>
          <Box background="light-3">
            <Button
              primary
              alignSelf="end"
              icon={<Close />}
              onClick={(e) => {
                e.stopPropagation(); // prohibit click propogating down to other elements
                closeModal();
              }}
              color="light-3"
            />
            <ProductDetails product={product} />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default withRouter(Product);
