import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/Book/BookList.css";
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book/list")
      .then((response) => {
        console.log("Dữ liệu từ API:", response.data);
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sách:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (books.length === 0) {
    return <div>Không có sách nào trong danh sách</div>;
  }

  return (
    <div>
      <h1>Danh sách sách</h1>
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-item" key={book.id}>
            <img
              src={`http://localhost:5000${book.cover_image}`}
              alt={book.title}
              className="book-cover"
            />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
