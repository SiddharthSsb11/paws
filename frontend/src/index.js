import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PawsProvider from "./Context/PawsProvider";

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '71.25em',
  '2xl': '96em',
}

const theme = extendTheme({breakpoints});

ReactDOM.render(
  <BrowserRouter>
    <PawsProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </PawsProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

