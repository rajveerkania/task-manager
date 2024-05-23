import React from "react";
import "../navbar/Navbar.css";
import { GiWhiteBook } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>
              <GiWhiteBook /> &nbsp;tasQ
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className=" nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className=" nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className=" nav-link active"
                  aria-current="page"
                  to="/todo"
                >
                  ToDo
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className=" nav-link active nav-btn"
                      aria-current="page"
                      to="/signin"
                    >
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      className=" nav-link active nav-btn"
                      aria-current="page"
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className=" nav-link active nav-btn"
                      aria-current="page"
                      to={"/"}
                      onClick={() => {
                        sessionStorage.clear("id");
                        dispatch(authActions.logout());
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
