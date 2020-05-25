import React from "react";

import styled from "styled-components";

interface IProps {
  childlren?: React.ReactNode;
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  type?: "button" | "submit" | "reset";
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const CustomButton: React.FC<IProps> = ({
  children,
  isGoogleSignIn,
  inverted,
  type,
  handleClick,
}) => (
  <StyledCustomButton
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`}
    type={type}
    onClick={handleClick}
  >
    {children}
  </StyledCustomButton>
);

export default CustomButton;

const StyledCustomButton = styled.button`
  --main-color: black;
  --sub-color: white;
  --google-color: #4285f4;
  --google-color-hover: #357ae8;

  display: inline-block;
  min-width: 10rem;
  width: auto;
  height: 3rem;
  letter-spacing: 0.5px;
  line-height: 3rem;
  padding: 0 2rem;
  background-color: var(--main-color);
  color: var(--sub-color);
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: var(--sub-color);
    color: var(--main-color);
    border: 1px solid var(--main-color);
  }

  &.google-sign-in {
    background-color: var(--google-color);
    color: $sub-color;

    &:hover {
      background-color: var(--google-color-hover);
      border: none;
    }
  }

  &.inverted {
    background-color: var(--sub-color);
    color: $main-color;
    border: 1px solid black;

    &:hover {
      background-color: var(--main-color);
      color: var(--sub-color);
      border: none;
    }
  }
`;
