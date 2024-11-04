import React from "react";
import "../Css/Header.css"; // Import file CSS

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Danh Sách Sách</h1>
      <nav className="header-nav">
        <a href="/" className="header-link">
          Trang Chủ
        </a>
        <a href="/books" className="header-link">
          Sách
        </a>
        <a href="/login" className="header-link">
          Đăng nhập
        </a>
      </nav>
    </header>
  );
};

export default Header;
