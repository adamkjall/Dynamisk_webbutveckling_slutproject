import React, { useContext } from "react";

import { Box, Form, FormField, RadioButtonGroup, Text } from "grommet";

import FormFieldLabel from "./form-field-fabel";

import AuthenticationContext from "../contexts/authentication-context/context";
import CartContext from "../contexts/cart-context/context";
import { PaymentMethod } from "../contexts/cart-context/context-provider";

interface IProps {
  setIsCardValid,
  isCardValid:boolean,
  setIsPayPhoneValid,
  isPayPhoneValid:boolean,
  setIsPayMailValid,
  isPayMailValid:boolean
}

const PaymentForm = (props: IProps) => {
  const { user, updateUser } = useContext(AuthenticationContext);
  const { paymentMethod, setPaymentMethod } = useContext(CartContext);

  const cardnoVisa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
  const cardnoMasterCard = /^(?:5[1-5][0-9]{14})$/

  const checkCardValidation = (event) => {
    if((event.target.value.match(cardnoMasterCard))||(event.target.value.match(cardnoVisa))){
      props.setIsCardValid(true)
    }else{
      props.setIsCardValid(false)
    }
  }

  const checkPhoneValidation = (event) => {
    if(event.target.value.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)){
      props.setIsPayPhoneValid(true)
    }else{
      props.setIsPayPhoneValid(false)
    }
  }

  const checkMailValidation = (event) => {
    if(event.target.value.match(/^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/)){
      props.setIsPayMailValid(true)
    }else{
      props.setIsPayMailValid(false)
    }
  }

  return (
    <Form style={{ gridArea: "name" }} validate="blur">
      <RadioButtonGroup
        margin={{ vertical: "medium" }}
        direction="row"
        name="radio"
        options={[
          { label: "Card", value: "card" },
          { label: "Swish", value: "swish" },
          { label: "Invoice", value: "invoice" },
        ]}
        value={paymentMethod}
        onChange={(event) =>
          setPaymentMethod(event.target.value as PaymentMethod)
        }
        {...props}
      />
      {paymentMethod === "invoice" ? (
        <FormField
          key={1}
          name="email"
          label={
            (
              <Box direction="row">
                <Text>E-mail</Text>
                <Text color="status-critical">*</Text>
              </Box>
            )
          }
          required
          type="email"
          value={user.email}
          onChange={(event) => checkMailValidation(event)}
          validate={[
            { regexp: /^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/ },
            name => {
              if (!name.match(/^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/ )) return "Not a valid e-mail";
              return undefined;
            }
          ]}
        />
      ) : paymentMethod === "swish" ? (
        <FormField
        key={2}
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
        type="number"
        value={user.phoneNumber}
        onChange={(event) => checkPhoneValidation(event)}
        validate={[
          { regexp: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/ },
          name => {
            if (!name.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)) return "Not a valid phone number";
            return undefined;
          }
        ]}  
      />
      ) : (
        <FormField
          key={3}
          name="card"
          label={
            (
              <Box direction="row">
                <Text>Card</Text>
                <Text color="status-critical">*</Text>
              </Box>
            )
          }
          required
          type="number"
          value={""}
          onChange={(event) => checkCardValidation(event)}
          validate={[
            { regexp: cardnoMasterCard||cardnoVisa},
            value => {
              if (!value.match(cardnoMasterCard||cardnoVisa)) return "We only accept MasterCard or Visa";
              return undefined;
            }
          ]}
        />
      )}
    </Form>
  );
};

export default PaymentForm;
