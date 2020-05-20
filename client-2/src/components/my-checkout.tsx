import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Box, Accordion, AccordionPanel, Button, Layer } from "grommet";

import { payWithApi } from "../api-utils";

import ContactFormField from "./contact-form-field";
import PaymentForm from "./payment-form";
import ShippingForm from "./shipping-form";
import OrderConfirmation from "./order-confirmation";

import UserContext from "../contexts/user-context/context";
import CartContext from "../contexts/cart-context/context";

const MyCheckOut = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { clearCart, paymentMethod } = useContext(CartContext);
  const history = useHistory();

  const validUserInformation = () =>
    user.firstName.length > 1 &&
    user.firstName.match(/[A-Ö]/gi)?.length === user.firstName.length &&
    user.lastName.length > 1 &&
    user.lastName.match(/[A-Ö]/gi)?.length === user.lastName.length &&
    user.email.length > 1 &&
    user.phoneNumber.length > 1 &&
    user.address.length > 1 &&
    user.city.length > 1 &&
    user.postCode.length > 1;

  const closeModal = () => {
    history.push("/");
    setShowModal(false);
    clearCart();
  };

  const pay = async () => {
    setLoading(true);
    await payWithApi();
    setShowModal(true);
  };

  return (
    <Box gridArea="myCheckOut" background="light-6" round="small">
      <Accordion activeIndex={activeIndex} gridArea="myCheckOut">
        <AccordionPanel onClick={() => setActiveIndex(0)} label="Contacts">
          <Box pad="medium" background="light-2">
            <ContactFormField>
              <Button
                margin="medium"
                alignSelf="center"
                primary
                disabled={!validUserInformation()}
                onClick={() => setActiveIndex(1)}
                label="NEXT"
                type="submit"
              />
            </ContactFormField>
          </Box>
        </AccordionPanel>
        <AccordionPanel onClick={() => setActiveIndex(1)} label="Shipping">
          <Box pad="medium" background="light-2">
            <ShippingForm />
            <Button
              alignSelf="center"
              primary
              disabled={!validUserInformation()}
              onClick={() => setActiveIndex(2)}
              label="NEXT"
              margin={{ top: "medium" }}
            />
          </Box>
        </AccordionPanel>
        <AccordionPanel onClick={() => setActiveIndex(2)} label="Payment">
          <Box pad="medium" background="light-2">
            <PaymentForm />
          </Box>
        </AccordionPanel>
        {activeIndex === 2 &&
        !loading &&
        validUserInformation() &&
        ((paymentMethod === "card" && user.card.length) ||
          paymentMethod === "swish" ||
          paymentMethod === "invoice") ? (
          <Button
            margin="medium"
            primary
            label="Place your order"
            onClick={pay}
          />
        ) : (
          <Button margin="medium" primary disabled label="Place your order" />
        )}
      </Accordion>

      {showModal && (
        <Layer onEsc={closeModal} onClickOutside={closeModal}>
          <OrderConfirmation closeModal={closeModal} />
        </Layer>
      )}
    </Box>
  );
};

export default MyCheckOut;
