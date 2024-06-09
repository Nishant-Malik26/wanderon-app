import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Travel Assistant</h1>
          <p className="lead">Travel world with use Make memories with us</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
