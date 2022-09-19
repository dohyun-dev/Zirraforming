import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import Theme from "./Theme";

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url("/assets/bg/space.jfif");
	  background-position: center center;
	  background-size: cover;
   
  }
  a {
    text-decoration: none;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={Theme}>
		<GlobalStyle />
		<App />
	</ThemeProvider>
);
