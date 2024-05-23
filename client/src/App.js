import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Todo from "./components/todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "../src/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/todo" element={<Todo />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
