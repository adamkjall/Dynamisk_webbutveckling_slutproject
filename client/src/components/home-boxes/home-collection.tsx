import React from "react";
import { Box, Paragraph } from "grommet";
import Collection from "../../assets/images/collection.jpg";

const HomeCollection = () => {
  return (
    <Box gridArea="collection" style={{ position: "relative" }}>
      <Box fill>
        <img
          src={Collection}
          alt="WideImage"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }}
        />
      </Box>
    </Box>
  );
};

export default HomeCollection;
