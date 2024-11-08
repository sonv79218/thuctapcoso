import React from "react";
import "../Css/Header.css"; // Import file CSS

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Danh Sách Sách</h1>
      <nav className="header-nav">
        <a href="/home" className="header-link">
          Trang Chủ
        </a>
        <a href="/book/list" className="header-link">
          Sách
        </a>
        <a href="/book" className="header-link">
          Chức năng
        </a>
      </nav>
    </header>
  );
};

export default Header;
