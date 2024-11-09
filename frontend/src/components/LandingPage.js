import React from "react";
import "../Css/Landing.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Chào mừng đến với trang của chúng tôi</h1>
      <p>Khám phá các tính năng tuyệt vời mà chúng tôi mang đến cho bạn!</p>
      <div className="button-container">
        <a href="/login" className="button">
          Đăng nhập
        </a>
        <a href="/register" className="button">
          Đăng ký
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
