import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../reducers/register";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const AuthData = useSelector((state) => state.Auth);
  const { isAuthenticated, loading } = AuthData;
  const authLinks = (
    <ul>
      <li>
        <a href="#!" onClick={() => dispatch(logout())}>
          <FaSignOutAlt style={{ marginRight: "5px", marginTop: "4px" }} />
          Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <>
      <nav className="navbar bg-dark">
        <h1>
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <i className="fas fa-code"></i> WanderOn
          </Link>
        </h1>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </>
  );
};

export default Navbar;
