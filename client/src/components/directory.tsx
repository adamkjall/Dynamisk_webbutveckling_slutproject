import React from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  Box,
  Select,
  Stack,
  Text,
  RangeSelector,
  TextInput,
  Button
} from "grommet";

const Directory = () => {
  const { category } = useParams();
  const [size, setSize] = React.useState("");
  const [season, setSeason] = React.useState("");
  const [values, setPrice] = React.useState([0, 250]);

  return (
    <Box align="center" style={{ borderRight: "1px solid gray" }}>
      <Heading style={{ gridArea: "directory" }}>{category}</Heading>
      <Box
        direction="row"
        pad="small"
        justify="evenly"
        align="center"
        width="100%"
      >
        <Select
          options={["small", "medium", "large", "x-large"]}
          value={size}
          placeholder="Size"
          onChange={({ option }) => setSize(option)}
        />
        <Text style={{ color: "#c96d36" }} onClick={({}) => setSize("")}>
          Clear
        </Text>
      </Box>
      <Box
        direction="row"
        pad="small"
        align="center"
        width="100%"
        justify="evenly"
      >
        <Select
          options={["spring", "summer", "autumn", "vinter"]}
          value={season}
          placeholder="Season"
          onChange={({ option }) => setSeason(option)}
        />
        <Text style={{ color: "#c96d36" }} onClick={({}) => setSeason("")}>
          Clear
        </Text>
      </Box>
      <hr />
      <br />
      <Text style={{ fontWeight: "bold" }}>Price</Text>
      <Stack>
        <Box direction="row" justify="between">
          {[0, 50, 100, 150, 200, 250].map(value => (
            <Box key={value} pad="small" border={false}>
              <Text style={{ fontFamily: "monospace" }}>{value}</Text>
            </Box>
          ))}
        </Box>
        <Box pad="small">
          <RangeSelector
            direction="horizontal"
            invert={false}
            min={0}
            max={250}
            size="medium"
            round="small"
            values={values}
            onChange={(values: any) => setPrice(values)}
          />
        </Box>
      </Stack>
      <Box>
        <Text style={{ color: "#c96d36" }}>From:</Text>
        <TextInput placeholder="From" value={"$" + values[0]} />
        <Text style={{ color: "#c96d36" }}>To:</Text>
        <TextInput placeholder="To" value={"$" + values[1]} />
      </Box>
      <br />
      <br />
      <Button primary color="dark-1" label="Filter" onClick={() => {}} />
    </Box>
  );
};

export default Directory;
