import React from "react";
import ReactDOM from "react-dom";
import App from "site/index.jsx";
import "assets/css/material-dashboard-react.css?v=1.5.0";
import { createBrowserHistory } from "history";

export const hist = createBrowserHistory();

ReactDOM.render(<App/>, document.getElementById("root"));
