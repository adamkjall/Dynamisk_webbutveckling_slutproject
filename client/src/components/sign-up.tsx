import React, { useState, useContext } from "react";
import styled from "styled-components";

import AuthenticationContext from "../contexts/authentication-context/context";

import FormInput from "./form-input";
import CustomButton from "./custom-button";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_STATE = Object.freeze({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  streetAddress: "",
  zipCode: "",
  city: "",
  password: "",
  confirmPassword: "",
});

const SignUp = () => {
  const [inputs, setInputs] = useState<IState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthenticationContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return; // lock input during loading

    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // TODO validate inputs
      setLoading(true);
      const { confirmPassword, ...rest } = inputs;
      const userToRegister = {
        ...rest,
        isAdmin: false,
      };

      const message = await register(userToRegister);
      // TODO view message to user in a nicer way
      if (message !== "Authenticated") {
        alert(message);
        setInputs(INITIAL_STATE);
        setLoading(false);
      }
    } catch (error) {
      // TODO handle error
      console.log("Error while sign up", error.message);
    }
  };

  return (
    <StyledSignUp>
      <h2 className="title">Register</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          className="first"
          type="text"
          name="firstName"
          value={inputs.firstName}
          handleChange={handleChange}
          label={"First name"}
          required
        />
        <FormInput
          className="last"
          type="text"
          name="lastName"
          value={inputs.lastName}
          handleChange={handleChange}
          label={"Last name"}
          required
        />
        <FormInput
          className="email"
          type="email"
          name="email"
          value={inputs.email}
          handleChange={handleChange}
          label={"Email"}
          required
        />
        <FormInput
          className="phone"
          type="tel"
          name="phoneNumber"
          value={inputs.phoneNumber}
          handleChange={handleChange}
          label={"Phone number"}
          required
        />
        <FormInput
          className="address"
          type="text"
          name="streetAddress"
          value={inputs.streetAddress}
          handleChange={handleChange}
          label={"Street address"}
          required
        />
        <FormInput
          className="zip"
          type="text"
          name="zipCode"
          value={inputs.zipCode}
          handleChange={handleChange}
          label={"Zip code"}
          required
        />
        <FormInput
          className="city"
          type="text"
          name="city"
          value={inputs.city}
          handleChange={handleChange}
          label={"City"}
          required
        />
        <FormInput
          className="password"
          type="password"
          name="password"
          value={inputs.password}
          handleChange={handleChange}
          label={"Password"}
          required
        />
        <FormInput
          className="confirm"
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          handleChange={handleChange}
          label={"Confirm password"}
          required
        />
        <div className="buttons">
          <CustomButton loading={loading} type="submit">
            Register
          </CustomButton>
        </div>
      </form>
    </StyledSignUp>
  );
};

export default SignUp;

const StyledSignUp = styled.div`
  background: #373737e0;
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
    margin: 2.2rem 0;
  }

  .sign-up-form {
    width: 100%;
    padding: 0 2rem 3rem 2rem;
    display: grid;
    gap: 1.4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "first last"
      "email email"
      "phone phone"
      "address address"
      "city zip"
      "password password"
      "confirm confirm"
      "buttons buttons";

    > div {
      margin: 0.2rem 0;
    }

    .first {
      grid-area: first;
    }
    .last {
      grid-area: last;
    }
    .email {
      grid-area: email;
    }
    .phone {
      grid-area: phone;
    }
    .address {
      grid-area: address;
    }
    .zip {
      grid-area: zip;
    }
    .city {
      grid-area: city;
    }
    .password {
      grid-area: password;
    }
    .confirm {
      grid-area: confirm;
    }
  }

  .buttons {
    grid-area: buttons;
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
