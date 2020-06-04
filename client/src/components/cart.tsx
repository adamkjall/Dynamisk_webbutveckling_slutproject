import React, {useContext, useState} from "react";

import { Link } from "react-router-dom";

import AuthenticationContext from "../contexts/authentication-context/context";

import { Box, Button, Heading } from "grommet";
import { Close } from "grommet-icons";

import CartItems from "./cart-items";
import SignInSignUpModal from "./signInSignUpModal"

interface Iprops {
  closeCart: () => void;
}

const MyCart = (props: Iprops) => {
  
  const [showModal, setShowModal] = useState(false)
  const { isAuthenticated } = useContext(AuthenticationContext);

  const checkSession = () => {
    if(!isAuthenticated){
      setShowModal(true)
    }else{
      setShowModal(false)
      props.closeCart()
    }
  }


  return (
    <>
    {showModal? <SignInSignUpModal/>:null }
    {/* {isAuthenticated?null:<SignInSignUpModal/>} */}
    <Box>
      <Box align="center" height="100vh" overflow="auto">
        <Button alignSelf="end" icon={<Close />} onClick={props.closeCart} />
        <Heading margin="small" size="3">
          Your Shopping Cart
        </Heading>
        <Box width="large" pad="medium">
          <CartItems />
        </Box>
      </Box>
      <Link to="/Checkout">
        <Button
          margin="medium"
          primary
          label="Proceed to checkout"
          onClick={checkSession}
        />
      </Link>
    </Box>
    </>
  );
};

export default MyCart;
