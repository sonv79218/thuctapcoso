import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/Book/BookList.css";

const BookListPublic = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book/listpublic")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sách:", error);
        setLoading(false);
      });
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book); // Hiển thị sách được chọn
  };

  const handleBackClick = () => {
    setSelectedBook(null); // Quay lại danh sách
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (books.length === 0) {
    return <div className="no-books">Không có sách nào trong danh sách</div>;
  }

  return (
    <div className="booklist-container">
      {selectedBook ? (
        <div className="pdf-viewer-container">
          <button className="back-button" onClick={handleBackClick}>
            Quay lại
          </button>
          {selectedBook.pdf_file ? (
            <iframe
              src={`http://localhost:5000${selectedBook.pdf_file}`}
              width="100%"
              height="700px"
              title={selectedBook.title}
            ></iframe>
          ) : (
            <p>Không có tệp PDF để hiển thị</p>
          )}
        </div>
      ) : (
        <div>
          <h1 className="booklist-title">Danh sách sách</h1>
          <div className="book-grid">
            {books.map((book) => (
              <div className="book-item" key={book.id}>
                <img
                  src={`http://localhost:5000${book.cover_image}`}
                  alt={book.title}
                  className="book-cover"
                />
                <p className="book-title">{book.title}</p>
                <button
                  className="view-button"
                  onClick={() => handleBookClick(book)}
                >
                  Xem PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListPublic;
