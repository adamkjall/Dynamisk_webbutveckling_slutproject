import React, { useState } from "react";

import styled from "styled-components";

import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";

interface IProps {
  displayClose?: boolean
  setShowModal?: ( value: boolean ) => void
}

const SignInSignUp = (props: IProps) => {
  const { displayClose, setShowModal } = props
  const [viewSignUp, setViewSignUp] = useState(false);

  return (
    <StyledSignInSignUp>
      {viewSignUp ? (
        <SignUp displayClose={displayClose || false} setShowModal={setShowModal || null} toggleView={() => setViewSignUp(false)} />
      ) : (
        <SignIn displayClose={displayClose || false} setShowModal={setShowModal || null} toggleView={() => setViewSignUp(true)} />
      )}
    </StyledSignInSignUp>
  );
};

export default SignInSignUp;

const StyledSignInSignUp = styled.div`
  display: grid;
  justify-items: center;
  align-items: start;
`;
