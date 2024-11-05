import React from "react";
import "../Css/Auth.css";

const LandingPage = () => {
  return (
    <div className="auth-container">
      <a href="/login">Đăng nhập</a>
      <a href="/register">Đăng ký</a>
    </div>
  );
};

export default LandingPage;
