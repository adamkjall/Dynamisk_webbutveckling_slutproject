import React, { useState, useContext } from "react";

import styled from "styled-components";

import AuthenticationContext from "../contexts/authentication-context/context";

import FormInput from "./form-input";
import CustomButton from "./custom-button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthenticationContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Error while sign in", error.message);
    }
  };

  return (
    <StyledSignIn>
      <h2 className="title">LOGIN</h2>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          label="email"
          name="email"
          type="email"
          value={email}
          required
        />
        <FormInput
          handleChange={handleChange}
          label="password"
          name="password"
          type="password"
          value={password}
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Login</CustomButton>
        </div>
      </form>
    </StyledSignIn>
  );
};

export default SignIn;

const StyledSignIn = styled.div`
  background: #a93535;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  border-radius: 1rem;

  .title {
    color: white;
    padding-top: 1.5rem;
  }

  .sign-in-form {
    width: 100%;
    padding: 0 2rem 3rem 2rem;
  }

  .buttons {
    display: grid;
    place-items: center;
  }

  @media screen and (max-width: 450px) {
    margin: 0 2rem;

    .sign-in-form {
      width: 100%;
      padding: 0 2rem 2rem 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    .buttons {
      grid-template-columns: 1fr;
    }
  }
`;
