import React, { useContext, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Box, Button, Layer } from "grommet";
import CartContext from "../contexts/cart-context/context";
import ItemDetails from "../components/item-detail";
import { Close } from "grommet-icons";

interface Iprops extends RouteComponentProps {
  item: any;
}

const Item = ({ item, history, match, location }: Iprops) => {
  const { addItemToCart } = useContext(CartContext);
  const url = `url(${item.imageUrl})`;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = location.search.slice(4, location.search.length);
    if (Number(id) === item.id) {
      setShow(true);
    }
  }, [location.search, item.id]);

  const closeModal = () => {
    history.push(match.url);
    setShow(false);
  };

  const openModal = () => {
    history.push(
      match.url +
        "/" +
        item.name.replace(/\s/g, "-").toLowerCase() +
        "/?id=" +
        item.id
    );
    setShow(true);
  };

  return (
    <Box
      width="medium"
      height="medium"
      round="small"
      align="center"
      justify="end"
      background={url}
      margin="small"
    >
      <Box
        direction="row"
        background="rgba(255,255,255,0.8)"
        width="100%"
        height="30%"
        justify="evenly"
        align="center"
      >
        <Box
          direction="column"
          pad={{ left: "medium" }}
          align="start"
          fill
          justify="around"
        >
          <h3>{item.name}</h3>
          <span>${item.price}</span>
        </Box>
        <Box direction="column" align="center" fill justify="around">
          <Button
            primary
            onClick={event => {
              addItemToCart(item);
              const itemComponent = event.target as HTMLButtonElement;
              itemComponent.innerText = "Item added";
              itemComponent.style.backgroundColor = "#76FEB3";
              itemComponent.style.color = "#373737";
              setTimeout(() => {
                itemComponent.innerText = "Add to cart";
                itemComponent.style.backgroundColor = "#373737";
                itemComponent.style.color = "#FEFEFE";
              }, 4000);
            }}
            label="Buy"
            margin="small"
            color="buttonBg"
          />
          <Button
            alignSelf="center"
            plain
            color="#c96d36"
            label="Product details"
            onClick={openModal}
          />
        </Box>
      </Box>

      {show && (
        <Layer onEsc={closeModal} onClickOutside={closeModal}>
          <Box background="light-3">
            <Button
              primary
              alignSelf="end"
              icon={<Close />}
              onClick={closeModal}
              color="light-3"
            />
            <ItemDetails item={item} />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default withRouter(Item);
