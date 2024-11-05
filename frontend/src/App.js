import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Thay 'Switch' bằng 'Routes'
import Header from "./Header_footer/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import BookList from "./components/BookList";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {" "}
        {/* Thay 'Switch' bằng 'Routes' */}
        <Route path="/" element={<Home />} />{" "}
        {/* Thay 'component' bằng 'element' */}
        <Route path="/books" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
