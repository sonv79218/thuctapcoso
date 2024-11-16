import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import Header from "./Header_footer/Header";
//import ButtonBack from "./Header_footer/ButtonBack";
import Profile from "./components/Profile.js";
import Login from "./components/Login";
import Home from "./components/Home";
import BookList from "./components/Book/BookList.js";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import UpgradeAccount from "./components/UpgradeAccount";
import Payment from "./components/Payment";
//import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import AddBookForm from "./components/Book/AddBookForm";
import Book from "./components/Book.js";
import EditBookForm from "./components/Book/EditBookForm";
import Admin from "./components/Admin.js";
import Error from "./components/Error.js";
//import { pathToFileURL } from "url";

const AppContent = () => {
  // const userId = sessionStorage.getItem("userId");
  // const role = sessionStorage.getItem("role");
  const ProtectedRouteAdmin = ({ element }) => {
    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role");
    //const navigate = useNavigate();
    if (userId && role === "admin") {
      return element;
    } else {
      // navigate("/error"); // Nếu không phải admin, trả về element lỗi
      return <Error />;
    }

    // nếu userId khác null - là có đăng nhập và role = admin;
    //if (userId && role === "admin") {
    // thì đường dẫn /admin-dashboard dẫn đến trang element={<Admin />} còn nếu không thì sẽ dẫn đến
    // trang element={<Error />}
  };
  const ProtectedRoute = ({ element }) => {
    const userId = sessionStorage.getItem("userId");
    //const navigate = useNavigate();
    if (userId) {
      return element;
    } else {
      // navigate("/error"); // Nếu không phải admin, trả về element lỗi
      return <Error />;
    }

    // nếu userId khác null - là có đăng nhập và role = admin;
    //if (userId && role === "admin") {
    // thì đường dẫn /admin-dashboard dẫn đến trang element={<Admin />} còn nếu không thì sẽ dẫn đến
    // trang element={<Error />}
  };
  const location = useLocation();
  const noHeaderPaths = ["/", "/login", "/register"];
  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/error" element={<Error />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/book/list"
          element={<ProtectedRoute element={<BookList />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/upgrade"
          element={<ProtectedRoute element={<UpgradeAccount />} />}
        />
        <Route
          path="/payment"
          element={<ProtectedRoute element={<Payment />} />}
        />
        <Route
          path="/book/add"
          element={<ProtectedRoute element={<AddBookForm />} />}
        />
        <Route path="/book" element={<ProtectedRoute element={<Book />} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />

        {/* Đường dẫn protected cho Admin */}
        <Route
          path="/admin-dashboard"
          element={<ProtectedRouteAdmin element={<Admin />} />}
        />
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
