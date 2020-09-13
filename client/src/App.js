import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import PrivateRoute from "./components/routes/PrivateRoute";
import Alert from "./components/layouts/Alert";
import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile_forms/CreateProfile";
import EditProfile from "./components/profile_forms/EditProfile";
import AddExperience from "./components/profile_forms/AddExperience";
import AddEducation from "./components/profile_forms/AddEducation";
import Profiles from "./components/profiles/Profiles";

import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";
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
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/developers" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create_profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit_profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add_experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add_education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
