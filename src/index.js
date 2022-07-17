import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WordleTitle from "./title";

import Teclado from "./botones";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <WordleTitle />
    <br />
    <br />
    <App />
    <br />
    <Teclado />
  </div>
);
