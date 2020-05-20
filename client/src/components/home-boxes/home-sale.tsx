import React from "react";
import { Box, Paragraph } from "grommet";
import SaleImage from "../../assets/images/sale.jpg";

const HomeSale = () => {
  return (
    <Box gridArea="sale" style={{ position: "relative" }}>
      <Box fill>
        <img
          src={SaleImage}
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
          right: "1rem",
          top: "1rem",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          fontStyle: "italic"
        }}
      >
        Up to <span style={{ color: "#ffc29e" }}>40%</span> sale
        <br /> on summer collection
      </Paragraph>
    </Box>
  );
};

export default HomeSale;
