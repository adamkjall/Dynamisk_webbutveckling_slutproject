import React from "react";

import styled from "styled-components";

import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";

const SignInSignUp = () => (
  <StyledSignInSignUp>
    <SignIn />
    <SignUp />
  </StyledSignInSignUp>
);

export default SignInSignUp;

const StyledSignInSignUp = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  justify-items: center;
  align-items: start;
  margin: 2rem;
`;
