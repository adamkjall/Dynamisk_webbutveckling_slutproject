import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Box, Accordion, AccordionPanel, Button, Layer } from "grommet";

import { payWithApi } from "../api-utils";

import ContactFormField from "./contact-form-field";
import PaymentForm from "./payment-form";
import ShippingForm from "./shipping-form";
import OrderConfirmation from "./order-confirmation";

import AuthenticationContext from "../contexts/authentication-context/context";
import CartContext from "../contexts/cart-context/context";

const MyCheckOut = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);
  const [isPayMailValid, setIsPayMailValid] = useState(true);
  const [isPayPhoneValid, setIsPayPhoneValid] = useState(true);
  const { user } = useContext(AuthenticationContext);
  const { clearCart, paymentMethod, cart, shippingMethod } = useContext(
    CartContext
  );
  const history = useHistory();

  const validUserInformation = () =>
    user.firstName.length > 1 &&
    user.firstName.match(/[A-Ö]/gi) &&
    user.lastName.length > 1 &&
    user.lastName.match(/[A-Ö]/gi) &&
    user.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) &&
    user.phoneNumber.match(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    ) &&
    user.streetAddress.length > 1 &&
    user.city.length > 1 &&
    user.zipCode.match(/^\d{5}$/);

  const closeModal = () => {
    history.push("/");
    setShowModal(false);
    clearCart();
  };

  const pay = async () => {
    setLoading(true);
    const order = {
      user,
      products: cart.map((prod) => {
        delete prod.imageURL;
        delete prod.sizes;
        return { ...prod };
      }),
      shippingMethod,
      paymentMethod,
      toAddress: user.streetAddress,
      toZipCode: user.zipCode,
      toCity: user.city,
    };

    console.log("hej order", order);

    const response = await payWithApi(order);
    setLoading(false);
    // TODO handle error
    // if (response.status === "error") {

    // }
    setShowModal(true);
  };

  const checkPaymentBool = () => {
    return (
      (paymentMethod.type === "VISA/MASTERCARD" && isCardValid) ||
      (paymentMethod.type === "SWISH" && isPayPhoneValid) ||
      (paymentMethod.type === "INVOICE" && isPayMailValid)
    );
  };

  return (
    <Box
      gridArea="checkout-form"
      background="light-6"
      round="small"
      overflow={{ vertical: "scroll" }}
    >
      <Accordion activeIndex={activeIndex}>
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
            <PaymentForm
              setIsCardValid={setIsCardValid}
              isCardValid={isCardValid}
              setIsPayPhoneValid={setIsPayPhoneValid}
              isPayPhoneValid={isPayPhoneValid}
              setIsPayMailValid={setIsPayMailValid}
              isPayMailValid={isPayMailValid}
            />
          </Box>
        </AccordionPanel>
        {activeIndex === 2 &&
        !loading &&
        //isCardValid &&
        //!isPayMailValid &&
        //!isPayPhoneValid &&
        validUserInformation() &&
        checkPaymentBool() ? (
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
