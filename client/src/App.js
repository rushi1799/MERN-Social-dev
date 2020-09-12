import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./components/layouts/Alert";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />

            <section className="container">
              <Alert />

              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </section>
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
