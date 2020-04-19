import React from "react";
import ReactDOM from "react-dom";
import Project from "./Project";

import { GlobalProvider } from "./context/GlobalState";

ReactDOM.render(
  <GlobalProvider>
    <Project />
  </GlobalProvider>,
  document.getElementById("root")
);
