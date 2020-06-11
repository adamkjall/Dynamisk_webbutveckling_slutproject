import React from "react";
import styled from "styled-components";

import { Grommet, Box, grommet } from "grommet";
import { deepMerge } from "grommet/utils";

import ErrorBoundary from "./components/error-boundary";
import AppRouter from "./router/app-router";
import Header from "./components/header";
import Menu from "./components/menu";

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

const FixedHeader = styled(Box)`
  z-index: 1;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
`;

function App() {
  return (
    <ErrorBoundary>
      <Grommet theme={deepMerge(grommet, myTheme)} full>
        <FixedHeader>
          <Header />
          <Menu />
        </FixedHeader>
        <Box
          pad="small"
          margin={{
            bottom: "1rem",
          }}
        >
          <AppRouter />
        </Box>
      </Grommet>
    </ErrorBoundary>
  );
}

export default App;
