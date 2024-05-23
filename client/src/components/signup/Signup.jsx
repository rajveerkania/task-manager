import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${window.location.origin}/api/v1/signup`, Inputs)
      .then((response) => {
        if (
          response.data.message ===
          "The username/email has already been registered!"
        ) {
          toast.error(response.data.message);
        } else if (response.data.message === "User has been registered") {
          toast.success(response.data.message);
          setInputs({
            username: "",
            email: "",
            password: "",
          });
          history("/signin");
        }
      });
  };

  return (
    <div className="signup">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="column col-lg-4 d-flex justify-content-center align-items-center">
            <h1 className="text-color signup-heading">
              Sign
              <br />
              Up
            </h1>
          </div>
          <div className="column col-lg-8 d-flex justify-content-center align-items-center">
            <div className="form">
              <form className="register-form">
                <input
                  className="p-2 my-3"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={change}
                  value={Inputs.username}
                />
                <input
                  className="p-2 my-3"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={change}
                  value={Inputs.email}
                />
                <input
                  className="p-2 my-3"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={change}
                  value={Inputs.password}
                />
                <div className="checkbox-container">
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label className="checkbox-label" htmlFor="showPassword">
                    Show Password
                  </label>
                </div>
                <button onClick={submit}>SIGNUP</button>
                <p className="message">
                  Already registered?{" "}
                  <Link to="/signin">
                    <b>Sign In</b>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
