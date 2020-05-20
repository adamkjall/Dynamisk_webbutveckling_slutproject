import React, { useContext } from "react";
import HomeHeader from "../components/home-boxes/home-header";
import HomeCollection from "../components/home-boxes/home-collection";
import HomeSale from "../components/home-boxes/home-sale";
import FallCollection from "../components/home-boxes/home-fallcollection";
import { Grid, ResponsiveContext } from "grommet";

const Home = () => {
  const size = useContext(ResponsiveContext) as
    | "small"
    | "medium"
    | "large"
    | "xlarge";

  console.log(size);

  const columns = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto", "auto"],
    xlarge: ["auto", "auto", "auto"]
  };

  const rows = {
    small: ["1/2", "auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto", "auto"],
    xlarge: ["auto", "auto", "auto"]
  };
  // [column, row]
  const areas = {
    small: [
      { name: "header", start: [0, 0], end: [0, 0] },
      { name: "sale", start: [0, 1], end: [0, 1] }
    ],
    medium: [
      { name: "header", start: [0, 0], end: [1, 0] },
      { name: "collection", start: [0, 1], end: [0, 1] },
      { name: "sale", start: [1, 1], end: [1, 1] }
    ],
    large: [
      { name: "header", start: [1, 0], end: [2, 1] },
      { name: "collection", start: [0, 0], end: [0, 1] },
      { name: "sale", start: [1, 1], end: [1, 1] },
      { name: "fallCollection", start: [2, 1], end: [2, 1] }
    ],
    xlarge: [
      { name: "header", start: [1, 0], end: [2, 1] },
      { name: "collection", start: [0, 0], end: [0, 1] },
      { name: "sale", start: [1, 1], end: [1, 1] },
      { name: "fallCollection", start: [2, 1], end: [2, 1] }
    ]
  };

  const homeHeader = <HomeHeader key="0" />;
  const homeCollection = <HomeCollection key="1" />;
  const homeSale = <HomeSale key="2" />;
  const fallCollection = <FallCollection key="3" />;

  const components = {
    small: [homeHeader, homeSale],
    medium: [homeHeader, homeCollection, homeSale],
    large: [homeHeader, homeCollection, homeSale, fallCollection],
    xlarge: [homeHeader, homeCollection, homeSale, fallCollection]
  };
  return (
    <Grid
      fill
      responsive={true}
      rows={rows[size]}
      columns={columns[size]}
      gap="medium"
      areas={areas[size]}
    >
      {components[size]}
    </Grid>
  );
};

export default Home;
