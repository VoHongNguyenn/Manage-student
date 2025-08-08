import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomePage;
