/* eslint-disable new-cap */
import React, {Component} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import MyLoadable from "./Loadable";

const Test = MyLoadable({
  loader: () => import("./views/test"),
});

class Routers extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact={true} component={Test} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routers;
