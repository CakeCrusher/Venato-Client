import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Wrapper(props) {
  return (
    <div>
      <div>
        <Link style={{ margin: "5px" }} className="px-2" to="/">
          Home
        </Link>
        <Link style={{ margin: "5px" }} to="/adding-groceries">
          Add Groceries
        </Link>
        <Link style={{ margin: "5px" }} to="/groceries">
          Add Groceries
        </Link>
        <Link style={{ margin: "5px" }} to="/health-analysis">
          Health Analysis
        </Link>
      </div>

      {props.children}
    </div>
  );
}

export default Wrapper;
