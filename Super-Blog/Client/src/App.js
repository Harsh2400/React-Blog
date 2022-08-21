import React from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Draft from "./components/Draft";

import { Route, Routes } from "react-router-dom";

import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          exact
          path="/profile"
          element={
            <Profile userid={user.userid} email={user.email} id={user._id} />
          }
        />

        <Route
          exact
          path="/draft"
          element={
            <Draft userid={user.userid} email={user.email} id={user._id} />
          }
        />
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
