import React from "react";
import { Box, FormField, Text } from "grommet";

interface Iprops {
  required: boolean;
  label: string;
  name: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  validate?: (data: string) => void;
}

const FormFieldLabel = (props: Iprops) => {
  const { required, label, name, ...rest } = props;
  return (
    <FormField
      label={
        required ? (
          <Box direction="row">
            <Text>{label}</Text>
            <Text color="status-critical">*</Text>
          </Box>
        ) : (
          label
        )
      }
      name={name}
      required
      // placeholder={label}
      {...rest}
      validate={[
        { regexp: /^[A-Z]/gi },
        name => {
          if (name && name.length === 1) return "must be more than 1 character";
          return undefined;
        }
      ]}
    />
  );
};

export default FormFieldLabel;
