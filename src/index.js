import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.scss";
var mountNode = document.getElementById("app");

//components

import App from "./components/App"

var mountNode = document.getElementById("app");

ReactDOM.render(<App/>, mountNode);