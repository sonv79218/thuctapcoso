import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./Header_footer/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import BookList from "./components/BookList";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import UpgradeAccount from "./components/UpgradeAccount";
import Payment from './components/Payment';

const AppContent = () => {
  const location = useLocation();

  const noHeaderPaths = ["/", "/login", "/register"];
  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upgrade" element={<UpgradeAccount />} />
        <Route path="/payment" element={<Payment />} />
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
