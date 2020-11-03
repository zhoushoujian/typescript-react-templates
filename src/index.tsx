import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'

import Routers from "./router";

window.axios = axios

ReactDOM.render(<Routers />, document.getElementById("root"));
