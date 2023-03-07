import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Form from "./Form";
import Home from "./Home";


const App = () => {

  return (
    <>
      <h1>Lambda Eats</h1>
      <nav>
        <Link to="/">Home</Link> &nbsp;
        <Link to="/pizza" id="order-pizza" >Order Pizza</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza" element={<Form />} />
      </Routes>
    </>
  );
};
export default App;
