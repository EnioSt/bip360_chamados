import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick }) => {
  return (
    <StyledWrapper>
      <button className="animated-button" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-2"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">{children}</span>
        <span className="circle" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-1"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    @media (max-width: 900px) {
      width: 100%;
    }
  }
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 16px 36px;
    font-size: 16px;
    background-color: black;
    border: 2px solid white;
    border-radius: 100px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s ease;
  }

  .animated-button svg {
    position: absolute;
    width: 24px;
    fill: white;
    z-index: 9;
    transition: all 0.8s ease;
  }

  .animated-button .arr-1 {
    right: 16px;
  }

  .animated-button .arr-2 {
    left: -25%;
  }

  .animated-button .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s ease;
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s ease;
  }

  .animated-button:hover {
    background-color: white;
    color: black;
    border-color: black;
  }

  .animated-button:hover .arr-1 {
    right: -25%;
  }

  .animated-button:hover .arr-2 {
    left: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(12px);
  }

  .animated-button:hover svg {
    fill: black;
  }

  .animated-button:active {
    transform: scale(0.95);
    box-shadow: 0 0 0 4px black;
  }

  .animated-button:hover .circle {
    width: 220px;
    height: 220px;
    opacity: 1;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default Button;
