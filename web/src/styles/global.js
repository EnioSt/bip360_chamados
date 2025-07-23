import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
