import React from "react";

import styled from "styled-components";

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  name: string;
  type: string;
  required?: boolean;
}

const FormInput: React.FC<IProps> = ({
  handleChange,
  label,
  value,
  name,
  type,
}) => (
  <StyledFormInput>
    <input
      className="form-input"
      name={name}
      value={value}
      type={type}
      onChange={handleChange}
      required
    />
    {label ? (
      <label className={`${value.length ? "shrink" : ""} form-input-label`}>
        {label}
      </label>
    ) : null}
  </StyledFormInput>
);

export default FormInput;

const StyledFormInput = styled.div`
  $main-color: black;
  $sub-color: grey;

  position: relative;
  margin: 3rem 0;

  .form-input {
    background: white;
    color: $sub-color;
    font-size: 1rem;
    padding: 0.7rem 0.7rem 0.7rem 0.33rem;
    margin: 1.5rem 0;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid $sub-color;

    &:focus {
      outline: none;
    }

    &:focus ~ .form-input-label {
      top: -1.4rem;
      font-size: 0.9rem;
      color: $main-color;
    }
  }

  input[type="password"] {
    letter-spacing: 0.3rem;
  }

  .form-input-label {
    position: absolute;
    left: 0.33rem;
    top: 0.7rem;
    color: $sub-color;
    font-size: 1rem;
    font-weight: normal;
    pointer-events: none;
    transition: 300ms ease all;
    text-transform: capitalize;

    &.shrink {
      top: -1.4rem;
      font-size: 0.9rem;
      color: $main-color;
    }
  }
`;
