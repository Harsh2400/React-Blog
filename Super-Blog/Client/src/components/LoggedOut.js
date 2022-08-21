import React from "react";
import { NavLink } from "react-router-dom";

const LoggedOut = () => {
  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Log In
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    </>
  );
};

export default LoggedOut;
