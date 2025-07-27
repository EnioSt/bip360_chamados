import React from "react";
import styled from "styled-components";

const DateInput = ({ children, htmlFor, value, onChange }) => {
  return (
    <StyledWrapper>
      <div className="inputGroup">
        <input
          required
          autoComplete="off"
          type="date"
          value={value}
          onChange={onChange}
          id={htmlFor}
        />
        <label htmlFor={htmlFor}>{children}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .inputGroup {
    font-family: "Segoe UI", sans-serif;
    margin: 1em 0;
    width: 190px;
    position: relative;
  }

  .inputGroup input[type="date"] {
    font-size: 100%;
    padding: 13.6px;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
    color: transparent; /* 🔍 oculta o texto nativo */
    position: relative;
    z-index: 1;
  }

  .inputGroup input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(30%) sepia(100%) saturate(500%) hue-rotate(180deg);
    cursor: pointer;
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
    z-index: 2;
  }

  .inputGroup :is(input:focus, input:valid) ~ label {
    transform: translateY(-50%) scale(0.9);
    margin: 0;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: white;
  }

  .inputGroup :is(input:focus, input:valid) {
    border-color: #003366;
    color: #333; /* ✅ revela o texto digitado */
  }
`;

export default DateInput;
