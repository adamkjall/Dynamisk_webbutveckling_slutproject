import React from "react";

import styled from "styled-components";

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  name: string;
  type?: string;
  className?: string;
  validate?: boolean;
  validateText?: string;
  // All other props
  [x: string]: any;
}

const FormInput: React.FC<IProps> = ({
  handleChange,
  label,
  value,
  name,
  type,
  className,
  rest,
  validate,
  validateText
}) => (
  <>
    <StyledFormInput className={className}>
      <input
        className="form-input"
        name={name}
        value={value}
        type={type}
        onChange={handleChange}
        {...rest}
      />
      {label ? (
        <label className={`${value.length ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
      ) : null}
      {validate? null : <p style = {{ fontWeight: "bold", color: "white"}}>{validateText}</p>}
    </StyledFormInput>     
  </>
);

export default FormInput;

const StyledFormInput = styled.div`
  --main-color: rgba(255, 255, 255, 0.8);
  --sub-color: grey;

  position: relative;
  /* margin: 3rem 0; */

  .form-input {
    background: white;
    color: var(--sub-color);
    font-size: 1rem;
    padding: 0.7rem 0.7rem 0.7rem 0.33rem;
    /* margin: 1.5rem 0; */
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--sub-color);

    &:focus {
      outline: none;
    }

    &:focus ~ .form-input-label {
      top: -1.4rem;
      font-size: 0.9rem;
      color: var(--main-color);
    }
  }

  input[type="password"] {
    letter-spacing: 0.3rem;
  }

  .form-input-label {
    position: absolute;
    left: 0.33rem;
    top: 0.7rem;
    color: var(--sub-color);
    font-size: 1rem;
    font-weight: normal;
    pointer-events: none;
    transition: 300ms ease all;
    text-transform: capitalize;

    &.shrink {
      top: -1.4rem;
      font-size: 0.9rem;
      color: var(--main-color);
    }
  }
`;