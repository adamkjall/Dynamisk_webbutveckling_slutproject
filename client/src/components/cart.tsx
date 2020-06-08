import React, {useContext, useState, useEffect} from "react";

import { Link } from "react-router-dom";

import AuthenticationContext from "../contexts/authentication-context/context";
import CartContext from "../contexts/cart-context/context"

import { Box, Button, Heading, Layer } from "grommet";
import { Close } from "grommet-icons";

import CartItems from "./cart-items";
import SignInSignUp from "../pages/sign-in-sign-up"

interface Iprops {
  closeCart: () => void;
}

const MyCart = (props: Iprops) => {
  
  const [showModal, setShowModal] = useState(false)
  const [isDisableButton, setDisableButton] = useState(false)
  const { isAuthenticated } = useContext(AuthenticationContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    checkCart();
  });

  const checkSession = () => {
    
    if(!isAuthenticated){
      setShowModal(true)
    }else{
      setShowModal(false)
      props.closeCart()
    }
  }

  const checkCart = () => {
    if(cart.length <= 0){
      setDisableButton(true)
    }
  }

  return (
    <>
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
        
        {isAuthenticated? 
        <>
        {isDisableButton? <p style = {{margin: "0 0 0 3rem"}}>Your Cart is empty</p>:null}
        <Link to="/Checkout">
        
          <Button
            margin="medium"
            primary
            label="Proceed to checkout"
            onClick={checkSession}
            disabled = {isDisableButton}
          />
        </Link>
        </>:
        <Button
            margin="medium"
            primary
            label="Log in or register here to proceed to checkout"
            onClick={checkSession}
          />}
      </Box>
      {showModal && !isAuthenticated && (
      <Box >    
        <Layer
          style = {{overflow: "auto"}}
          onEsc={() => setShowModal(false)}
          onClickOutside={() => setShowModal(false)}
        >
        <Button 
          alignSelf="end" 
          icon={<Close />} 
          onClick={() => setShowModal(false)} 
        />        
          <SignInSignUp/>
        </Layer>
      </Box>
      )} 
    </>
  );
};

export default MyCart;
