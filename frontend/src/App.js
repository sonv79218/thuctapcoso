import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./Header_footer/Header";
import Profile from "./components/Profile.js";
import Login from "./components/Login";
import Home from "./components/Home";
import BookList from "./components/Book/BookList.js";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import UpgradeAccount from "./components/UpgradeAccount";
import Payment from "./components/Payment";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import AddBookForm from "./components/Book/AddBookForm";
import Book from "./components/Book.js";
import EditBookForm from "./components/Book/EditBookForm";
const AppContent = () => {
  const location = useLocation();

  const noHeaderPaths = ["/", "/login", "/register"];
  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home /> {/* Trang Home sẽ chỉ được truy cập khi có token */}
            </PrivateRoute>
          }
        />
        <Route path="/book/list" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upgrade" element={<UpgradeAccount />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/book/add" element={<AddBookForm />} />
        <Route path="/book" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        {/* form sửa sách */}
        <Route path="/book/edit/:id" element={<EditBookForm />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
