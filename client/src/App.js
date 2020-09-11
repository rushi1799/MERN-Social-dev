import React, { Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import "./App.css";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Landing />
    </Fragment>
  );
}

export default App;
