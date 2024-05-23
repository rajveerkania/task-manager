import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
          tasQ, an
          <br />
          ultimate productivity ally.
        </h1>
        <Link to="/todo">
          <button className="home-btn p-2">Pomodoro</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
