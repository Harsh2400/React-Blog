import { NavLink } from "react-router-dom";

const LoggedIn = () => {
  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </li>
    </>
  );
};

export default LoggedIn;
