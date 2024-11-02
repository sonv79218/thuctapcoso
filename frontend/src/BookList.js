import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Gọi API từ backend
    fetch("/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  return (
    <div>
      <h2>Danh Sách Sách</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} ({book.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
