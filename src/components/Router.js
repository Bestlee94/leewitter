// eslint-disable-next-line

import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Auth />} />
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
