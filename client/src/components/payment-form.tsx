import React, { useContext, useEffect, useState } from "react";

import { Box, Form, FormField, RadioButtonGroup, Text } from "grommet";

import AuthenticationContext from "../contexts/authentication-context/context";
import CartContext from "../contexts/cart-context/context";
import { PaymentMethod } from "../contexts/cart-context/context-provider";

interface IProps {
  setIsCardValid,
  isCardValid: boolean,
  setIsPayPhoneValid,
  isPayPhoneValid: boolean,
  setIsPayMailValid,
  isPayMailValid: boolean
}

const PaymentForm = (props: IProps) => {
  const { user, updateUser } = useContext(AuthenticationContext);
  const { paymentMethod, setPaymentMethod } = useContext(CartContext);

  //const [cardOwner, setCardOwner] = useState(`${user.firstName} ${user.lastName}`)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCVC, setCardCVC] = useState('')

  useEffect(() => { checkCardValidation() }, [cardNumber, cardExp, cardCVC])

  const cardnoVisa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
  const cardnoMasterCard = /^(?:5[1-5][0-9]{14})$/

  const checkCardValidation = () => {
    if (
      //cardOwner.length >= 4 &&
      cardNumber.match(cardnoMasterCard || cardnoVisa) &&
      cardExp.match(/^(0?[1-9]|1[012])[/-](?:202[0-5])/) &&
      cardCVC.match(/^\d{3}$/)
    ) {
      props.setIsCardValid(true)
    }
    else {
      props.setIsCardValid(false)
    }
  }

  const checkPhoneValidation = (event) => {
    if (event.target.value.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)) {
      props.setIsPayPhoneValid(true)
    } else {
      props.setIsPayPhoneValid(false)
    }
  }

  const checkMailValidation = (event) => {
    if (event.target.value.match(/^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/)) {
      props.setIsPayMailValid(true)
    } else {
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
          autoComplete="email"
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
              if (!name.match(/^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/)) return "Not a valid e-mail";
              return undefined;
            }
          ]}
        />
      ) : paymentMethod === "swish" ? (
        <FormField
          key={2}
          name="phone"
          autoComplete="tel"
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
            <>
              {/*           <FormField
              //key={3}
              name="CardOwner"
              autoComplete = "ccname"
              label= "Card Owner"
              required
              type="text"
              value={`${user.firstName} ${user.lastName}`}
              readOnly
              onChange={(event) => setCardOwner(event.target.value)}
              validate={[
                { regexp: /^[A-Z][A-Z]/},
                value => {
                  if (value.length >= 4) return "Not a valid card owner";
                  return undefined;
                }
              ]} 
            /> */}
              <FormField
                key = {3}
                name="cardNumber"
                autoComplete="cc-number"
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
                value={cardNumber}
                onChange={(event) => ( setCardNumber(event.target.value))}
                validate={[
                  { regexp: cardnoMasterCard || cardnoVisa },
                  value => {
                    if (!value.match(cardnoMasterCard || cardnoVisa)) return "We only accept MasterCard or Visa";
                    return undefined;
                  }
                ]}
              />
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <FormField
                  name="cc-exp"
                  autoComplete="cc-exp"
                  label={
                    (
                      <Box direction="row">
                        <Text>Card Exp</Text>
                        <Text color="status-critical">*</Text>
                      </Box>
                    )
                  }
                  placeholder="MM/YYYY"
                  required
                  type="text"
                  value={""}
                  onChange={(event) => setCardExp(event.target.value)}
                  validate={[
                    { regexp: /^(0?[1-9]|1[012])[/-](?:202[0-5])/ },
                    value => {
                      if (!value.match(/^(0?[1-9]|1[012])[/-](?:202[0-5])/)) return "wrong format, MM/YYYY";
                      return undefined;
                    }
                  ]}
                  style={{ width: '45%' }}
                />
                <FormField
                  name="cardCVC"
                  autoComplete="cc-csc"
                  label={
                    (
                      <Box direction="row">
                        <Text>Card CVC</Text>
                        <Text color="status-critical">*</Text>
                      </Box>
                    )
                  }
                  required
                  type="number"
                  value={""}
                  onChange={(event) => setCardCVC(event.target.value)}
                  validate={[
                    { regexp: /^\d{3}$/ },
                    value => {
                      if (!value.match(/^\d{3}$/)) return "Must be 3 numbers";
                      return undefined;
                    }
                  ]}
                  style={{ width: '45%' }}
                />
              </div>
            </>
          )}
    </Form>

  );
};

export default PaymentForm;
