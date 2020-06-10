import React, { useContext } from "react";

import { Box, Form, FormField, Text } from "grommet";

import FormFieldLabel from "./form-field-label";

import AuthenticationContext from "../contexts/authentication-context/context";

interface IProps {
  children: React.ReactNode;
}
const ContactFormField = (props: IProps) => {
  const { user, updateUser } = useContext(AuthenticationContext);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateUser(name, value);
  };

  return (
    <Form validate="blur" style={{ gridArea: "name" }}>
      <FormFieldLabel
        name="firstName"
        label="FirstName"
        required
        type="text"
        value={user.firstName}
        onChange={handleOnChange}
      />
      <FormFieldLabel
        name="lastName"
        label="LastName"
        required
        type="text"
        value={user.lastName}
        onChange={handleOnChange}
      />

      <FormField
        name="phoneNumber"
        label={
          (
            <Box direction="row">
              <Text>Phone Number</Text>
              <Text color="status-critical">*</Text>
            </Box>
          )
        }
        required
        type="text"
        value={user.phoneNumber}
        onChange={handleOnChange}
        validate={[
          { regexp: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/},
          name => {
            if (!name.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)) return "Not a valid phone number";
            return undefined;
          }
        ]}
        
      />
      <FormField
        name="email"
        label={
          (
            <Box direction="row">
              <Text>E-Mail</Text>
              <Text color="status-critical">*</Text>
            </Box>
          )
        }
        required
        type="email"
        value={user.email}
        onChange={handleOnChange}
        validate={[
          { regexp: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/ },
          name => {
            if (!name.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)) return "Not a valid e-mail";
            return undefined;
          }
        ]}
      />
      <FormFieldLabel
        name="address"
        label="Address"
        required
        type="text"
        value={user.streetAddress}
        onChange={handleOnChange}
      />
      <FormField
        name="postCode"
        label={
          (
            <Box direction="row">
              <Text>Post Code</Text>
              <Text color="status-critical">*</Text>
            </Box>
          )
        }
        required
        type="number"
        value={user.zipCode}
        onChange={handleOnChange}
        validate={[
          { regexp: /^\d{5}$/ },
          name => {
            if (!name.match(/^\d{5}$/)) return "Not a valid post number";
            return undefined;
          }
        ]}
      />
      <FormFieldLabel
        name="city"
        label="City"
        required
        type="string"
        value={user.city}
        onChange={handleOnChange}
      />
      {props.children}
    </Form>
  );
};

export default ContactFormField;
