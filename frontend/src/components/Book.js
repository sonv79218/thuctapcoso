import React from "react";
import "../Css/Book.css";

const Book = () => {
  return (
    <div className="book-container">
      <h1>Quản lý Sách</h1>
      <div className="book-links">
        <a href="/book/list" className="book-link">
          Danh sách sách
        </a>
        <a href="/book/add" className="book-link">
          Thêm sách
        </a>
      </div>
    </div>
  );
};

export default Book;
