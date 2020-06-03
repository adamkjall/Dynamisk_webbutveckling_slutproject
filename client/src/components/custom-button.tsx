import React from "react";
import styled from "styled-components";

import Loader from "react-loader-spinner";

interface IProps {
  childlren?: React.ReactNode;
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const CustomButton: React.FC<IProps> = ({
  children,
  isGoogleSignIn,
  inverted,
  type,
  loading,
  handleClick,
}) => (
  <StyledCustomButton
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } ${loading ? "loading" : ""} custom-button`}
    type={type}
    onClick={loading ? () => {} : handleClick}
  >
    {loading ? (
      <Loader
        className="loader"
        type="Oval"
        color="black"
        height={25}
        width={25}
        style={{ display: "grid", placeItems: "center" }}
      />
    ) : (
      children
    )}
  </StyledCustomButton>
);

export default CustomButton;

const StyledCustomButton = styled.button`
  --main-color: black;
  --sub-color: white;
  --google-color: #4285f4;
  --google-color-hover: #357ae8;

  display: inline-block;
  width: 100%;
  height: 3rem;
  letter-spacing: 1.8px;
  line-height: 3rem;
  padding: 0 2rem;
  background-color: var(--main-color);
  color: var(--sub-color);
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-out;

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

  &.loading {
    background: lightgray;
  }
`;
