import React from "react";
import "../Css/Book.css";
import ButtonBack from "../Header_footer/ButtonBack";
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
      <ButtonBack></ButtonBack>
    </div>
  );
};

export default Book;
