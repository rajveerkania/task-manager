import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
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
      .post(`${window.location.origin}/api/v1/signin`, Inputs)
      .then((response) => {
        if (Inputs.email === "" || Inputs.password === "") {
          toast.error("Empty Input");
        } else if (response.data.message === "Please Signup first!") {
          toast.error("No User found");
        } else if (response.data.message === "Incorrect Password") {
          toast.error("Incorrect Password");
        } else {
          sessionStorage.setItem("id", response.data.others._id);
          dispatch(authActions.login());
          history("/todo");
        }
      });
  };

  return (
    <div className="signin">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="column col-lg-4 d-flex justify-content-center align-items-center">
            <h1 className="text-color signin-heading">
              Sign
              <br />
              In
            </h1>
          </div>
          <div className="column col-lg-8 d-flex justify-content-center align-items-center">
            <div className="form">
              <form className="register-form">
                <input
                  className="p-2 my-3"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={change}
                  value={Inputs.email}
                />
                <input
                  className="p-2 my-3"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
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
                <button onClick={submit}>SIGNIN</button>
                <p className="message">
                  New User?{" "}
                  <Link to="/signup">
                    <b>Sign Up</b>
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

export default Signin;
