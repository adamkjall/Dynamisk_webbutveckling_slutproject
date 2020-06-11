import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";

import {
  FormField,
  TextInput,
  Button,
  Form,
  Box,
  ResponsiveContext,
} from "grommet";
import { Search } from "grommet-icons";

interface IProps {
  searchLogic: (input: string, cb: (shouldClear: boolean) => void) => void;
  placeholder?: string;
}

const SearchBar = (props: IProps) => {
  const { searchLogic, placeholder } = props;
  const [input, setInput] = useState("");
  const responsive = useContext(ResponsiveContext);

  const clearInputField = (shouldClear: boolean) => {
    if (shouldClear) {
      setInput("");
    }
  };

  return (
    <Form
      onSubmit={() => searchLogic(input, clearInputField)}
      style={{
        minWidth: "60%",
      }}
    >
      <Box
        direction="row"
        style={{
          width: "100%",
        }}
      >
        <FormField
          style={{
            justifyContent: "center",
            width: "-webkit-fill-available",
            marginBottom: ".5rem",
          }}
        >
          <TextInput
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder={placeholder ? placeholder : "Search"}
            size="medium"
            style={
              responsive === "small"
                ? { padding: ".3rem" }
                : { padding: ".5rem" }
            }
          />
        </FormField>
        <Button
          icon={<Search size={responsive === "small" ? "1.7rem" : "2.3rem"} />}
          type="submit"
        />
      </Box>
    </Form>
  );
};

export default SearchBar;
