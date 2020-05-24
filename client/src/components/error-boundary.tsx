import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

interface Props {
  children: React.ReactElement;
}

interface State {
  error: string;
}

interface Error {
  stack?: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: "" };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {
      error,
    };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return error ? (
      <StyledErrorBoundary>
        <div className="modal-content">
          {/* <span className="close">&times;</span> */}
          <h2>App Crashed</h2>
          <p>Something has went horribly wrong.</p>
          {error}
          <Link to="/">Back to home page</Link>
        </div>
      </StyledErrorBoundary>
    ) : (
      // If there is no error just render the children component.
      <>{children}</>
    );
  }
}

const StyledErrorBoundary = styled.div`
  /* The Modal (background) */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 40%;
    text-align: center;
  }

  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;
