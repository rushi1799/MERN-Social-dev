import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Route exact path="/" component={Landing} />

      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Fragment>
  );
}

export default App;
