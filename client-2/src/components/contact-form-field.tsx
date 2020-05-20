import React, { useContext } from "react";
import FormFieldLabel from "./form-field-fabel";
import { Form } from "grommet";

import UserContext from "../contexts/user-context/context";

interface IProps {
  children: React.ReactNode;
}
const ContactFormField = (props: IProps) => {
  const { user, updateUser } = useContext(UserContext);

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

      <FormFieldLabel
        name="phoneNumber"
        label="Phone number"
        required
        type="number"
        value={user.phoneNumber}
        onChange={handleOnChange}
      />
      <FormFieldLabel
        name="email"
        label="Email"
        required
        type="email"
        value={user.email}
        onChange={handleOnChange}
      />
      <FormFieldLabel
        name="address"
        label="Address"
        required
        type="text"
        value={user.address}
        onChange={handleOnChange}
      />
      <FormFieldLabel
        name="postCode"
        label="Post code"
        required
        type="number"
        value={user.postCode}
        onChange={handleOnChange}
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
