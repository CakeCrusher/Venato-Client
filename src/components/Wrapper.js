import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Wrapper(props) {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/adding-groceies">Add Groceries</Link>
      {props.children}
    </div>
  );
}

export default Wrapper;
