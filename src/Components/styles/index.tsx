import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset margin and padding only on the html and body */
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background-color:#f4f4f4
  }

  /* Ensure PrimeReact components are unaffected */
  .p-datatable {
    font-family: inherit; /* Ensure styles like fonts cascade properly */
  }
`;

export default GlobalStyles;
