import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link>Developers</Link>
        </li>
        <li>
          <NavLink exact to="/register">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/login">
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
