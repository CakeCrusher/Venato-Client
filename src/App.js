import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AddingGroceryItem from "./pages/AddingGroceryItem";

function App(props) {
  console.log(props.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adding-groceies" element={<AddingGroceryItem />} />
      </Routes>
    </Router>
  );
}

export default App;
