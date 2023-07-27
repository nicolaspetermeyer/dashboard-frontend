import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Stream from "./components/Stream";
import { Navbar } from "react-bootstrap";
import DatasList from "./features/data/DatasList";

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
              <Link to="/data">Data</Link>
            </li>
            <li>
              <Link to="/stream">Stream</Link>
            </li>
          </ul>
        </Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data">
          <Route index element={<DatasList />} />
        </Route>
        <Route path="/stream" element={<Stream />} />
      </Routes>
    </div>
  );
};

export default App;
