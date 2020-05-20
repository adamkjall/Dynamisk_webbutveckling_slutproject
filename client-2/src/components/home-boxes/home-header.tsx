import React, { useContext } from "react";
import { Box, Paragraph, ResponsiveContext } from "grommet";
import WideImage from "../../assets/images/manwithshirtwide.jpg";

const HomeHeader = () => {
  const responsive = useContext(ResponsiveContext);
  return (
    <Box gridArea="header" style={{ position: "relative" }}>
      <Box fill>
        <img
          src={WideImage}
          alt="WideImage"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }}
        />
      </Box>
      <Paragraph
        size={responsive === "small" ? "xlarge" : "xxlarge"}
        style={{
          margin: 0,
          position: "absolute",
          color: "#FEFFFF",
          left: "1rem",
          bottom: "1rem"
        }}
      >
        <span style={{ color: "#ffc29e" }}>ADAM FREDICK COLLECTION</span>
        <br />- fashion for everyone
      </Paragraph>
    </Box>
  );
};

export default HomeHeader;
