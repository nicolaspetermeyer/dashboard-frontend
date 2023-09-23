import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Overview from "./components/Overview";
import { Navbar } from "react-bootstrap";

const App = () => {
  return (
    <div className="header">
      <h1>Drohnen Dashboard</h1>
      <div className="navbar">
        <Navbar
          color="light"
          expand="xs"
          className="border-bottom border-gray bg-white"
          style={{ height: 80 }}
        >
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <Link to="/overview">Overview</Link>
            </li>
          </ul>
        </Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </div>
  );
};

export default App;
