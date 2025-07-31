import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *, *::before, *::after {
  box-sizing: border-box;
}

  input, select {
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

input, select {
  font-size: 16px;
}

select, input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

  body {
    font-family: sans-serif;
    background-color: #f9f9f9;
  }
  html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 🔒 reforça remoção da rolagem lateral */
}

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
