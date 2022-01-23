import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AddingGroceryItem from "./pages/AddingGroceryItem";
import GroceryItems from "./pages/GroceryItems";
import HealthAnalysis from "./pages/HealthAnalysis";
import HealthChart from "./pages/HealthChart";
import Wrapper from "./components/Wrapper";

function App(props) {
  return (
    <Router>
      <Wrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adding-groceries" element={<AddingGroceryItem />} />
        <Route path="/groceries" element={<GroceryItems />} />
        <Route path="/health-analysis" element={<HealthAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
