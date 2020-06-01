import React, { useEffect } from "react";

import { Grommet, Box, grommet } from "grommet";
import { deepMerge } from "grommet/utils";

import ErrorBoundary from "./components/error-boundary";
import AppRouter from "./router/app-router";
import Header from "./components/header";
import Menu from "./components/menu";

// import SHOP_DATA from "./shop.data";

const myTheme = {
  global: {
    colors: {
      brand: "#373737",
      mainText: "#FEFFFF",
      buttonBg: "#373737",
      copper: "#ffc29e",
      focus: "none",
      layer: {
        background: "red",
      },
    },
    font: {
      family: "Abel",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  // useEffect(() => {
  //   syncWithLocalStorage();
  // }, []);

  const syncWithLocalStorage = () => {
    // const localstorageCollections = localStorage.getItem("collection");
    // if (!localstorageCollections) {
    //   localStorage.setItem("collection", JSON.stringify(SHOP_DATA));
    // }
  };

  return (
    <ErrorBoundary>
      <Grommet theme={deepMerge(grommet, myTheme)} full>
        <Header /> {/* height 8vh */}
        <Menu /> {/* height 5vh */}
        <Box height="87vh">
          <AppRouter />
        </Box>
      </Grommet>
    </ErrorBoundary>
  );
}

export default App;
