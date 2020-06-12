import React, { useState, useContext } from "react";

import styled from "styled-components";

import AuthenticationContext from "../contexts/authentication-context/context";

import FormInput from "./form-input";
import CustomButton from "./custom-button";
import { Button } from "grommet";
import { Close } from "grommet-icons";

const SignIn = ({ toggleView, displayClose, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shakeComponent, setShakeComponent] = useState(false);
  const [loginError, setLoginError] = useState({
    isOk: true,
    message: ""
  })
  const { login } = useContext(AuthenticationContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return; // lock input during loading

    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validateInputs = email.length && password.length;

    if (!validateInputs) {
      setShakeComponent(true);
      // setLogInOK(false);
      setLoginError({
        isOk: false,
        message: ""
      })
      setTimeout(() => setShakeComponent(false), 820);
      return;
    }

    setLoading(true);
    const message = await login(email, password);

    if (message != "Authenticated") {
      // setLogInOK(false)
      setLoginError({
        isOk: false,
        message: "Email and/or password is incorrect"
      })
      setLoading(false);
      setShakeComponent(true);
      setTimeout(() => setShakeComponent(false), 820);
      setEmail("");
      setPassword("");
    } else {
      setLoginError({
        isOk: true,
        message: ""
      })
    }
  };

  return (
    <StyledSignIn className={`${shakeComponent ? "shake" : ""} sign-in`}>
      {displayClose &&
        <Button
          style={{
            zIndex: 1,
            position: "absolute",
            top: "0",
            right: "0",
          }}
          alignSelf="end"
          icon={<Close style={{ color: "white !important" }} />}
          onClick={() => setShowModal(false)}
        />
      }
      <h2 className="title">LOGIN</h2>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          label="email"
          name="email"
          type="email"
          value={email}
          validate={loginError.isOk}
          validateText={loginError.message}
          required
        />
        <FormInput
          handleChange={handleChange}
          label="password"
          name="password"
          type="password"
          value={password}
          validate={loginError.isOk}
          validateText={loginError.message}
          required
        />
        <p>
          Have no account?{" "}
          <span className="emphasis" onClick={toggleView}>
            Register here
          </span>
        </p>
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
  position: relative;
  background: #a93535;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  border-radius: 0.4rem;

  &.shake {
    animation: shake-animation 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes shake-animation {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  .title {
    color: white;
    margin: 2.2rem 0;
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

  p {
    margin: 0;
    color: #dedeee;
    font-size: 1.1rem;
    text-align: center;

    .emphasis {
      font-weight: bolder;
      cursor: pointer;
      color: #232323;
      transition: font-size 0.3s ease;

      &:hover {
        font-size: 0.9rem;
      }
    }
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
