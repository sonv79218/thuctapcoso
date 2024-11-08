import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/Book/BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null); // Lưu quyển sách được chọn

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackClick = () => {
    setSelectedBook(null); // Khi nhấn nút quay lại, sẽ ẩn phần PDF
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (books.length === 0) {
    return <div>Không có sách nào trong danh sách</div>;
  }

  return (
    <div>
      {selectedBook ? (
        <div className="pdf-viewer-container">
          {/* Nút quay lại */}
          <button className="back-button" onClick={handleBackClick}>
            Quay lại
          </button>

          {/* Hiển thị PDF */}
          {selectedBook.pdf_file && (
            <iframe
              src={`http://localhost:5000${selectedBook.pdf_file}`}
              width="100%"
              height="100%"
              title={selectedBook.title}
            ></iframe>
          )}
        </div>
      ) : (
        <div>
          <h1>Danh sách sách</h1>
          <div className="book-grid">
            {books.map((book) => (
              <div
                className="book-item"
                key={book.id}
                onClick={() => handleBookClick(book)} // Khi nhấn vào sách, hiển thị PDF
              >
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
      )}
    </div>
  );
};

export default BookList;
