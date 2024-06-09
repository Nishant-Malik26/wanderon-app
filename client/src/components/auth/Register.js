import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { setAlertWithRemove } from "../../reducers/removeAlert";
import { register } from "../../reducers/register";
import DOMPurify from "dompurify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const [formData, setFormData] = useState({});
  const { name, email, password, password1 } = formData;

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password1) {
      dispatch(
        setAlertWithRemove({
          id: uuid(),
          msg: "Incorrect Password",
          alertType: "danger",
        })
      );
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form action="dashboard.html" onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Name"
            required
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
            minlength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password1"
            value={password1}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
            minlength="6"
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

export default Register;
