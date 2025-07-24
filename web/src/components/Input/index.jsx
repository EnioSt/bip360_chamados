import React from "react";
import styled from "styled-components";

const Input = ({ children, htmlFor, type, value, onChange }) => {
  return (
    <StyledWrapper>
      <div className="inputGroup">
        <input
          required
          autoComplete="off"
          type={type}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={htmlFor}>{children}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .inputGroup {
    font-family: "Segoe UI", sans-serif;
    margin: 1em 0 1em 0;
    max-width: 190px;
    position: relative;
  }
  .inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
  }
  .inputGroup label {
    font-size: 100%;
    position: absolute;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #003366;
  }
  .inputGroup :is(input:focus, input:valid) ~ label {
    transform: translateY(-50%) scale(0.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: white;
  }
  .inputGroup :is(input:focus, input:valid) {
    border-color: #003366;
  }
`;
export default Input;
