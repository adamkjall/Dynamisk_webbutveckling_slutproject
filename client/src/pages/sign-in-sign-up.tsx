import React, { useState } from "react";

import styled from "styled-components";

import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";

const SignInSignUp = () => {
  const [viewSignUp, setViewSignUp] = useState(false);

  return (
    <StyledSignInSignUp>
      {viewSignUp ? (
        <SignUp toggleView={() => setViewSignUp(false)} />
      ) : (
        <SignIn toggleView={() => setViewSignUp(true)} />
      )}
    </StyledSignInSignUp>
  );
};

export default SignInSignUp;

const StyledSignInSignUp = styled.div`
  display: grid;
  justify-items: center;
  align-items: start;
  margin: 2rem;
`;
