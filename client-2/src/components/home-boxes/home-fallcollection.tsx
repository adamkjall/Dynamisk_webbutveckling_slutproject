import React from "react";
import { Box, Paragraph } from "grommet";
import FallCollection from "../../assets/images/fallcollection.jpg";

const HomeSale = () => {
  return (
    <Box gridArea="fallCollection" style={{ position: "relative" }}>
      <Box fill>
        <img
          src={FallCollection}
          alt="SaleImage"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }}
        />
      </Box>
      <Paragraph
        size="medium"
        style={{
          margin: 0,
          padding: "0.5rem",
          position: "absolute",
          color: "#FEFFFF",
          left: "38%",
          bottom: "2rem",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          fontStyle: "italic"
        }}
      >
        <span style={{ color: "#ffc29e" }}>Fall Collection</span>
        <br /> coming soon
      </Paragraph>
    </Box>
  );
};

export default HomeSale;
