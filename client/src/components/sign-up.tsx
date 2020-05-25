import React, { useState } from "react";

import styled from "styled-components";

import FormInput from "./form-input";
import CustomButton from "./custom-button";

interface IState {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [state, setState] = useState<IState>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.password !== state.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // TODO register user
    } catch (error) {
      console.log("Error while sign up", error.message);
    }
  };

  return (
    <StyledSignUp>
      <h2 className="title">Register</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={state.displayName}
          handleChange={handleChange}
          label={"Display name"}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={state.email}
          handleChange={handleChange}
          label={"Email"}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={state.password}
          handleChange={handleChange}
          label={"Password"}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          handleChange={handleChange}
          label={"Confirm password"}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN UP</CustomButton>
        </div>
      </form>
    </StyledSignUp>
  );
};

export default SignUp;

const StyledSignUp = styled.div`
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

  .sign-up-form {
    width: 100%;
    padding: 0 2rem 3rem 2rem;
  }

  .buttons {
    display: grid;
    place-items: center;
  }

  @media screen and (max-width: 450px) {
    margin: 0 2rem;

    .sign-up-form {
      width: 100%;
      padding: 0 2rem 2rem 2rem;
    }
  }
`;
