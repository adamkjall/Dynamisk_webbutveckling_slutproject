import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header";
import Menu from "./components/menu";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Checkout from "./pages/checkout";
import { Grommet, Box, grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import Admin from "./pages/adminPage";

import SHOP_DATA from "./shop.data";

const myTheme = {
  global: {
    colors: {
      brand: "#373737",
      mainText: "#FEFFFF",
      buttonBg: "#373737",
      copper: "#ffc29e",
      layer: {
        background: "red"
      }
    },
    font: {
      family: "Abel",
      size: "18px",
      height: "20px"
    }
  }
};

type Item = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

// type Collection = {
//   id: number;
//   title: string;
//   routeName: string;
//   items: Item[];
// };

function App() {
  useEffect(() => {
    syncWithLocalStorage();
  }, []);

  const syncWithLocalStorage = () => {
    const localstorageCollections = localStorage.getItem("collection");
    if (!localstorageCollections) {
      localStorage.setItem("collection", JSON.stringify(SHOP_DATA));
    }
  };

  return (
    <Grommet theme={deepMerge(grommet, myTheme)} full>
      <Header />
      <Menu />
      <Box height="87vh" pad="large">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop/:category/:query?" component={Shop} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Box>
    </Grommet>
  );
}

export default App;
