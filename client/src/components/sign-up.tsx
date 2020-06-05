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

const SignUp = ({ toggleView }) => {
  const [inputs, setInputs] = useState<IState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [shakeComponent, setShakeComponent] = useState(false);
  const { register } = useContext(AuthenticationContext);
  
  const [isFirstNameOK, setFirstNameOK] = useState(true)
  const [isLastNameOK, setLastNameOK] = useState(true)
  const [isStreetAddressOK, setStreetAddressOK] = useState(true)
  const [isCityOK, setCityOK] = useState(true)
  const [isZipCodeOK, setZipCodeOK] = useState(true)
  const [isEmailOK, setEmailOK] = useState(true)
  const [isPhoneNumberOK, setPhoneNumberOK] = useState(true)
  const [isPasswordOK, setPasswordOK] = useState(true)
  const [isConfirmOK, setConfirmOK] = useState(true)

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

    const handleValidationMessages = () => {
      if(inputs.firstName.length >= 2){
        setFirstNameOK(true)
      }else{setFirstNameOK(false)}

      if(inputs.lastName.length >= 2){
        setLastNameOK(true)
      }else{setLastNameOK(false)}

      if(inputs.streetAddress.length >= 4){
        setStreetAddressOK(true)
      }else{setStreetAddressOK(false)}

      if(inputs.zipCode.match(/^\d{5}$/)){
        setZipCodeOK(true)
      }else{setZipCodeOK(false)}

      if(inputs.city.length >= 1){
        setCityOK(true)
      }else{setCityOK(false)}

      if(inputs.email.match(/^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/)){
        setEmailOK(true)
      }else{setEmailOK(false)}

      if(inputs.phoneNumber.match(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
      )){
        setPhoneNumberOK(true)
      }else{setPhoneNumberOK(false)}

      if(inputs.password.length >= 6){
        setPasswordOK(true)
      }else{setPasswordOK(false)}

      if(inputs.confirmPassword === inputs.password){
        setConfirmOK(true)
      }else{setConfirmOK(false)}
    }

    try {
      const validateInputs =
        inputs.firstName.length >= 2 &&
        inputs.firstName.match(/[A-Ö]/gi) &&
        inputs.lastName.length >= 2 &&
        inputs.lastName.match(/[A-Ö]/gi) &&
        inputs.email.match(/^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/) &&
        inputs.phoneNumber.match(
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
        ) &&
        inputs.streetAddress.length >= 4 &&
        inputs.city.length >= 1 &&
        inputs.zipCode.match(/^\d{5}$/) &&
        inputs.password.length >= 6 &&
        inputs.confirmPassword === inputs.password;

      if (!validateInputs) {
        handleValidationMessages()
        setShakeComponent(true);
        setTimeout(() => setShakeComponent(false), 820);
        return;
      }

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
    <StyledSignUp className={shakeComponent ? "shake" : ""}>
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
          validate = {isFirstNameOK}
          validateText = {"Not a valid name"}
        />
        <FormInput
          className="last"
          type="text"
          name="lastName"
          value={inputs.lastName}
          handleChange={handleChange}
          label={"Last name"}
          required
          validate = {isLastNameOK}
          validateText = {"Not a valid name"}
        />
        <FormInput
          className="email"
          type="email"
          name="email"
          value={inputs.email}
          handleChange={handleChange}
          label={"Email"}
          required
          validate = {isEmailOK}
          validateText = {"Not a valid e-mail"}
        />
        <FormInput
          className="phone"
          type="tel"
          name="phoneNumber"
          value={inputs.phoneNumber}
          handleChange={handleChange}
          label={"Phone number"}
          required
          validate = {isPhoneNumberOK}
          validateText = {"Not a valid phone number"}
        />
        <FormInput
          className="address"
          type="text"
          name="streetAddress"
          value={inputs.streetAddress}
          handleChange={handleChange}
          label={"Street address"}
          required
          validate = {isStreetAddressOK}
          validateText = {"Not a valid street address"}
        />
        <FormInput
          className="zip"
          type="text"
          name="zipCode"
          value={inputs.zipCode}
          handleChange={handleChange}
          label={"Zip code"}
          required
          validate = {isZipCodeOK}
          validateText = {"Not a valid zip code"}
        />
        <FormInput
          className="city"
          type="text"
          name="city"
          value={inputs.city}
          handleChange={handleChange}
          label={"City"}
          required
          validate = {isCityOK}
          validateText = {"Not a valid city"}
        />
        <FormInput
          className="password"
          type="password"
          name="password"
          value={inputs.password}
          handleChange={handleChange}
          label={"Password"}
          required
          validate = {isPasswordOK}
          validateText = {"Not a valid password"}
        />
        <FormInput
          className="confirm"
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          handleChange={handleChange}
          label={"Confirm password"}
          required
          validate = {isConfirmOK}
          validateText = {"Doesn't match the password"}
        />
        <p style = {{fontSize: "1.1rem"}}>
          Already have an account?{" "}
          <span className="emphasis" onClick={toggleView}>
            Login here!
          </span>
        </p>
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
    letter-spacing: 1px;
    text-transform: uppercase;
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
      "goToLogin goToLogin"
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

  p {
    grid-area: goToLogin;
    margin: 0;
    color: #dedeee;
    font-size: 0.8rem;
    text-align: center;

    .emphasis {
      font-weight: bold;
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

    .sign-up-form {
      width: 100%;
      padding: 0 2rem 2rem 2rem;
    }
  }
`;