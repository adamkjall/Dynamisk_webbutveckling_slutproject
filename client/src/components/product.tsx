import React, { useEffect, useState } from "react";

import { withRouter, RouteComponentProps } from "react-router-dom";

import { Box, Button, Layer, Heading, Paragraph } from "grommet";
import { Close } from "grommet-icons";

import ProductDetails from "./product-details";

export interface IProduct {
  _id: string;
  category: string;
  title: string;
  image: {
    filename: string;
    contentType: string;
    uploadDate: string;
    imageData: string;
    chunkSize: number;
    length: number;
    md5: string;
    _id: string;
  };
  price: number;
  sizes: {
    size: string;
    stock: number;
  }[];
  desc: string;
  quantity?: number;
}

interface Iprops extends RouteComponentProps {
  item: IProduct;
}

const Item = ({ item, history, match, location }: Iprops) => {
  const [showItemDetails, setShowItemDetails] = useState(false);

  // this effect makes sure you can share an items url
  // if we have an item id in the url we open the item
  // with the matching id
  useEffect(() => {
    const id = location.search.slice(4, location.search.length);

    if (id === item._id) {
      setShowItemDetails(true);
    }
  }, [location.search, item._id]);

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
        item.title.replace(/\s/g, "-").toLowerCase() +
        "/?id=" +
        item._id
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
      background={`${
        item
          ? `url(data:${item.image.contentType};base64, ${item.image.imageData})`
          : ""
      }`}
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
            {item.title}
          </Heading>
          <Paragraph margin="none">${item.price}</Paragraph>
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
            <ProductDetails product={item} />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default withRouter(Item);
