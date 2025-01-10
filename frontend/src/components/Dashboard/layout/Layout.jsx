import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard_navbar from "../dash_navbar/Dash_nav";
import "./layout.css";
import Dashboard_header from "../dash_header/Dash_header";

function Layout() {
  return (
    <div className="layout-container">
      <div className="dashboard-navbar">
        <Dashboard_navbar />
      </div>
      <div className="outlet-container">
        <Dashboard_header />
        <Outlet />
      </div>
    </div>
  );
}

// Hello Check

export default Layout;
