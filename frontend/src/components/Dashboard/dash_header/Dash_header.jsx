import React from "react";
import "./Dash_header.css";
import Account from "../assets/account.png";
const Dash_header = () => {
  return (
    <div className="dashboard-header">
      Dashboard
      <img src={Account} alt="" />
    </div>
  );
};

export default Dash_header;
