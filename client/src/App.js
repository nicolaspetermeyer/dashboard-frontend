import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Overview from "./components/Overview";
import Map from "./components/Map";
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/overview">Overview</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
};

export default App;
