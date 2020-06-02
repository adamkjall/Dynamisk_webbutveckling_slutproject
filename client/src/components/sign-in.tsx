import React, { useState, useContext } from "react";

import styled from "styled-components";

import AuthenticationContext from "../contexts/authentication-context/context";

import FormInput from "./form-input";
import CustomButton from "./custom-button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthenticationContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return; // lock input during loading

    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const message = await login(email, password);
      // TODO view message to user in a nicer way
      if (message != "Authenticated") {
        alert(message);
        setLoading(false);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      // TODO handle error
      console.log("Error while sign in", error.message);
    }
  };

  return (
    <StyledSignIn className="sign-in">
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
          <CustomButton loading={loading} type="submit">
            Login
          </CustomButton>
        </div>
      </form>
    </StyledSignIn>
  );
};

export default SignIn;

const StyledSignIn = styled.div`
  background: #a93535;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.05);
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
    display: grid;
    gap: 1.4rem;
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
