import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./containers/Login";

import { GlobalProvider } from "./context/GlobalState";

ReactDOM.render(
  <GlobalProvider>
    {/* <App /> */}
    <Login />
  </GlobalProvider>,
  document.getElementById("root")
);
